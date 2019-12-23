# Fave Jobs front-end

## Progress report

- The search part is done!
- The index/search page displays the jobs received from the APIs, with their basic information. It gets all favorites from this project's Rails API and the searched ones from the Get on Board API.
- The jobs are clickable, taking the user to a page with the job's complete details.
- Results are shown in cards using company images.
- Marking jobs as favorite, and removing them, works.
- Filter out queried jobs if they're already favorites.
- The app is deployed to GitHub Pages.
- As a side effect of switching from BrowserRouter to HashRouter, previously queried jobs seem to persist even after navigating to a specific job's details and back to the main page. So there seems to be no need to include the query in the state.

## TODOs (in no particular order)

- CSS;
- tests;
- documentation on deploying and testing;
- change the `removeFavorite` thunk so that it doesn't look for a response body; instead, it will look for the `api_id` key in the response headers. Its payload will be an object with only that key.

## Technical decisions

At first, it was decided not to use Redux. The app seemed simple enough to make do with just React's own state management practices. However, the need to pass details of the jobs fetched from the external API to the page displaying them strongly suggests Redux is actually needed here.

Following the same reasoning of not using things unless absolutely necessary, I am not (yet...) installing two packages I usually use, `redux-form` and `connected-react-router`.

I will be organizing the Redux action/reducer logic into [ducks](https://github.com/erikras/ducks-modular-redux) for the first time.
