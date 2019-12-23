# Fave Jobs front-end

## About this app

## Setup

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

I made two related decisions, of using only function React components rather than class components and of eschewing Redux's `connect` higher-order component and its friend `bindActionConnectors`. Both these decisions tie closely with the use of Hooks.

First, the preference for function over class components. This is partly because I believe they are simpler to reason about, partly due to a functional programming perspective. Function components are easier to reason about because they don't rely on inheritance - although, to be fair, React does incentivize using composition over inheritance - and I never have to ask myself what the `this` keyword refer to. I believe overall the function component is more transparent about what it does. Naturally, this decision entails using the React Hooks `useState` in lieu of `this.setState` and associates, and `useEffect` instead of component lifecycle methods.

There is also my preference for a functional programming paradigm. It is hard to look at a React app, with its constant two-way interaction with the outside world, in pure functional terms; still, I have an intuition that function components are desirable because maybe they obey the [Anna Karenina principle](https://en.wikipedia.org/wiki/Anna_Karenina_principle), which states that _"all happy families are alike; each unhappy family is unhappy in its own way."_ Similarly, a correct function works the same way regardless of the language and framework it is coded in; even correct class/object-oriented solutions could work very differently, depending on the specific implementation details of the OO language they are coded in (e.g. C++ has multiple inheritance, which Ruby lacks). And this similarity of functional solutions could help programmers not reinvent the wheel if they have to switch languages/paradigms.

It should be noted that the above paragraph is speculative and admittedly not very pragmatic. I don't have a lot of credence in that hypothesis and would be glad to learn better ways of thinking about the issue.

The second decision alluded above sort of extends the use of React hooks to the Redux world. Instead of relying on the `connect` HOC to bring in state and action creators to components, I chose to use `useSelector` and `useDispatch` for these two roles. On top of dovetailing nicely with the React hooks, I believe these Redux hooks make the intent of the code more explicit; the function files also end up somewhat simpler.
