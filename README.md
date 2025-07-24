
Personal project to learn about the AWS ecosystem with some basic system design/ dev ops.

## TO-DO List
1. Clean up frontend
   1. Add button and a new modal for adding new backlog items.
      1. Modal should have all the inputs display be more stable.
2. Remove direct fetches to database for backlog items and use search instead.
3. Update OpenSearch backlogitem index with ids.
3. Fix backlog items
   1. Titles floating towards the thumbnails
   2. Size of list changing the size of the page.
   3. Load more button should show at bottom.
   4. Trigger search again when changes are done to database.
   5. Fix the color 
4. Fix the log-in and username display
   1. hard to see the text should move it into its own modal.
   2. Add it to the upper right hand corner in its own div.
5. Switch rating slider to use a set of stars.
6. Add new anime database that has
   * Id
   * Image
   * Name
   * Avg star rating
   * Number of users with each status (started, finished, dropped, etc.)
7. Populate dropdown with aforementioned anime database when adding a new backlog item.
   * dropdown is powered by another OpenSearch index based on anime rather than backlogitems
8. Write playwright and unit tests for the functionality. And run them using GitHub Actions.
   * Will break down the test scenarios here when I have time.
9. Security clean up for the api keys.
10. Remove user hardcodes so we can have multiple users.
11. Seed more Anime and backlog items 
12. Add user stats 