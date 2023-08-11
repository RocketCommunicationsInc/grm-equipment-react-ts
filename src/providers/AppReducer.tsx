import { Job } from '../Types/Equipment';

export const appReducer = (state: any, { type, payload }: any) => {
  switch (type) {
    case 'SCHEDULE_NEW_JOB': {
      const updatedSelectedEquipment = state.selectedEquipment.map(
        (equip: any) => {
          if (equip.id === state.currentEquipment.id) {
            const updatedJobs = [...equip.scheduledJobs, payload];
            return {
              ...equip,
              scheduledJobs: updatedJobs,
            };
          }
          return equip;
        }
      );

      const updatedEquipment = state.equipment.map(
        (equip: any) => {
          if (equip.id === state.currentEquipment.id) {
            const updatedJobs = [...equip.scheduledJobs, payload];
            return {
              ...equip,
              scheduledJobs: updatedJobs,
            };
          }
          return equip;
        }
      );
      return {
        ...state,
        currentEquipment: {
          ...state.currentEquipment,
          scheduledJobs: [...state.currentEquipment.scheduledJobs, payload],
        },
        equipment: updatedEquipment,
        scheduledJobs: [...state.scheduledJobs, payload],
        selectedEquipment: updatedSelectedEquipment,
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

      const updatedEquipment = state.equipment.map((equip: any) => {
        if (equip.id === state.currentEquipment.id) {
          return {
            ...equip,
            scheduledJobs: updatedJobs,
          };
        }
        return equip;
      });

      const updatedSelectedEquipment = state.selectedEquipment.map(
        (equip: any) => {
          if (equip.id === state.currentEquipment.id) {
            return {
              ...equip,
              scheduledJobs: updatedJobs,
            };
          }
          return equip;
        }
      );

      return {
        ...state,
        currentEquipment: {
          ...state.currentEquipment,
          scheduledJobs: updatedJobs,
        },
        selectedEquipment: updatedSelectedEquipment,
        equipment: updatedEquipment,
        scheduledJobs: updatedJobs,
        currentJob: modifiedJob ? modifiedJob : {},
      };
    }

    case 'DELETE_JOB': {
      const updatedJobs = state.currentEquipment.scheduledJobs.filter(
        (job: Job) => {
          return job.jobId !== payload;
        }
      );

      const updatedEquipment = state.equipment.map((equip: any) => {
        if (equip.id === state.currentEquipment.id) {
          return {
            ...equip,
            scheduledJobs: updatedJobs,
          };
        }
        return equip;
      });

      const updatedSelectedEquipment = state.selectedEquipment.map(
        (equip: any) => {
          if (equip.id === state.currentEquipment.id) {
            return {
              ...equip,
              scheduledJobs: updatedJobs,
            };
          }
          return equip;
        }
      );

      return {
        ...state,
        currentEquipment: {
          ...state.currentEquipment,
          scheduledJobs: updatedJobs,
        },
        scheduledJobs: updatedJobs,
        equipment: updatedEquipment,
        currentJob: null,
        selectedEquipment: updatedSelectedEquipment,
      };
    }

    case 'CURRENT_EQUIPMENT': {
      return {
        ...state,
        currentEquipment: payload,
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
