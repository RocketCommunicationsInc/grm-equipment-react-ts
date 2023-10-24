import { RuxButton, RuxCard, RuxInput } from '@astrouxds/react';
import './JobIDCard.css';
import { getDate } from '../../../utils';

type PropTypes = {
  id: string;
  status: string;
  type: string;
  startsAt: string;
  endsAt: string;
  viewJob: () => void;
};

const JobIDCard = ({
  id,
  status,
  type,
  startsAt,
  endsAt,
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
        value={getDate(startsAt)}
        placeholder='YYY DDD HH:MM'
        size='small'
        label='Start'
        readonly
      />
      <RuxInput
        value={getDate(endsAt)}
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
