export const appReducer = (
  state: { scheduledJobs: any[] },
  { type, payload }: any
) => {
  switch (type) {
    case 'SCHEDULE_NEW_JOB': {
      return {
        ...state,
        scheduledJobs: [...state.scheduledJobs, payload],
      };
    }

    case 'EDIT_JOB': {
      const selectedJob = state.scheduledJobs.find(
        (job) => job.jobId === payload
      );
      const modifiedJob = { ...selectedJob, ...payload };
      const updatedJobs = state.scheduledJobs.map((job) => {
        if (job.jobId === payload.jobId) {
          return modifiedJob;
        }
        return job;
      });
      return {
        ...state,
        scheduledJobs: updatedJobs,
        currentJob: modifiedJob ? modifiedJob : {},
      };
    }

    default: {
      throw new Error(`Unhandled app reducer type: ${type}`);
    }
  }
};
