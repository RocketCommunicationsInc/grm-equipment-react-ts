import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RuxButton, RuxContainer } from '@astrouxds/react';
import { useAppContext } from '../../providers/AppProvider';
import JobIDCard from './JobIDCard/JobIDCard';
import { capitalize, setHhMmSs } from '../../utils';
import SearchBar from '../../common/SearchBar/SearchBar';
import JobsTable from './JobsTable/JobsTable';
import { Job } from '../../Types/Equipment';
import './MaintenancePanel.css';

const MaintenancePanel = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useAppContext() as any;
  const [searchValue, setSearchValue] = useState('');

  const handleJobDetailsClick = (job: Job) => {
    dispatch({ type: 'EDIT_JOB', payload: job });
    navigate('maintenance-details');
  };

  const filteredJobs = state.currentEquipment
    ? state.currentEquipment.scheduledJobs.reduce(
        (results: any[], job: any) => {
          if (
            job === 'startTime' || job === 'stopTime' || job === 'createdOn'
              ? Object.values(setHhMmSs(job))
                  .toString()
                  .toLowerCase()
                  .includes(searchValue.toLowerCase())
              : Object.values(job)
                  .toString()
                  .toLowerCase()
                  .includes(searchValue.toLowerCase())
          ) {
            results.push(job);
          }
          return results;
        },
        []
      )
    : state.scheduledJobs.map((job: Job) => job);

  useEffect(() => {}, [filteredJobs]);

  return (
    <RuxContainer className='maintenance-panel'>
      <header slot='header'>
        Maintenance
        <SearchBar
          placeholder='Search jobs...'
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      </header>
      <RuxContainer className='jobs-section'>
        <h2>Jobs</h2>
        <div className='schedule-job-wrapper'>
          <RuxButton onClick={() => navigate('schedule-job')}>
            Schedule Job
          </RuxButton>
          <div className='job-card-wrapper'>
            {state.currentEquipment &&
              filteredJobs
                .reverse()
                .map((job: Job) => (
                  <JobIDCard
                    key={job.jobId}
                    type={job.jobType}
                    id={Number(job.jobId)}
                    startTime={job.startTime}
                    stopTime={job.stopTime}
                    status={capitalize(job.jobStatus) as string}
                    viewJob={() => handleJobDetailsClick(job)}
                  />
                ))}
          </div>
        </div>
      </RuxContainer>
      <RuxContainer className='maintenance-history-panel'>
        <div className='maintenance-wrapper'>
          <h2>Maintenance History</h2>
          <JobsTable jobs={filteredJobs} />
        </div>
      </RuxContainer>
    </RuxContainer>
  );
};

export default MaintenancePanel;
