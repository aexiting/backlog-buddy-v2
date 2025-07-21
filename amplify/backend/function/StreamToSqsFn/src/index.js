"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const client_sqs_1 = require("@aws-sdk/client-sqs");
const sqs = new client_sqs_1.SQSClient({});
const handler = async (event) => {
    const entries = event.Records.map((r, i) => ({
        Id: `msg${i}`,
        MessageBody: JSON.stringify(r.dynamodb.NewImage),
    }));

    console.log(process.env.QUEUEURL)
    for (let i = 0; i < entries.length; i += 10) {
        await sqs.send(new client_sqs_1.SendMessageBatchCommand({
            QueueUrl: process.env.QUEUEURL,
            Entries: entries.slice(i, i + 10),
        }));
    }
};
exports.handler = handler;
