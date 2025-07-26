# Backlog Buddy

Personal project to learn about the AWS ecosystem with some basic system design/ dev ops. Using Amplify to simplify the 
service orchestration.
A personal website to keep track of certain media I've been consuming.


## About The Project

Currently, using [ANILIST GRAPHQL API](https://docs.anilist.co/) to populate a database with various anime.
This allows the user to easily add new backlog items, set their status (e.g. watching or dropped) to keep track.

People would ask my what I've been watching lately, and I'd draw a blank, so I decided to create my own.
Also, a lot of indie manga are JP only so I'll be sure to populate that as well. These days I read mostly indie.


### Key Features

* **Track Multiple Media Types:** Keep a log of your Games, Books, Movies, and TV Series all in one place. (soon)
* **Manage Progress:** Assign statuses like "Pending," "In Progress," "Completed," or "Dropped" to each item.
* **Rate Your Media:** Give items a rating from 1 to 5 stars to remember your favorites.
* **Powerful Search:** Instantly find any item in your backlog with a fast, full-text search engine powered by Amazon OpenSearch.
* **External API Integration:** Automatically fetches and caches metadata from Anilist to enrich your backlog items.


### Frontend

The user interface is a responsive and fast single-page application.

* **Framework:** **React**
* **Language:** **TypeScript**
* **Build Tool:** **Vite**
* **Styling:** **Tailwind CSS**
* **Component Library:** **Amplify UI** (for a consistent look and feel integrated with the backend)

### Backend / Infrastructure

The backend is a completely serverless, event-driven architecture hosted on AWS, designed for high performance and scalability.

* **Hosting & CI/CD:** **AWS Amplify** manages the deployment, hosting, and environment configuration.
* **API Layer:** **AWS AppSync (GraphQL)** provides a flexible and powerful API with custom authorization rules to secure data.
* **Primary Database:** **Amazon DynamoDB** serves as the main data store for all backlog items. It also utilizes TTL (Time To Live) for efficient caching of data fetched from external APIs.
* **Search Functionality:**
  * **Amazon OpenSearch:** Powers the robust, full-text search capabilities.
  * **AWS Lambda (Indexer):** A Lambda function is triggered to process and send data to the OpenSearch index.
  * **Amazon SQS (Simple Queue Service):** An SQS queue decouples the API from the indexing process. When an item is created or updated, an event is sent to the queue, ensuring the search index is updated reliably without impacting API response times.

### Testing 
* **Playwright** (E2E tests) Currently working on a way to run these tests automatically since it's not compatible with AWS Amplify.
## 🚀 Getting Started

To run this project locally, you will need Node.js and the AWS Amplify CLI installed and configured.

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/backlog--v2.git](https://github.com/aexiting/backlog-buddy.git)
    cd backlog-buddy-v2
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Initialize Amplify backend:**
    ```bash
    amplify init
    ```

4.  **Deploy the backend infrastructure:**
    *This will provision all the AWS resources defined in the stack (AppSync, DynamoDB, Lambda, etc.).*
    ```bash
    amplify push
    ```

5.  **Run the development server:**
    ```bash
    npm run dev
    ```

The application should now be running on `http://localhost:5173`.

You can also use the [amplify full stack guide](https://docs.amplify.aws/gen1/react/start/getting-started/setup/) for debugging.

# To-Do List

## Paper-cuts
* Can't cancel edit without opening edit dialog box.

## 1. UI Improvements

If it's crossed out it should be ~~completed~~
* ~~Add a button and modal to create new backlog items.~~
* ~~Fix layout bugs:~~
    * ~~Title overlapping images~~
    * ~~Page resizing weirdly based on list size~~
    * ~~Load More button placement~~ 
    * ~~Improve colors: Can't see login and username very well. Clashing of grey /white.~~ 
    * ~~Fix location of loader element~~ (New)
* Switch the rating slider to stars
* ~~Fix data pills being unreadable~~ (New)
* ~~Move login info (username) to top-right corner and make it easier to read~~
* ~~Fix display when no items to show. (empty list component?) (New)~~

## 2. Backend & Search
* Stop reading directly from the database — use OpenSearch for all item searches
* Add more fields to the backlog index (like user ID and anime ID) rather than just the title
* Create a new OpenSearch index for anime info with fields:
    * ID
    * Image
    * Name
    * Average rating
    * Status counts ()
* Use the anime index to power a dropdown when adding backlog items
* Re-run search when items are added, edited, or deleted

## 3. Auth & Security

* Remove hardcoded user info and link data to the logged-in user
* ~~Display username visibly in the header~~
* Store API keys safely in Amplify environment variables
* Update OpenSearch to use encryption
* Can for XSS and sql injection
* Update amplify graphql auth rules
* Create a userId (uuid) rather than using user id in OpenSearch docs.

## 4. Testing & CI

* Write Playwright tests for adding, editing, deleting, and searching items
* Write unit tests for important logic like OpenSearch queries
* Use GitHub Actions to run tests on every pull request
* Use Amplify Preview to test new branches before merging
* Add some security related tests like trying to access another user's backlog

## 5. Seed Data & Stats

* Add real anime data from AniList and store it in DynamoDB
* Create some fake users and backlog entries for testing
* Show user stats like average rating and completion percentage

## Current timeline?
* TBD