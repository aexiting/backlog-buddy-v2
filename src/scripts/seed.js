
import fetch from 'node-fetch'

const APPSYNC_ENDPOINT = 'https://ux5dr6bdo5ddtfgnj4brm73zvm.appsync-api.us-east-1.amazonaws.com/graphql'; // Found in your aws-exports.js file
const JWT_TOKEN = 'eyJraWQiOiJGK2JOMTZkdXJobGxzNkV6cVwvc0IzOStaYnR4TFBtS3ByeTdlaGpnOW1WVT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJlNDM4NTRkOC01MDIxLTcwMjItYzg4OS01ZGY0MzA5YmM1YTgiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9mVDhUZ3BqNFYiLCJjbGllbnRfaWQiOiI3MnExZWdhaTNmdjlpc3VpaGJrZGZhMjg3ciIsIm9yaWdpbl9qdGkiOiJhNDczODU5ZC1hZDJlLTQ5OTAtYjFkNy0zMGRhMDVkY2FhN2QiLCJldmVudF9pZCI6ImM0NjhhYmEzLWQ2OWYtNDVhZi1hYjYxLTMzY2RkZTUyNzIyYyIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE3NTMwNDI1NzUsImV4cCI6MTc1MzA1ODQ4MSwiaWF0IjoxNzUzMDU0ODgxLCJqdGkiOiI1NWUxMWEyMy1hOGRmLTRhMjYtYWJmNS05MDRkOGNmMzg1Y2UiLCJ1c2VybmFtZSI6ImFkYW0ifQ.np6AtjpWPjZPpo-CV2NPUgrHjDgihjb7W8IhtetYVFF4j-eIh50YAoFuwIgGdgRJJXvTP-BtXd93w1YUTu8Q9SQUZL6Opkx7Dn8thh-PVfRpEvN_1ql0Mg2Od4Es-YOWXLTcTUmnOSrFgUaH9czvwqx0ZDFx1rG3xv3TkypeWIn9-NLEkBrnW_PVWt8tTDj5yy4sCafOr4TNscauxulT4CKfzzJH3A-5VByDlAFiGo0KR2vKanSib9BNgMiClmi7gmzPxWEKdeSlJXvCjokPEhXSo6-mqMmQVJCw1mc6ekShBOJcRQNzlM8XPgjmvIdTZBi2zrjYh5IIr15qCl1c5g'
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
