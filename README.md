
Personal project to learn about the AWS ecosystem with some basic system design/ dev ops.

# To-Do List


## 1. UI Improvements

If it's crossed out it should be ~~completed~~
* ~~Add a button and modal to create new backlog items.~~
* Fix layout bugs:
    * Title overlapping images
    * ~~Page resizing weirdly based on list size~~
    * ~~Load More button placement~~
    * ~~Improve colors: Can't see login and username very well. Clashing of grey /white.~~
* Switch the rating slider to stars
* ~~Move login info (username) to top-right corner and make it easier to read~~
* Fix display when no items to show. (empty list component?) (New)
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