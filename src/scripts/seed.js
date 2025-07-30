
import fetch from 'node-fetch'

const APPSYNC_ENDPOINT = 'https://ux5dr6bdo5ddtfgnj4brm73zvm.appsync-api.us-east-1.amazonaws.com/graphql'; // Found in your aws-exports.js file
const JWT_TOKEN = ''
const ANILIST_ENDPOINT = 'https://graphql.anilist.co';

const anilistQuery = `
  query {
    Page(page: 1, perPage: 50) {
      media(type: ANIME, sort: SCORE_DESC) {
        id
        title {
          english
          romaji
        }
        averageScore
        coverImage {
          extraLarge
        }
      }
    }
  }
`;

const createBacklogItemMutation = `
  mutation CreateBacklogItem($input: CreateBacklogItemInput!) {
    createBacklogItem(input: $input) {
      id
      title
      status
    }
  }
`;

const seedDatabase = async () => {
    console.log('Fetching top anime from Anilist')

    const response = await fetch(ANILIST_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
        },
        body: JSON.stringify({query: anilistQuery})
    })

    const anilistJson = await response.json();

    const animeList = anilistJson.data.Page.media;

    console.log(`Found ${animeList.length} anime. Starting to seed your database...`);

    for (const anime of animeList) {
        const input = {
            title: anime.title.english || anime.title.romaji,
            type: 'ANIME',
            rating: Math.round(anime.averageScore / 20), // AniList is 1-100, we convert to 1-5
            owner: 'adam',
            status: 'NOT_STARTED',
            image: anime.coverImage.extraLarge,
        };

        const requestBody = {
            query: createBacklogItemMutation,
            variables: {input}
        }

        try {
            const apiResponse = await fetch(APPSYNC_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : JWT_TOKEN
                },
                body: JSON.stringify(requestBody),
            })

            const apiJson = await apiResponse.json()

            if (apiJson.errors) {
                console.error(`Error creating "${input.title}":`, apiJson.errors);
            } else {
                console.log(`Successfully created: ${apiJson.data.createBacklogItem.title}`);
            }
        }
        catch(e) {
            console.log(`Error adding new row to dynamodb table ${e}`)
        }
        await new Promise(resolve => setTimeout(resolve, 200));
    }
}


seedDatabase().catch(console.error);
