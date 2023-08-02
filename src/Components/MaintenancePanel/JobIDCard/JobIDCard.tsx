import { RuxButton, RuxCard, RuxInput } from '@astrouxds/react';
import './JobIDCard.css';

type PropTypes = {
  id: number;
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
      />
      <RuxInput
        value={startTime}
        placeholder='YYY DDD HH:MM'
        size='small'
        label='Start'
      />
      <RuxInput
        value={stopTime}
        placeholder='YYY DDD HH:MM'
        size='small'
        label='Stop'
      />
      <RuxButton onClick={viewJob}>View Details</RuxButton>
    </RuxCard>
  );
};

export default JobIDCard;
