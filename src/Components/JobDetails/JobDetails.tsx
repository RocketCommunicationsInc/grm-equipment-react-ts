import { useEffect, useMemo, useState } from 'react';
import {
  RuxCheckbox,
  RuxContainer,
  RuxInput,
  RuxTextarea,
  RuxButton,
  RuxSelect,
  RuxOption,
} from '@astrouxds/react';
import { useAppContext } from '../../providers/AppProvider';
import { useNavigate } from 'react-router-dom';
import { EventLog } from '../../common/EventLog/EventLog';
import ConflictsTable from './ConflictsTable';
import { filterContacts } from '../../utils/filterContacts';
import Stepper from './Stepper/Stepper';
import { useTTCGRMContacts } from '@astrouxds/mock-data';
import SearchBar from '../../common/SearchBar/SearchBar';
import { capitalize } from '../../utils';
import './JobDetails.css';

const JobDetails = () => {
  const { state, dispatch }: any = useAppContext();
  const navigate = useNavigate();
  const { dataArray: contacts } = useTTCGRMContacts();
  const [job, setJob] = useState(state.currentJob);
  const [isModifying, setIsModifying] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [showOtherJob, setShowOtherJob] = useState(false);
  const [showOtherTech, setShowOtherTech] = useState(false);
  const [disableJob, setDisableJob] = useState(false);
  const [disableTech, setDisableTech] = useState(false);

  const handleCancel = () => {
    if (isModifying) {
      setJob(job);
      setIsModifying(false);
    } else {
      navigate('/');
    }
  };

  const handleSubmit = (e: any) => {
    const modifiedJob = { ...job };
    e.preventDefault();
    setIsModifying(false);
    if (job.jobId) {
      dispatch({ type: 'EDIT_JOB', payload: modifiedJob });
    }
  };

  const handleDelete = (e: any) => {
    e.preventDefault();
    if (job.jobId) {
      dispatch({ type: 'DELETE_JOB', payload: job.jobId });
    }
    navigate('/');
  };

  const handleChange = (e: any) => {
    e.target.value === 'OtherJob'
      ? setShowOtherJob(true)
      : setShowOtherJob(false);

    e.target.value === 'OtherTech'
      ? setShowOtherTech(true)
      : setShowOtherTech(false);

    setJob((prevState: any) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    const stepperTitle = document.getElementsByClassName('step-title');

    for (let i = 0; i < stepperTitle.length; i++) {
      const element = stepperTitle[i].parentElement;
      if (
        stepperTitle[i].innerHTML === job.jobStatus ||
        stepperTitle[i].innerHTML.toLowerCase() === job.jobStatus
      ) {
        element?.classList.add('active');
      }
    }
  });

  const filteredContacts = useMemo(() => {
    return filterContacts(contacts, searchValue);
  }, [contacts, searchValue]);

  const handleJobChange = (e: any) => {
    e.target.value !== '' ? setDisableJob(true) : setDisableJob(false);
    setJob((prevState: any) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleTechChange = (e: any) => {
    e.target.value !== '' ? setDisableTech(true) : setDisableTech(false);
    setJob((prevState: any) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <RuxContainer className='job-details-panel'>
      <header slot='header'>
        [{job.equipment}] Maintenance Job ID {job.jobId}
        <SearchBar
          placeholder='Search conflicts...'
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      </header>
      <div className='jobs-wrapper'>
        <RuxContainer className='jobs-details-section'>
          <span>Job Details</span>
          <Stepper />
          {isModifying ? (
            <>
              <div className='other-options'>
                <RuxSelect
                  onRuxchange={handleChange}
                  size='small'
                  label=' Job Type'
                  value={job.jobType}
                  name='jobType'
                  disabled={disableJob}
                >
                  <RuxOption value='' label='- Select -'></RuxOption>
                  <RuxOption
                    value='Maintenence'
                    label='Maintenence'
                  ></RuxOption>
                  <RuxOption value='IT Support' label='IT Support'></RuxOption>
                  <RuxOption value='Hardware' label='Hardware'></RuxOption>
                  <RuxOption value='OtherJob' label='Other'></RuxOption>
                </RuxSelect>
                {showOtherJob ? (
                  <RuxInput
                    label='Job Title'
                    name='jobType'
                    onRuxinput={handleJobChange}
                    size='small'
                  />
                ) : null}
              </div>
              <RuxTextarea
                onRuxinput={handleChange}
                placeholder='Enter Description'
                label='Description'
                value={capitalize(job.jobDescription)}
                name='jobDescription'
              />
              <RuxInput
                onRuxinput={handleChange}
                value={job.startTime}
                size='small'
                type='datetime-local'
                label='Start'
                name='startTime'
              />
              <RuxInput
                onRuxinput={handleChange}
                value={job.stopTime}
                size='small'
                type='datetime-local'
                label='Stop'
                name='stopTime'
              />
              <div className='other-options'>
                <RuxSelect
                  onRuxchange={handleChange}
                  size='small'
                  label='Technician'
                  value={job.technician}
                  name='technician'
                  disabled={disableTech}
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
                    onRuxinput={handleTechChange}
                  />
                ) : null}
              </div>
              <RuxCheckbox checked label='Follow' />

              <div className='job-details-log'>
                <EventLog />
              </div>
            </>
          ) : (
            <>
              <RuxInput
                readonly
                size='small'
                label='Job Type'
                value={job.jobType}
              />
              <RuxTextarea
                disabled
                label='Description'
                value={capitalize(job.jobDescription)}
              />
              <RuxInput
                readonly
                size='small'
                label='Start'
                value={job.startTime}
              />
              <RuxInput
                readonly
                size='small'
                label='Stop'
                value={job.stopTime}
              />
              <RuxInput
                readonly
                size='small'
                label='Technician'
                value={job.technician}
              />
              <RuxCheckbox disabled checked label='Follow' />

              <div className='job-details-log'>
                <EventLog />
              </div>
            </>
          )}
        </RuxContainer>
        <RuxContainer className='job-details-conflicts-section'>
          <span>Conflicts ({filteredContacts.length})</span>
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
          <ConflictsTable filteredData={filteredContacts} />
        </RuxContainer>
      </div>

      <footer slot='footer'>
        <RuxButton secondary onClick={handleDelete}>
          Delete
        </RuxButton>
        <RuxButton secondary onClick={handleCancel}>
          Cancel
        </RuxButton>
        {isModifying ? (
          <RuxButton onClick={handleSubmit}>Save</RuxButton>
        ) : (
          <RuxButton onClick={() => setIsModifying(true)}>Modify</RuxButton>
        )}
      </footer>
    </RuxContainer>
  );
};

export default JobDetails;
