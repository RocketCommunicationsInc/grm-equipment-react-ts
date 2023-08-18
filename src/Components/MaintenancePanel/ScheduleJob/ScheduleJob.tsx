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
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../../providers/AppProvider';
import ConflictsTable from '../../JobDetails/ConflictsTable';
import { useTTCGRMContacts } from '@astrouxds/mock-data';
import SearchBar from '../../../common/SearchBar/SearchBar';
import { filterContacts } from '../../../utils/filterContacts';
import './ScheduleJob.css';

const ScheduleJob = () => {
  const navigate = useNavigate();
  const { dispatch } = useAppContext() as any;
  const { dataArray: contacts } = useTTCGRMContacts();
  const [calculateConflicts, setCalculateConflicts] = useState(false);
  const [inputsFilledOut, setInputsFilledOut] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [showOtherJob, setShowOtherJob] = useState(false);
  const [showOtherTech, setShowOtherTech] = useState(false);

  const statusValues = ['off', 'caution', 'normal', 'standby'];
  const uniqueJobId = Math.floor(Math.random() * 90000) + 10000;
  const jobValues = ['Approved', 'Started', 'Stopped', 'Submitted', 'Online'];

  const randomStatus = Math.floor(Math.random() * statusValues.length);
  const randomJobStatus = Math.floor(Math.random() * jobValues.length);
  const equipmentValues = ['ANT3', 'BAFB4', 'ANT9', 'BAFB5', 'ANT12', 'BAFB8'];
  const randomEqupiment = Math.floor(Math.random() * equipmentValues.length);

  const [newJob, setNewJob] = useState({
    jobId: uniqueJobId,
    jobType: '',
    jobDescription: '',
    startTime: '',
    stopTime: '',
    technician: '',
    follow: true,
    jobStatus: jobValues[randomJobStatus],
    createdOn: Date.now(),
    equipment: equipmentValues[randomEqupiment],
    equipmentStatus: statusValues[randomStatus],
  });

  const handleCancel = () => {
    navigate('/');
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch({ type: 'SCHEDULE_NEW_JOB', payload: newJob });
    navigate('/');
  };

  const handleChange = (e: any) => {
    if (e.target.value === 'OtherJob') {
      setShowOtherJob(true);
    }
    if (e.target.value === 'OtherTech') {
      setShowOtherTech(true);
    }
    setNewJob((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    setInputsFilledOut(true);
  };

  const filteredContacts = useMemo(() => {
    return filterContacts(contacts, searchValue);
  }, [contacts, searchValue]);

  return (
    <RuxContainer className='schedule-job'>
      <header slot='header'>
        Job Request
        <SearchBar
          placeholder='Search conflicts...'
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      </header>
      <div className='schedule-job-wrapper'>
        <RuxContainer className='job-request-section'>
          <ul>
            <li>1. Select Job Type</li>
            <div className='other-options'>
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
                <RuxOption value='OtherJob' label='Other'></RuxOption>
              </RuxSelect>
              {showOtherJob ? (
                <RuxInput
                  label='Job Title'
                  name='jobType'
                  onRuxinput={handleChange}
                  size='small'
                />
              ) : null}
            </div>
            <RuxTextarea
              onRuxinput={handleChange}
              placeholder='Enter Description'
              label='Description'
              value={newJob.jobDescription}
              name='jobDescription'
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
            <div className='other-options'>
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
                <RuxOption value='OtherTech' label='Other'></RuxOption>
              </RuxSelect>
              {showOtherTech ? (
                <RuxInput
                  size='small'
                  label='Name'
                  name='technician'
                  onRuxinput={handleChange}
                />
              ) : null}
            </div>
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
        </RuxContainer>

        <RuxContainer className='conflicts-section'>
          {!calculateConflicts ? (
            <span>Conflicts (0)</span>
          ) : (
            <span>Conflicts ({filteredContacts.length})</span>
          )}
          <span>
            This equpiment may be allocated to contacts within the timeframe of
            this maintenance job. A list of these contacts is provided below
            after clicking "Calculate Conflicts".
          </span>
          <span>
            To ensure that these contacts have the equpiment they need to
            execute, change the timeframe of the maintenance job using the
            Start/Stop fields, or change the equipment allocated to these
            contacts in the GRM Schedule app.
          </span>
          {calculateConflicts ? (
            <ConflictsTable filteredData={filteredContacts} />
          ) : (
            <div>
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
              <span className='conflicts-placeholder'>
                Conflicts have not been calculated.
              </span>
            </div>
          )}
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
