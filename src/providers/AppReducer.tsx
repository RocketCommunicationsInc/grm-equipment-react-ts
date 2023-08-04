import { Job } from '../Types/Equipment';

export const appReducer = (state: any, { type, payload }: any) => {
  switch (type) {
    case 'SCHEDULE_NEW_JOB': {
      return {
        ...state,
        scheduledJobs: [...state.scheduledJobs, payload],
      };
    }

    case 'EDIT_JOB': {
      const selectedJob = state.scheduledJobs.find(
        (job: { jobId: any }) => job.jobId === payload
      );
      const modifiedJob = { ...selectedJob, ...payload };
      const updatedJobs = state.scheduledJobs.map((job: { jobId: any }) => {
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

    case 'CURRENT_EQUIPMENT': {
      const selectedEquipment = () => {
        for (const item of state.equipment) {
          console.log(item, 'jobs');
          if (item.scheduledJobs.some((job: Job) => job.jobId === payload)) {
            console.log(item, 'item');
            return item;
          }
        }
        return null;
      };
      return {
        ...state,
        currentEquipment: { ...selectedEquipment, ...payload } || null,
      };
    }

    default: {
      throw new Error(`Unhandled app reducer type: ${type}`);
    }
  }
};
