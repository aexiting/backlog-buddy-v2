import {
    aws_dynamodb as ddb,
    aws_lambda_event_sources as events,
    aws_lambda_nodejs as nodeLambda,
    aws_opensearchservice as os,
    aws_sqs as sqs,
    Duration,
    RemovalPolicy,
    Stack,
} from "aws-cdk-lib";
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Runtime, StartingPosition } from 'aws-cdk-lib/aws-lambda';

import { Construct } from "constructs";
import { DynamoEventSource } from "aws-cdk-lib/aws-lambda-event-sources";


export class SearchPipelineStack extends Stack {
    constructor(scope: Construct, id: string) {
        super(scope, id);

        const DDB_BATCH_SIZE = 25;
        const backlogTable = ddb.Table.fromTableName(
            this,
            'BacklogTable',
            process.env.BACKLOG_TABLE_NAME ?? 'BacklogItem-dev'
        );

        const dlq = new sqs.Queue(this, 'IndexerDLQ', {
            retentionPeriod: Duration.days(14)
        })

        const backlogQueue = new sqs.Queue(this, "BacklogQueue", {
            deadLetterQueue: { queue: dlq, maxReceiveCount: 3 },
            visibilityTimeout: Duration.seconds(60)
        })

        const domain = new os.Domain(this, 'BacklogSearchDomain', {
            version: os.EngineVersion.OPENSEARCH_2_13,
            capacity: { dataNodeInstanceType: 't3.small.search', dataNodes: 1 },
            removalPolicy: RemovalPolicy.DESTROY,   // dev only
        });

        const streamFn = new nodeLambda.NodejsFunction(this, 'StreamToSqsFn',
            {
                entry: __dirname + '/stream-to-sqs.ts',
                environment: { QUEUE_URL: backlogQueue.queueUrl },
                runtime: Runtime.NODEJS_18_X
            }
        );

        backlogQueue.grantSendMessages(streamFn);

        streamFn.addEventSource(new DynamoEventSource(backlogTable, {
            startingPosition: StartingPosition.TRIM_HORIZON,
            batchSize: DDB_BATCH_SIZE,
            filters: [
                lambda.FilterCriteria.filter({
                    eventName: lambda.FilterRule.isEqual('INSERT')
                }),
                lambda.FilterCriteria.filter({
                    eventName: lambda.FilterRule.isEqual('MODIFY')
                }),
            ]
        }));

        const indexerFn = new nodeLambda.NodejsFunction(this, 'IndexerFn',
            {
                entry: __dirname + '/indexer.ts',
                environment: {
                    OPENSEARCH_ENDPOINT: domain.domainEndpoint,
                    INDEX_NAME: 'backlog',
                },
                memorySize: 512,
                timeout: Duration.seconds(30),
            }
        )
        domain.grantIndexReadWrite(indexerFn);

        indexerFn.addEventSource(new events.SqsEventSource(backlogQueue, { batchSize: 10 }))
    }
}