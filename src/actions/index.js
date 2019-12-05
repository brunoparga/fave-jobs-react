export const fetchJobs = async () => {
  const jobs = await fetch('https://fave-jobs-api.herokuapp.com/jobs')
    .then((res) => res.json());
  // sort jobs by whether they're favorites. Even though it works,
  // 'return job2.favorite - job1.favorite' violates my aesthetic preferences.
  // Since sort() mutates the array, I'm copying it for functional principles.
  return Array
    .from(jobs)
    .sort((job1, job2) => (job1.favorite >= job2.favorite ? -1 : 1));
};

// This is here to appease the gods of linting
export const placeholder = 'foo';
