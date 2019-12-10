// Single point of control for API URLs
const INTERNAL_API_URL = 'https://fave-jobs-api.herokuapp.com/jobs';
const EXTERNAL_API_URL = 'https://www.getonbrd.com/search/jobs';

// Action types
const prefix = 'fave-jobs-react/jobs';
const FETCH_JOBS = `${prefix}/FETCH_JOBS`;
const ADD_FAVORITE = `${prefix}/ADD_FAVORITE`;
const REMOVE_FAVORITE = `${prefix}/REMOVE_FAVORITE`;

// Helper
const toggleFavorite = (payload, job) => {
  let newJob = job;
  if (payload.api_id === job.api_id) {
    newJob = { ...job, favorite: !job.favorite };
  }
  return newJob;
};

// Reducer
export default (state = [], { type, payload }) => {
  switch (type) {
    case FETCH_JOBS:
      return payload;
    case ADD_FAVORITE:
    case REMOVE_FAVORITE:
      return state.map((job) => toggleFavorite(payload, job));
    default:
      return state;
  }
};

// Action creators
export const fetchJobs = (query) => async (dispatch) => {
  // We always need to fetch the user's favorite jobs
  const favoriteJobs = await fetch(`${INTERNAL_API_URL}`)
    .then((res) => res.json())
    .then((jobs) => {
      const payload = jobs.map((job) => ({ ...job, favorite: true }));
      if (!query) { dispatch({ type: FETCH_JOBS, payload }); }
      return payload;
    });

  // If this fetch is not due to a query, don't try to fetch jobs with a
  // query parameter.
  // I do prefer to check this twice - one inside the Promise and the other
  // outside - over nesting the second promise inside the first one.
  if (!query) { return; }

  fetch(`${EXTERNAL_API_URL}?q=${query}`)
    .then((res) => res.json())
    .then((payload) => {
      const queriedJobs = payload.jobs.map(
        (job) => ({ ...job, favorite: false, api_id: job.id }),
      );
      // Show the favorite jobs *and* the ones from the search
      const jobs = favoriteJobs.concat(queriedJobs);
      return dispatch({ type: FETCH_JOBS, payload: jobs });
    });
};

export const addFavorite = (job) => (dispatch) => {
  fetch(`${INTERNAL_API_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(job),
  })
    .then((res) => res.json())
    .then((payload) => dispatch({ type: ADD_FAVORITE, payload }));
};

export const removeFavorite = (job) => (dispatch) => {
  fetch(`${INTERNAL_API_URL}/${job.api_id}`, { method: 'DELETE' })
    .then((res) => res.json())
    .then((payload) => dispatch({ type: REMOVE_FAVORITE, payload }));
};
