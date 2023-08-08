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
      let selectedEquipment
      state.equipment.map((equipment: { id: any }) => {
        if (equipment.id === payload.id) {
          return selectedEquipment = equipment;
        }
        return null
      });
      return {
        ...state,
        currentEquipment: selectedEquipment
      };
    }

    default: {
      throw new Error(`Unhandled app reducer type: ${type}`);
    }
  }
};
