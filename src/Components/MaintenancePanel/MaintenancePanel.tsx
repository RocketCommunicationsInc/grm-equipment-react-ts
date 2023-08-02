import { useNavigate } from 'react-router-dom';
import { RuxButton, RuxContainer } from '@astrouxds/react';
import { useAppContext } from '../../providers/AppProvider';
import JobIDCard from './JobIDCard/JobIDCard';
import Table from '../../common/Table/Table';
import './MaintenancePanel.css';

const MaintenancePanel = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useAppContext() as any;

  const handleJobDetailsClick = (job: any) => {
    dispatch({ type: 'EDIT_JOB', payload: job });
    navigate('job-details');
  };

  const columnDefs: any[] = [
    { label: 'Job ID', property: 'jobId' },
    { label: 'Type', property: 'jobType' },
    { label: 'Created On', property: 'createdOn' },
    { label: 'Started On', property: 'startTime' },
    { label: 'Completed On', property: 'stopTime' },
    { label: 'Technician', property: 'technician' },
    { label: 'Description', property: 'description' },
  ];

  const jobs = state.scheduledJobs.map((job: any) => job);

  return (
    <RuxContainer className='maintenance-panel'>
      <header slot='header'>Maintenance</header>
      <RuxContainer className='jobs-section'>
        <h2>Jobs</h2>
        <div className='job-card-wrapper'>
          <RuxButton onClick={() => navigate('schedule-job')}>
            Schedule Job
          </RuxButton>
          {state.scheduledJobs.map((job: any) => (
            <JobIDCard
              key={job.jobId}
              type={job.jobType}
              id={job.jobId}
              startTime={job.startTime}
              stopTime={job.stopTime}
              status={job.status}
              viewJob={() => handleJobDetailsClick(job)}
            />
          ))}
        </div>
      </RuxContainer>
      <RuxContainer className='maintenance-history-panel'>
        <div className='maintenance-wrapper'>
          <h2>Maintenance History</h2>
          <Table columnDefs={columnDefs} filteredData={jobs} />
        </div>
      </RuxContainer>
    </RuxContainer>
  );
};

export default MaintenancePanel;
