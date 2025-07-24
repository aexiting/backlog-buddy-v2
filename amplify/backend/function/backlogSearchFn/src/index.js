"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require('crypto');
exports.handler = void 0;
const opensearch_1 = require("@opensearch-project/opensearch");
const aws_1 = require("@opensearch-project/opensearch/aws");
const credential_provider_node_1 = require("@aws-sdk/credential-provider-node");
const osClient = new opensearch_1.Client(Object.assign(Object.assign({}, (0, aws_1.AwsSigv4Signer)({
    region: process.env.AWS_REGION,
    service: 'es',
    getCredentials: (0, credential_provider_node_1.defaultProvider)(),
})), { node: `https://${process.env.OPENSEARCHENDPOINT}`, maxRetries: 3, requestTimeout: 30000 }));
const handler = async (event) => {
    console.log("Received event {}", JSON.stringify(event));
    const { title, type, rating, owner, status, from } = event.arguments;
    const mustClauses = [];
    const filterClauses = [];
    mustClauses.push({
        match: {
            title: {
                query: title,
                operator: "and",
                fuzziness: "AUTO"
            }
        }
    });
    if (type) {
        filterClauses.push({ term: { "type.keyword": type } });
    }
    if (rating) {
        filterClauses.push({ term: { "rating.keyword": rating } });
    }
    if (owner) {
        filterClauses.push({ term: { "owner.keyword": owner } });
    }
    if (status) {
        filterClauses.push({ term: { "status.keyword": status } });
    }
    const query = {
        from: from,
        size: 10,
        query: { bool: { must: mustClauses, filter: filterClauses } }
    };
    console.log("Executing OpenSearch query:", JSON.stringify(query, null, 2));
    try {
        const response = await osClient.search({
            index: process.env.OPENSEARCHINDEX,
            body: query
        });
        const hits = response.body.hits;
        // I made a mistke with seeding the documents... I should have added a UUID for each backlog item when I started
        // seeding. my bad g.
        // TO-DO: We should have source of truth so I should update indexer to include the id.
        const results = hits.hits.map(hit => hit._source).map(hit => ({...hit, id: crypto.randomUUID()}));
        console.log("Getting results");
        console.log(`Found ${results.length} items.`);
        return results;
    }
    catch (err) {
        if (err.response) {
            console.error("Error from OpenSearch:", JSON.stringify(err.response.data));
        }
        else {
            console.error("Error executing HTTP request:", err.message);
        }
    }
};
exports.handler = handler;
