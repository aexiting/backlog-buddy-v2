
import fetch from 'node-fetch'

const APPSYNC_ENDPOINT = 'https://ux5dr6bdo5ddtfgnj4brm73zvm.appsync-api.us-east-1.amazonaws.com/graphql'; // Found in your aws-exports.js file
const JWT_TOKEN = 'eyJraWQiOiJ6b2N4VnUxejFnZm1HY2NMNnB6TVdYWlZiUFdKYnV1dnFIandkcEtoQTkwPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJlNDM4NTRkOC01MDIxLTcwMjItYzg4OS01ZGY0MzA5YmM1YTgiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfZlQ4VGdwajRWIiwiY29nbml0bzp1c2VybmFtZSI6ImFkYW0iLCJvcmlnaW5fanRpIjoiYTQ3Mzg1OWQtYWQyZS00OTkwLWIxZDctMzBkYTA1ZGNhYTdkIiwiYXVkIjoiNzJxMWVnYWkzZnY5aXN1aWhia2RmYTI4N3IiLCJldmVudF9pZCI6ImM0NjhhYmEzLWQ2OWYtNDVhZi1hYjYxLTMzY2RkZTUyNzIyYyIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNzUzMDQyNTc1LCJleHAiOjE3NTMwNDYxNzUsImlhdCI6MTc1MzA0MjU3NSwianRpIjoiMDI0M2JjYTYtYTdiYS00YjcyLTg0ZjktMWRmNDE5NWQxMjc4IiwiZW1haWwiOiJhZGFtdHR3YXlAZ21haWwuY29tIn0.fXYP-iKElsO70OK7HU8rj3HMyfDkqJjJgmpQ-f8S42M6sANDoKRRBIBq33LHtIusNQB1a17zHMqfSPn3E8pwSJKyORMseJvWpb9HNGrSY-_iMyQ0_mYHaa2Ch6xaeBZ6UcImmro5VYTJBvwfm2mf0kibbNR_Etyf16iZAV48W4Ry2cCpKo8kI4gcAIHPF2N66dXW1DC4qBNwA4qXWF6b4l94s3v9gLZFiXbM4GsOJHSiPAbMQC5OrnEZ9_Kz9enhb9NLur2EnKvHfYH84qJUdvlrCUEDkDjxIsdUdAjzE09hBD9g2aaKWTMCmwTQ0P-1jE51sAWbZPrsOI0hCrL7HQ'
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
