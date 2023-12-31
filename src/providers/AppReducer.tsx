import { Job, Equipment } from '../Types/Equipment';

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

      const updatedEquipment = state.equipment.map((equip: any) => {
        if (equip.id === state.currentEquipment.id) {
          const updatedJobs = [...equip.scheduledJobs, payload];
          return {
            ...equip,
            scheduledJobs: updatedJobs,
          };
        }
        return equip;
      });

      return {
        ...state,
        currentEquipment: {
          ...state.currentEquipment,
          scheduledJobs: [...state.currentEquipment.scheduledJobs, payload],
        },
        equipment: updatedEquipment,
        scheduledJobs: [...state.scheduledJobs, payload],
        selectedEquipment: updatedSelectedEquipment,
        notification: 'Job ID ' + payload.jobId + ' has been submitted',
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

      const deletedJob = state.currentEquipment.scheduledJobs.filter(
        (job: Job) => {
          return job.jobId === payload;
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
        deletedJob: deletedJob,
        notification: 'Job ID ' + deletedJob[0].jobId + ' has been deleted',
      };
    }

    case 'CURRENT_EQUIPMENT': {
      // check if equipment already has an existing tab (if it is in selectedEquipment state)
      const equipmentAlreadySelected = state?.selectedEquipment?.some(
        (equipmentItem: Equipment) => {
          if (equipmentItem.id === payload?.id) {
            return true;
          }
          return false;
        }
      );

      const newSelectedEquipment =
        !equipmentAlreadySelected && payload !== null
          ? [...state.selectedEquipment, payload]
          : state.selectedEquipment;
      return {
        ...state,
        // if it doesn't have a tab, add to selectedEquipment state array, which will then re-render component and create new tab.
        selectedEquipment: newSelectedEquipment,
        currentEquipment: payload,
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

    case 'RESET_NOTIFICATION': {
      return { ...state, notification: '' };
    }

    default: {
      throw new Error(`Unhandled app reducer type: ${type}`);
    }
  }
};
