export const fetchJobs = async () => {
  const data = await fetch('https://fave-jobs-api.herokuapp.com/jobs')
    .then((res) => res.json());
  return data.jobs;
};

// This is here to appease the gods of linting
export const placeholder = 'foo';
