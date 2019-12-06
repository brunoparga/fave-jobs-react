const API_URL = 'https://fave-jobs-api.herokuapp.com';

export const fetchJobs = async () => {
  const jobs = await fetch(`${API_URL}/jobs`)
    .then((res) => res.json());
  // sort jobs by whether they're favorites. Even though it works,
  // 'return job2.favorite - job1.favorite' violates my aesthetic preferences.
  // Since sort() mutates the array, I'm copying it for functional principles.
  return Array
    .from(jobs)
    .sort((job1, job2) => (job1.favorite >= job2.favorite ? -1 : 1));
};

export const fetchJob = (id) => fetch(`${API_URL}/job/${id}`)
  .then((res) => res.json());
