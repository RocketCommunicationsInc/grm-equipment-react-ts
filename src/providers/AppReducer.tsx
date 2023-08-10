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
      // const updatedCurrentEquipment = Object.values(state.currentEquipment).map(
      //   (equip: any) => {
      //     if (equip.jobId === state.currentEquipment.id) {
      //       const updatedJobs = [...equip.currentEquipment, payload];
      //       return {
      //         ...equip,
      //         scheduledJobs: updatedJobs,
      //       };
      //     }
      //     return equip;
      //   }
      // );
      return {
        ...state,
        currentEquipment: {
          ...state.currentEquipment,
          scheduledJobs: [...state.currentEquipment.scheduledJobs, payload],
        },
        //currentEquipment: updatedCurrentEquipment,
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
        currentJob: modifiedJob ? modifiedJob : {},
        selectedEquipment: updatedSelectedEquipment,
      };
    }

    case 'DELETE_JOB': {
      const updatedJobs = state.currentEquipment.scheduledJobs.filter(
        (job: Job) => job.jobId !== payload.jobId
      );
      // const updatedSelectedEquipment = state.selectedEquipment.map(
      //   (equip: any) => {
      //     if (equip.id === state.currentEquipment.id) {
      //       const updatedScheduledJobs = equip.scheduledJobs.filter(
      //         (job: Job) => job.jobId !== payload.jobId
      //       );
      //       return {
      //         ...equip,
      //         scheduledJobs: updatedScheduledJobs,
      //       };
      //     }
      //     return equip;
      //   }
      // );
      const jobIndex = state.currentEquipment.scheduledJobs.findIndex(
        (job: Job) => job.jobId === payload.jobId
      );
      if (payload.jobId === -1) {
        return state;
      }
      const remainingJobs = [
        ...state.currentEquipment.scheduledJobs.slice(0, jobIndex),
        ...state.currentEquipment.scheduledJobs.slice(jobIndex + 1),
      ];
      const updatedSelectedEquipment = state.selectedEquipment.map(
        (equip: any) => {
          if (equip.id === state.currentEquipment.id) {
            return {
              ...equip,
              scheduledJobs: remainingJobs,
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
        currentJob: null,
        selectedEquipment: updatedSelectedEquipment,
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
