import { RuxButton, RuxDialog } from '@astrouxds/react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../../providers/AppProvider';
import './DeleteConfirmation.css';
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
    if (job.jobId) {
      dispatch({ type: 'DELETE_JOB', payload: job.jobId });
    }
    navigate('/');
    handleClose();
  };
  return (
    <RuxDialog
      header='Delete Maintenance Job'
      open={setPendingDelete}
      confirmText='Delete'
      denyText='Cancel'
    >
      <div>
        Please confirm you would like to delete {job.equipment} Maintenance Job
        ID {job.jobId}
      </div>
      {/* <RuxButton onClick={() => setPendingDelete(false)}>Cancel</RuxButton>
      <RuxButton onClick={handleDelete}>Delete</RuxButton> */}
    </RuxDialog>
  );
};

export default DeleteConfirmation;
