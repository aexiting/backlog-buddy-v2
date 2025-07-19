import { Client } from '@opensearch-project/opensearch';

import { createAWSConnection, awsGetCredentials } from '@opensearch-project/opensearch/aws';

const awsCreds = await awsGetCredentials();
const AWSConnection = createAWSConnection(awsCreds);

const osClient = new Client({
    ...AWSConnection,
    node: `https://${process.env.OPENSEARCH_ENDPOINT}`,
    maxRetries: 3,
    requestTimeout: 30_000,
});

export const handler = async (event: any) => {
    const body = event.Records.flatMap((rec) => {
        const payload = JSON.parse(rec.body);
        const id = payload.id.S;

        return [
            { index: { _index: process.env.INDEX_NAME, _id: id } },
            {
                title: payload.title.S,
                type: payload.type.S,
                status: payload.status.S,
                image: payload.image.S,
                rating: Number(payload.rating.N),
                owner: payload.owner.S,
                createdAt: new Date(payload.createdAt.S).toISOString(),
                updatedAt: new Date(payload.updatedAt.S).toISOString(),
            },
        ];
    });

    const bulkResp = await osClient.bulk({ body });

    const failures: string[] = [];

    bulkResp.body.items.forEach((item, idx) => {
        const op = item.index || item.create || item.update;
        if (op?.error) failures.push(event.Records[idx].messageId);
    });

    return {
        batchItemFailures: failures.map((id) => ({ itemIdentifier: id })),
    };
};