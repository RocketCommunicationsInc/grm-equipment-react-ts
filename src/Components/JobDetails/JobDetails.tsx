import { useEffect, useMemo, useState, useRef } from 'react';
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
import DeleteConfirmation from './DeleteConfirmation/DeleteConfirmation';
import './JobDetails.css';

const jobOptions = [
  { value: '', label: '- Select -' },
  { value: 'Maintenance', label: 'Maintenance' },
  { value: 'IT Support', label: 'IT Support' },
  { value: 'Hardware', label: 'Hardware' },
  { value: 'OtherJob', label: 'Other' },
];

const techOptions = [
  { value: '', label: '- Select -' },
  { value: 'R. Swanson', label: 'R. Swanson' },
  { value: 'B. Stinson', label: 'B. Stinson' },
  { value: 'M. Scott', label: 'M. Scott' },
  { value: 'J. Day', label: 'J. Day' },
  { value: 'OtherTech', label: 'Other' },
];

const JobDetails = () => {
  const { state, dispatch }: any = useAppContext();
  const navigate = useNavigate();
  const { dataArray: contacts } = useTTCGRMContacts();
  const [job, setJob] = useState(state.currentJob);
  const [pendingDelete, setPendingDelete] = useState(false);
  const [isModifying, setIsModifying] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [showOtherJob, setShowOtherJob] = useState(false);
  const [showOtherTech, setShowOtherTech] = useState(false);
  const jobSelect = useRef<HTMLRuxSelectElement | null>(null);
  const techSelect = useRef<HTMLRuxSelectElement | null>(null);
  const jobInput = useRef<HTMLRuxInputElement | null>(null);
  const techInput = useRef<HTMLRuxInputElement | null>(null);

  const handleCancel = () => {
    if (isModifying) {
      setJob(state.currentJob);
      setShowOtherJob(false);
      setShowOtherTech(false);
      setIsModifying(false);
    } else {
      navigate('/');
    }
  };

  const isOption = (job: any, type: string) => {
    if (type === 'jobType') {
      return jobOptions.some((option) => job.jobType === option.value);
    }

    if (type === 'technician') {
      return techOptions.some((option) => job.technician === option.value);
    }
  };

  const handleSubmit = (e: any) => {
    let modifiedJob = { ...job };
    if (job.jobType === '' && jobSelect.current!.value === 'OtherJob') {
      modifiedJob = { ...modifiedJob, jobType: 'Other' };
    }
    if (job.technician === '' && techSelect.current!.value === 'OtherTech') {
      modifiedJob = { ...modifiedJob, technician: 'Other' };
    }
    e.preventDefault();
    setShowOtherTech(false);
    setShowOtherJob(false);
    setIsModifying(false);
    if (job.jobId) {
      dispatch({ type: 'EDIT_JOB', payload: modifiedJob });
      setJob({ ...modifiedJob });
    }
  };

  const handleChange = (e: any) => {
    setJob((prevState: any) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleModify = () => {
    if (!isOption(job, 'technician')) setShowOtherTech(true);
    if (!isOption(job, 'jobType')) setShowOtherJob(true);
    setIsModifying(true);
  };

  const handleTechSelection = (e: any) => {
    if (e.target.value === 'OtherTech') {
      setShowOtherTech(true);
      setJob((prevState: any) => ({
        ...prevState,
        [e.target.name]: techInput.current?.value,
      }));
    } else {
      setShowOtherTech(false);
      setJob((prevState: any) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleJobSelection = (e: any) => {
    if (e.target.value === 'OtherJob') {
      setShowOtherJob(true);
      setJob((prevState: any) => ({
        ...prevState,
        [e.target.name]: jobInput.current?.value || '',
      }));
    } else {
      setShowOtherJob(false);
      setJob((prevState: any) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleJobInput = (e: any) => {
    setJob((prevState: any) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleTechInput = (e: any) => {
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

    //determine whether or not job/tech select should be disabled
    if (techSelect.current && techInput.current) {
      techInput.current.value !== '' && showOtherTech
        ? techSelect.current.setAttribute('disabled', '')
        : techSelect.current.removeAttribute('disabled');
    }

    if (jobSelect.current && jobInput.current) {
      jobInput.current?.value !== '' && showOtherJob
        ? jobSelect.current!.setAttribute('disabled', '')
        : jobSelect.current!.removeAttribute('disabled');
    }
  });

  const filteredContacts = useMemo(() => {
    return filterContacts(contacts, searchValue);
  }, [contacts, searchValue]);

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
                  onRuxchange={handleJobSelection}
                  size='small'
                  label=' Job Type'
                  value={
                    showOtherJob
                      ? 'OtherJob'
                      : isOption(job, 'jobType')
                      ? job.jobType
                      : 'OtherJob'
                  }
                  name='jobType'
                  ref={jobSelect}
                >
                  {jobOptions.map((option, index) => (
                    <RuxOption
                      key={index}
                      value={option.value}
                      label={option.label}
                    ></RuxOption>
                  ))}
                </RuxSelect>
                {showOtherJob ? (
                  <RuxInput
                    label='Job Title'
                    name='jobType'
                    onRuxinput={handleJobInput}
                    value={isOption(job, 'jobType') ? '' : job.jobType}
                    size='small'
                    ref={jobInput}
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
                  onRuxchange={handleTechSelection}
                  size='small'
                  label='Technician'
                  value={
                    showOtherTech
                      ? 'OtherTech'
                      : isOption(job, 'technician')
                      ? job.technician
                      : 'OtherTech'
                  }
                  name='technician'
                  ref={techSelect}
                >
                  {techOptions.map((option, index) => (
                    <RuxOption
                      key={index}
                      value={option.value}
                      label={option.label}
                    ></RuxOption>
                  ))}
                </RuxSelect>
                {showOtherTech ? (
                  <RuxInput
                    size='small'
                    label='Name'
                    name='technician'
                    value={isOption(job, 'technician') ? '' : job.technician}
                    onRuxinput={handleTechInput}
                    ref={techInput}
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
            This equipment may be allocated to contacts within the timeframe of
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
      {pendingDelete ? (
        <DeleteConfirmation
          job={job}
          setPendingDelete={setPendingDelete}
          handleClose={() => setPendingDelete(false)}
        />
      ) : null}
      <footer slot='footer'>
        <RuxButton secondary onClick={() => setPendingDelete(true)}>
          Delete
        </RuxButton>
        <RuxButton secondary onClick={handleCancel}>
          Cancel
        </RuxButton>
        {isModifying ? (
          <RuxButton onClick={handleSubmit}>Save</RuxButton>
        ) : (
          <RuxButton onClick={handleModify}>Modify</RuxButton>
        )}
      </footer>
    </RuxContainer>
  );
};

export default JobDetails;
