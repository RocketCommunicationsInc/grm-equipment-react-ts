import { RuxButton, RuxCard, RuxInput } from '@astrouxds/react';
import './JobIDCard.css';

type PropTypes = {
  id: string | number;
  status: string;
  type: string;
  startTime: string;
  stopTime: string;
  viewJob: () => void;
};

const JobIDCard = ({
  id,
  status,
  type,
  startTime,
  stopTime,
  viewJob,
}: PropTypes) => {
  return (
    <RuxCard className='job-id-card'>
      <div slot='header'>
        <span>Job ID {id}</span>
        <span>{status}</span>
      </div>
      <RuxInput
        value={type}
        placeholder='Value'
        size='small'
        label='Job Type'
        readonly
      />
      <RuxInput
        value={startTime}
        placeholder='YYY DDD HH:MM'
        size='small'
        label='Start'
        readonly
      />
      <RuxInput
        value={stopTime}
        placeholder='YYY DDD HH:MM'
        size='small'
        label='Stop'
        readonly
      />
      <RuxButton secondary onClick={viewJob}>
        View Details
      </RuxButton>
    </RuxCard>
  );
};

export default JobIDCard;
