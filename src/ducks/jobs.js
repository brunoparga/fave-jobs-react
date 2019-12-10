// Single point of control for API URLs
const INTERNAL_API_URL = 'https://fave-jobs-api.herokuapp.com';
const EXTERNAL_API_URL = 'https://www.getonbrd.com/search/jobs';

// Action types
const FETCH_JOBS = 'fave-jobs-react/jobs/FETCH_JOBS';

// Reducer
export default (state = [], { type, payload }) => {
  switch (type) {
    case FETCH_JOBS:
      return payload;
    default:
      return state;
  }
};

// Action creators
export const createFetchJobs = (payload) => ({ type: FETCH_JOBS, payload });

// Side effects (thunks)
export const fetchJobs = (query) => async (dispatch) => {
  // We always need to fetch the user's favorite jobs
  const favoriteJobs = await fetch(`${INTERNAL_API_URL}/jobs`)
    .then((res) => res.json())
    .then((jobs) => {
      const payload = jobs.map((job) => ({ ...job, favorite: true }));
      if (!query) { dispatch(createFetchJobs(payload)); }
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
      const jobs = favoriteJobs.concat(queriedJobs);
      return dispatch({ type: FETCH_JOBS, payload: jobs });
    });
};

export const toggleFavorite = (job) => (dispatch) => console.log(job);
