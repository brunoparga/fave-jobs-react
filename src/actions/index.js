const INTERNAL_API_URL = 'https://fave-jobs-api.herokuapp.com';
const EXTERNAL_API_URL = 'https://www.getonbrd.com/search/jobs';

export const fetchJobs = async (query) => {
  const favoriteJobs = await fetch(`${INTERNAL_API_URL}/jobs`)
    .then((res) => res.json());
  if (!query) { return favoriteJobs; }

  let queriedJobs;
  queriedJobs = await fetch(`${EXTERNAL_API_URL}?q=${query}`)
    .then((res) => res.json());
  queriedJobs = queriedJobs.jobs.map((job) => ({
    ...job,
    favorite: false,
    api_id: job.id,
  }));
  return favoriteJobs.concat(queriedJobs);
};

export const fetchJob = (id) => fetch(`${INTERNAL_API_URL}/job/${id}`)
  .then((res) => res.json());
