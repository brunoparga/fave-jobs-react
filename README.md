# Fave Jobs front-end

## About this app

This is the front-end React app I am submitting as part of [Get on Board's code challenge](https://gist.github.com/j4rs/1e4c1e37e063fd5143b8b9ed18329730).

This app collects data from two sources: the [back-end Rails API](https://github.com/brunoparga/fave-jobs-api) and Get on Board's own API. Both sources return the same type of resource, lists of job offers. The back-end holds the offers the user has marked as favorite, while the external API responds to search queries, e.g. by programming language of the job offer. Jobs from both sources are shown together in a list, which allows the user to click to see more details of each offer; both the list view and the details view allow the user to add an offer as favorite (or remove it 😞).

## Setup

Let's look at how to get this app deployed.

### Install and run

First of all, clone this repository into your machine:

```
git clone https://github.com/brunoparga/fave-jobs-react.git
cd fave-jobs-react
```

Install the npm packages the app depends on and fire up the server:

```
npm install
npm start
```

The app should open automatically on your browser. If that does not happen, one possible cause is you have some other process (like the API) taking up port 3000; you'll be asked:

```
Would you like to run the app on another port instead? (Y/n)
```

You certainly do, so choose the corresponding option. Now, regardless of the port the app is running on, you can navigate to `http://localhost:[port number]/` to view it.

### Deploy

Once you've played with the app a little on your machine, it's time to deploy it! We'll use GitHub pages for this (but feel free to use another hosting provider like Heroku if you wish! Configuration is on you, though.)

First, we need to define what our URL will look like. In the `package.json` field `"homepage"`, replace my username with yours. Make sure to tell the API to recognize that, by making the same change to its `config/initializers/cors.rb` file. Once your API is deployed and has a URL, put it as the `INTERNAL_API_URL` constant in `src/ducks/jobs.js`.

So, now that both our apps are set up to recognize each other and the front-end knows where it's supposed to be deployed, do:

```
npm run deploy
```

This will generate the build bundle and deploy it to your GitHub account. It might ask for your username and password, since it's accessing your account on your behalf.

Are you hydrated? When was the last time you drank water? Possibly a while, I guess... stand up, stretch your legs, go grab a water; the first deployment to GitHub Pages takes up to 10 minutes, since it propagates to the whole GitHub CDN (Content Delivery Network).

Now that you've _checked your water and drunk a Twitter_, you can go to the URL you set up on `package.json`, which is probably `https://[your-github-username].github.io/fave-jobs-react` and see your front-end gloriously deployed. (Or not. This worked for me for the main repository, but not for a side one that I built to test these instructions. I don't know what to do here. Halp!)

### Test

Finally, you'll want to run the test suite:

```
npm test
```

Furthermore, on top of the unit tests, there are the end-to-end tests:

```
./node_modules/.bin/nightwatch
```

That should be all. Happy favoriting jobs!

## Progress report

- The search part is done!
- The index/search page displays the jobs received from the APIs, with their basic information. It gets all favorites from this project's Rails API and the searched ones from the Get on Board API.
- The jobs are clickable, taking the user to a page with the job's complete details.
- Results are shown in cards using company images.
- Marking jobs as favorite, and removing them, works.
- Filter out queried jobs if they're already favorites.
- The app is deployed to GitHub Pages.
- As a side effect of switching from BrowserRouter to HashRouter, previously queried jobs seem to persist even after navigating to a specific job's details and back to the main page. So there seems to be no need to include the query in the state.
- Change the `removeFavorite` thunk so that it doesn't look for a response body; instead, it will look for the `api_id` key in the response headers. Its payload will be an object with only that key.
- Documentation on deploying and testing.
- The app is as styled as it'll get.
- End-to-end tests.
- Unit and integration tests (e.g. for the jobs duck).

## To-dos and known issues

- oops, it looks like I actually need to keep the search query in the state. Otherwise, emptying the favorites prevents the user from seeing the search results, as an empty query gets endlessly fetched from the server;
- (?) turn the hard-coded API URLs (both here and in the back-end) into environment variables

## Technical decisions

### Redux and ducks

At first, it was decided not to use Redux. The app seemed simple enough to make do with just React's own state management practices. However, the need to pass details of the jobs fetched from the external API to the page displaying them strongly suggests Redux is actually needed here.

Following the same reasoning of not using things unless absolutely necessary, I am not (yet...) installing two packages I usually use, `redux-form` and `connected-react-router`.

I have organized the Redux action/reducer logic into [ducks](https://github.com/erikras/ducks-modular-redux) for the first time. In hindsight, I should have used [duck folders](https://www.freecodecamp.org/news/scaling-your-redux-app-with-ducks-6115955638be/) instead of duck files.

### Functions and hooks

I made two related decisions, of using only function React components rather than class components and of eschewing Redux's `connect` higher-order component and its friend `bindActionConnectors`. Both these decisions tie closely with the use of Hooks.

First, the preference for function over class components. This is partly because I believe they are simpler to reason about, partly due to a functional programming perspective. Function components are easier to reason about because they don't rely on inheritance - although, to be fair, React does incentivize using composition over inheritance - and I never have to ask myself what the `this` keyword refer to. I believe overall the function component is more transparent about what it does. Naturally, this decision entails using the React Hooks `useState` in lieu of `this.setState` and associates, and `useEffect` instead of component lifecycle methods.

There is also my preference for a functional programming paradigm. It is hard to look at a React app, with its constant two-way interaction with the outside world, in pure functional terms; still, I have an intuition that function components are desirable because maybe they obey the [Anna Karenina principle](https://en.wikipedia.org/wiki/Anna_Karenina_principle), which states that _"all happy families are alike; each unhappy family is unhappy in its own way."_ Similarly, a correct function works the same way regardless of the language and framework it is coded in; even correct class/object-oriented solutions could work very differently, depending on the specific implementation details of the OO language they are coded in (e.g. C++ has multiple inheritance, which Ruby lacks). And this similarity of functional solutions could help programmers not reinvent the wheel if they have to switch languages/paradigms.

It should be noted that the above paragraph is speculative and admittedly not very pragmatic. I don't have a lot of credence in that hypothesis and would be glad to learn better ways of thinking about the issue.

The second decision alluded above sort of extends the use of React hooks to the Redux world. Instead of relying on the `connect` HOC to bring in state and action creators to components, I chose to use `useSelector` and `useDispatch` for these two roles. On top of dovetailing nicely with the React hooks, I believe these Redux hooks make the intent of the code more explicit; the function files also end up somewhat simpler.

### CSS

I have tried to organize the stylesheets based on the [BEM methodology](http://getbem.com/introduction/), which layers selectors into Blocks, Elements and Modifiers. One advantage is a very flat structure, with few if any questions about specificity. On the other hand, class names tend to get quite big and I am essentially not benefiting from React's component structure. I am not strongly attached to BEM; it is just a set of guidelines I happen to know a bit about, so I used them.

### End-to-end testing

To make sure all of the moving parts are working, end-to-end tests with Nightwatch have been implemented. These spin up a browser to automatically visit my deployment of the app, use its search function, visit the page of a found job and toggle the favorite status through both pages.

It should be noted that these tests are not entirely reliable; if the API takes a little too long to respond, they time out or otherwise believe unexpectedly. I still have much to learn to make more resilient tests.
