# Fave Jobs front-end

## Progress report

- The search part is done!
- The index/search page displays the jobs received from the APIs, with their basic information. It gets all favorites from this project's Rails API and the searched ones from the Get on Board API.
- The jobs are clickable, taking the user to a page with the job's complete details.
- Results are shown in cards using company images.

## TODOs (in no particular order)

- filter out queried jobs if they're already favorites;
- marking jobs as favorite;
- CSS;
- tests;
- keep the query in the state? This would allow the user to visit one job page and go back to the list of his results. Sounds desirable. The action could be called from handleSubmit.

## Technical decisions

At first, it was decided not to use Redux. The app seemed simple enough to make do with just React's own state management practices. However, the need to pass details of the jobs fetched from the external API to the page displaying them strongly suggests Redux is actually needed here.

Following the same reasoning of not using things unless absolutely necessary, I am not (yet...) installing two packages I usually use, `redux-form` and `connected-react-router`.

I will be organizing the Redux action/reducer logic into [ducks](https://github.com/erikras/ducks-modular-redux) for the first time.

# CRA boilerplate

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
