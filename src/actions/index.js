export const fetchJobs = async () => {
  const jobs = await fetch('https://fave-jobs-api.herokuapp.com/jobs')
    .then((res) => res.json());
  return jobs;
};

// This is here to appease the gods of linting
export const placeholder = 'foo';
