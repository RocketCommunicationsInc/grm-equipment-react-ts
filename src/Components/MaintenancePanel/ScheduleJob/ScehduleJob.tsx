import {
  RuxButton,
  RuxCheckbox,
  RuxContainer,
  RuxInput,
  RuxOption,
  RuxSelect,
  RuxTextarea,
  RuxTableHeader,
  RuxTableHeaderCell,
  RuxTable,
  RuxTableHeaderRow,
} from '@astrouxds/react';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../../providers/AppProvider';
import ConflictsTable from '../../JobDetails/ConflictsTable';
import './ScheduleJob.css';
import { useTTCGRMContacts } from '@astrouxds/mock-data';

const ScheduleJob = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { dataArray: contacts } = useTTCGRMContacts();
  const { dispatch } = useAppContext() as any;
  const [calculateConflicts, setCalculateConflicts] = useState(false);
  const [inputsFilledOut, setInputsFilledOut] = useState(false);

  const uniqueJobId = Math.floor(Math.random() * 90000) + 10000;
  const statusValues = [
    'Approved',
    'Started',
    'Stopped',
    'Submitted',
    'Online',
  ];
  const randomStatus = Math.floor(Math.random() * statusValues.length);
  const equipmentValues = ['ANT3', 'BAFB4', 'ANT9', 'BAFB5', 'ANT12', 'BAFB8'];
  const randomEqupiment = Math.floor(Math.random() * equipmentValues.length);

  const [newJob, setNewJob] = useState({
    jobId: uniqueJobId,
    jobType: '',
    description: '',
    startTime: '',
    stopTime: '',
    technician: '',
    follow: true,
    status: statusValues[randomStatus],
    createdOn: Date.now(),
    equpiment: equipmentValues[randomEqupiment],
  });

  const handleCancel = () => {
    navigate(`/alerts/${params.alertId}`);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch({ type: 'SCHEDULE_NEW_JOB', payload: newJob });
    navigate(`/alerts/${params.alertId}`);
  };

  const handleChange = (e: any) => {
    setNewJob((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    setInputsFilledOut(true);
  };

  return (
    <RuxContainer className='schedule-job'>
      <header slot='header'>Job Request</header>
      <div className='schedule-job-wrapper'>
        <div className='job-request-section'>
          <ul>
            <li>1. Select Job Type</li>
            <RuxSelect
              onRuxchange={handleChange}
              size='small'
              label=' Job Type'
              value={newJob.jobType}
              name='jobType'
            >
              <RuxOption value='' label='- Select -'></RuxOption>
              <RuxOption value='Maintenence' label='Maintenence'></RuxOption>
              <RuxOption value='IT Support' label='IT Support'></RuxOption>
              <RuxOption value='Hardware' label='Hardware'></RuxOption>
              <RuxOption value='Other' label='Other'></RuxOption>
            </RuxSelect>
            <RuxTextarea
              onRuxinput={handleChange}
              placeholder='Enter Description'
              label='Description'
              value={newJob.description}
              name='description'
            />

            <li>2. Select Time</li>
            <RuxInput
              onRuxinput={handleChange}
              value={newJob.startTime}
              size='small'
              type='datetime-local'
              label='Start'
              name='startTime'
            />
            <RuxInput
              onRuxinput={handleChange}
              value={newJob.stopTime}
              size='small'
              type='datetime-local'
              label='Stop'
              name='stopTime'
            />

            <li>3. Select Technician</li>
            <RuxSelect
              onRuxchange={handleChange}
              size='small'
              label='Technician'
              value={newJob.technician}
              name='technician'
            >
              <RuxOption value='' label='- Select -'></RuxOption>
              <RuxOption value='R. Swanson' label='R. Swanson'></RuxOption>
              <RuxOption value='B. Stinson' label='B. Stinson'></RuxOption>
              <RuxOption value='M. Scott' label='M. Scott'></RuxOption>
              <RuxOption value='J. Day' label='J. Day'></RuxOption>
            </RuxSelect>

            <li>
              4. Would you like to follow this job? Following will send all
              updates and alerts from this job to the GRM Dashboard. If you do
              not follow this job, you must view the job from the Equpiment
              Manager for any updates or alerts.
            </li>
            <li>
              <RuxCheckbox checked label='Follow' />
            </li>
            {!inputsFilledOut ? (
              <RuxButton disabled onClick={() => setCalculateConflicts(true)}>
                Calculate Conflicts
              </RuxButton>
            ) : (
              <RuxButton onClick={() => setCalculateConflicts(true)}>
                Calculate Conflicts
              </RuxButton>
            )}
          </ul>
        </div>

        <RuxContainer className='conflicts-section'>
          {!calculateConflicts ? (
            <h2>Conflicts (0)</h2>
          ) : (
            <h2>Conflicts ({contacts.length})</h2>
          )}
          <span>
            This equpiment may be allocated to contacts within the timeframe of
            this maintenance job. A list of these contacts is provided below
            after clicking "Calculate Conflicts".
            <br /> <br />
          </span>
          <span>
            To ensure that these contacts have the equpiment they need to
            execute, change the timeframe of the maintenance job using the
            Start/Stop fields, or change the equipment allocated to these
            contacts in the GRM Schedule app.
          </span>

          <div className='table-section'>
            {calculateConflicts ? (
              <ConflictsTable />
            ) : (
              <RuxTable>
                <RuxTableHeader>
                  <RuxTableHeaderRow>
                    <RuxTableHeaderCell>Status</RuxTableHeaderCell>
                    <RuxTableHeaderCell>IRON</RuxTableHeaderCell>
                    <RuxTableHeaderCell>Ground Station</RuxTableHeaderCell>
                    <RuxTableHeaderCell>REV</RuxTableHeaderCell>
                    <RuxTableHeaderCell>Equipment</RuxTableHeaderCell>
                    <RuxTableHeaderCell>State</RuxTableHeaderCell>
                    <RuxTableHeaderCell>DOY</RuxTableHeaderCell>
                    <RuxTableHeaderCell>Start Time</RuxTableHeaderCell>
                    <RuxTableHeaderCell>AOS</RuxTableHeaderCell>
                    <RuxTableHeaderCell>LOS</RuxTableHeaderCell>
                    <RuxTableHeaderCell>Stop Time</RuxTableHeaderCell>
                  </RuxTableHeaderRow>
                </RuxTableHeader>
              </RuxTable>
            )}
            <span className='conflicts-placeholder'>
              Conflicts have not been calculated.
            </span>
          </div>
        </RuxContainer>
      </div>
      <footer slot='footer'>
        <RuxButton secondary onClick={handleCancel}>
          Cancel
        </RuxButton>
        {!calculateConflicts ? (
          <RuxButton disabled onClick={handleSubmit}>
            Submit Request
          </RuxButton>
        ) : (
          <RuxButton onClick={handleSubmit}>Submit Request</RuxButton>
        )}
      </footer>
    </RuxContainer>
  );
};

export default ScheduleJob;
