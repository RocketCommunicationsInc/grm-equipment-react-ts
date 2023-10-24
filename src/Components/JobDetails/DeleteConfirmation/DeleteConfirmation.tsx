import { RuxDialog } from '@astrouxds/react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../../providers/AppProvider';
import { Job } from '../../../Types/Equipment';

type PropTypes = {
  job: Job;
  setPendingDelete: any;
  handleClose: () => void;
};

const DeleteConfirmation = ({
  job,
  setPendingDelete,
  handleClose,
}: PropTypes) => {
  const { dispatch }: any = useAppContext();
  const navigate = useNavigate();

  const handleDelete = (e: any) => {
    e.preventDefault();
    if (e.detail && job.id) {
      dispatch({ type: 'DELETE_JOB', payload: job.id });
      navigate('/');
    } else if (e.detail === false) {
      handleClose();
    }
  };

  return (
    <RuxDialog
      header='Delete Maintenance Job'
      open={setPendingDelete}
      confirmText='Delete'
      denyText='Cancel'
      onRuxdialogclosed={handleDelete}
      message={`Please confirm you would like to DELETE ${job.equipmentId} Maintenance Job
        ID ${job.id}`}
    />
  );
};

export default DeleteConfirmation;
