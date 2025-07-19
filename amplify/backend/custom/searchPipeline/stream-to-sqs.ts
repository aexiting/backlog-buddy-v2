import { SQSClient, SendMessageBatchCommand } from '@aws-sdk/client-sqs';
const sqs = new SQSClient({});

export const handler = async (event: any) => {
    const entries = event.Records.map((r: any, i: number) => ({
        Id: `msg${i}`,
        MessageBody: JSON.stringify(r.dynamodb.NewImage),
    }));

    for (let i = 0; i < entries.length; i += 10) {
        await sqs.send(
            new SendMessageBatchCommand({
                QueueUrl: process.env.QUEUE_URL!,
                Entries: entries.slice(i, i + 10),
            })
        );
    }
};