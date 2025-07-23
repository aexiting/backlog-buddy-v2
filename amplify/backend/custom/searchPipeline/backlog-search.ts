import { Client } from '@opensearch-project/opensearch';

import { AwsSigv4Signer } from '@opensearch-project/opensearch/aws';
import { defaultProvider } from '@aws-sdk/credential-provider-node';

const osClient = new Client({
    ...AwsSigv4Signer({
        region: process.env.AWS_REGION,
        service: 'es',
        getCredentials: defaultProvider(),
    }),
    node: `https://${process.env.OPENSEARCH_ENDPOINT}`,
    maxRetries: 3,
    requestTimeout: 30_000,
});

export const handler = async (event: any) => {
    console.log("Received event {}", JSON.stringify(event));
    const { title, type, rating, owner, status, from } = event.arguments;

    const mustClauses = [];
    const filterClauses = [];

    mustClauses.push({
        match: {
            title: {
                query: title,
                operator: "and"
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
    }

    console.log("Executing OpenSearch query:", JSON.stringify(query, null, 2));

    try {
        const response =  await osClient.search({
            index: process.env.INDEX_NAME,
            body: query
        })

        const hits = response.body.hits;
        const results = hits.hits.map(hit => hit._source);

        console.log(`Found ${results.length} items.`);
        return results;

    }
    catch(err) {
        if(err.response) {
            console.error("Error from OpenSearch:", JSON.stringify(err.response.data));
        } else {
            console.error("Error executing HTTP request:", err.message);
        }
    }
};