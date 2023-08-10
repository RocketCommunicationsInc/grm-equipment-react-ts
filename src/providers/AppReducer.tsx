import { Job } from '../Types/Equipment';

export const appReducer = (state: any, { type, payload }: any) => {
  switch (type) {
    case 'SCHEDULE_NEW_JOB': {
      return {
        ...state,
        currentEquipment: {
          ...state.currentEquipment,
          scheduledJobs: [...state.currentEquipment.scheduledJobs, payload],
        },
      };
    }

    case 'EDIT_JOB': {
      const selectedJob = state.scheduledJobs.find(
        (job: { jobId: number }) => job.jobId === payload
      );
      const modifiedJob = { ...selectedJob, ...payload };
      const updatedJobs = state.currentEquipment.scheduledJobs.map(
        (job: { jobId: number }) => {
          if (job.jobId === payload.jobId) {
            return { ...job, ...payload };
          }
          return job;
        }
      );
      return {
        ...state,
        currentEquipment: {
          ...state.currentEquipment,
          scheduledJobs: updatedJobs,
        },
        scheduledJobs: updatedJobs,
        currentJob: modifiedJob ? modifiedJob : {},
      };
    }

    case 'DELETE_JOB': {
      const updatedJobs = state.currentEquipment.scheduledJobs.filter(
        (job: Job) => job.jobId !== payload.jobId
      );
      return {
        ...state,
        currentEquipment: {
          ...state.currentEquipment,
          scheduledJobs: updatedJobs,
        },
        scheduledJobs: updatedJobs,
        currentJob: null,
      };
    }

    case 'CURRENT_EQUIPMENT': {
      let selectedEquipment;

      if (payload === null) {
        selectedEquipment = null;
      } else {
        state.equipment.map((equipment: { id: string }) => {
          if (equipment.id === payload.id) {
            return (selectedEquipment = equipment);
          }
          return null;
        });
      }

      return {
        ...state,
        currentEquipment: selectedEquipment,
      };
    }

    case 'ADD_SELECTED_EQUIPMENT': {
      return {
        ...state,
        selectedEquipment: [...state.selectedEquipment, payload],
      };
    }

    case 'REMOVE_SELECTED_EQUIPMENT': {
      return {
        ...state,
        selectedEquipment: state.selectedEquipment.filter(
          (equipmentItem: { id: string }) => equipmentItem.id !== payload.id
        ),
      };
    }

    default: {
      throw new Error(`Unhandled app reducer type: ${type}`);
    }
  }
};
