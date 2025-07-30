import {
  aws_dynamodb as ddb,
  aws_lambda_event_sources as events,
  aws_opensearchservice as os,
  aws_sqs as sqs,
  Duration,
  RemovalPolicy,
  Stack,
} from "aws-cdk-lib";
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { StartingPosition } from 'aws-cdk-lib/aws-lambda';
import { Construct } from "constructs";
import { DynamoEventSource } from "aws-cdk-lib/aws-lambda-event-sources";
import * as cdk from "aws-cdk-lib";
import * as AmplifyHelpers from '@aws-amplify/cli-extensibility-helper';
import { AmplifyDependentResourcesAttributes } from "../../types/amplify-dependent-resources-ref";
import { Role } from "aws-cdk-lib/aws-iam";


export class cdkStack extends Stack {
  constructor(scope: Construct, id: string, props: any, amplifyResourceProps?: AmplifyHelpers.AmplifyResourceProps) {
    super(scope, id, props);
    /* Do not remove - Amplify CLI automatically injects the current deployment environment in this input parameter */
    new cdk.CfnParameter(this, 'env', {
      type: 'String',
      description: 'Current Amplify CLI env name',
    });

    const dependencies: AmplifyDependentResourcesAttributes = AmplifyHelpers.addResourceDependency(this,
        amplifyResourceProps.category,
        amplifyResourceProps.resourceName,
        [
          { category: "function", resourceName: "StreamToSqsFn" },
          { category: "function", resourceName: "IndexerFn" },
          { category: "api", resourceName: "backlogbuddyv2" }
        ]
    );

    const streamToSqsFnArn = cdk.Fn.ref(dependencies.function.StreamToSqsFn.Arn)
    const indexerFnArn = cdk.Fn.ref(dependencies.function.IndexerFn.Arn)
    const streamToSqsFnRoleArn = cdk.Fn.ref(dependencies.function.StreamToSqsFn.LambdaExecutionRoleArn)
    const indexerFnRoleArn = cdk.Fn.ref(dependencies.function.IndexerFn.LambdaExecutionRoleArn)


    const DDB_BATCH_SIZE = 25;
    const INDEX_NAME = 'backlog';

    const backlogTable = ddb.Table.fromTableAttributes(this, 'BacklogTable', {
      tableName: 'BacklogItem-dev',
      tableStreamArn: 'arn:aws:dynamodb:us-east-1:479699168417:table/BacklogItem-qysl5ncp2jb6fdvi2vollqeete-dev/stream/2025-07-18T13:42:33.324',
    });

    const animeTable = ddb.Table.fromTableAttributes(this, 'Anime', {
      tableName: 'Anime-dev',
      tableStreamArn: 'arn:aws:dynamodb:us-east-1:479699168417:table/Anime-qysl5ncp2jb6fdvi2vollqeete-dev/stream/2025-07-29T18:10:27.787',
    });

    const dlq = new sqs.Queue(this, 'IndexerDLQ', {
      retentionPeriod: Duration.days(14)
    });

    const backlogQueue = new sqs.Queue(this, "BacklogQueue", {
      deadLetterQueue: { queue: dlq, maxReceiveCount: 3 },
      visibilityTimeout: Duration.seconds(60)
    });

    const domain = new os.Domain(this, 'BacklogSearchDomain', {
      version: os.EngineVersion.OPENSEARCH_2_13,
      capacity: { dataNodeInstanceType: 't3.small.search', dataNodes: 1 },
      removalPolicy: RemovalPolicy.DESTROY,   // dev only
    });

    const streamFn = lambda.Function.fromFunctionAttributes(this, 'StreamToSqsFn', {
      functionArn: streamToSqsFnArn,
      role: Role.fromRoleArn(this, 'StreamToSqsFnRole', streamToSqsFnRoleArn),
    });

    const indexerFn = lambda.Function.fromFunctionAttributes(this, 'IndexerFn', {
      functionArn: indexerFnArn,
      role: Role.fromRoleArn(this, 'IndexerFnRole', indexerFnRoleArn),
    });

    new cdk.CfnOutput(this, 'QUEUE_URL', {
      value: backlogQueue.queueUrl,
    });

    new cdk.CfnOutput(this, 'OPENSEARCH_ENDPOINT', {
      value: domain.domainEndpoint,
    });

    new cdk.CfnOutput(this, 'OPENSEARCH_INDEX', {
      value: INDEX_NAME,
    });

    backlogQueue.grantSendMessages(streamFn);
    backlogQueue.grantConsumeMessages(indexerFn);
    backlogQueue.grantSendMessages(indexerFn);

    streamFn.addEventSource(new DynamoEventSource(backlogTable, {
      startingPosition: StartingPosition.TRIM_HORIZON,
      batchSize: DDB_BATCH_SIZE,
      filters: [
        lambda.FilterCriteria.filter({
          eventName: lambda.FilterRule.notEquals('REMOVE')
        })
      ]
    }));

    streamFn.addEventSource(new DynamoEventSource(animeTable, {
      startingPosition: StartingPosition.TRIM_HORIZON,
      batchSize: DDB_BATCH_SIZE,
      filters: [
        lambda.FilterCriteria.filter({
          eventName: lambda.FilterRule.notEquals('REMOVE')
        })
      ]
    }));

    domain.grantWrite(indexerFn);

    indexerFn.addEventSource(new events.SqsEventSource(backlogQueue, { batchSize: 10 }));
  }
}
