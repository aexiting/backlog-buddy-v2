import { Client } from '@opensearch-project/opensearch';

import { AwsSigv4Signer } from '@opensearch-project/opensearch/aws';
import { defaultProvider } from '@aws-sdk/credential-provider-node';

const osClient = new Client({
    ...AwsSigv4Signer({
        region:  process.env.AWS_REGION,
        service: 'es',
        getCredentials: defaultProvider(),
    }),
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