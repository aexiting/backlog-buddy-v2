"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const opensearch_1 = require("@opensearch-project/opensearch");
const aws_1 = require("@opensearch-project/opensearch/aws");
const credential_provider_node_1 = require("@aws-sdk/credential-provider-node");
const osClient = new opensearch_1.Client(Object.assign(Object.assign({}, (0, aws_1.AwsSigv4Signer)({
    region: process.env.AWS_REGION,
    service: 'es',
    getCredentials: (0, credential_provider_node_1.defaultProvider)(),
})), { node: `https://${process.env.OPENSEARCH_ENDPOINT}`, maxRetries: 3, requestTimeout: 30000 }));
const handler = async (event) => {
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
    const failures = [];
    bulkResp.body.items.forEach((item, idx) => {
        const op = item.index || item.create || item.update;
        if (op === null || op === void 0 ? void 0 : op.error)
            failures.push(event.Records[idx].messageId);
    });
    return {
        batchItemFailures: failures.map((id) => ({ itemIdentifier: id })),
    };
};
exports.handler = handler;
