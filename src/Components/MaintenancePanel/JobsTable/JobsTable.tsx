import { useState, useEffect, useCallback } from 'react';
import {
  RuxTable,
  RuxTableHeader,
  RuxTableHeaderRow,
  RuxTableHeaderCell,
  RuxTableBody,
  RuxTableRow,
  RuxTableCell,
  RuxIcon,
} from '@astrouxds/react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../../providers/AppProvider';
import { Job } from '../../../Types/Equipment';
import { capitalize, setHhMmSs } from '../../../utils';
import './JobsTable.css';

const columnDefs: any[] = [
  { label: 'Job ID', property: 'jobId' },
  { label: 'Type', property: 'jobType' },
  { label: 'Created On', property: 'createdOn' },
  { label: 'Started On', property: 'startTime' },
  { label: 'Completed On', property: 'stopTime' },
  { label: 'Technician', property: 'technician' },
  { label: 'Description', property: 'jobDescription' },
];

type PropTypes = {
  jobs: Job[];
};

const JobsTable = ({ jobs }: PropTypes) => {
  const navigate = useNavigate();
  const { dispatch } = useAppContext() as any;
  const [sortDirection, setSortDirection] = useState<'ASC' | 'DESC'>('ASC');
  const [sortProp, setSortProp] = useState<keyof Job>('jobId');
  const [sortedData, setSortedData] = useState<Job[]>([]);

  const sortData = useCallback(
    (property: keyof Job, sortDirection: 'ASC' | 'DESC') => {
      const sortedData = [...jobs].sort((a: Job, b: Job) => {
        const firstContactValue = a[property];
        const secondContactValue = b[property];
        if (sortDirection !== 'ASC') {
          return String(firstContactValue).localeCompare(
            String(secondContactValue)
          );
        } else {
          return String(secondContactValue).localeCompare(
            String(firstContactValue)
          );
        }
      });
      setSortedData(sortedData);
    },
    [jobs]
  );

  useEffect(() => {
    sortData(sortProp, sortDirection);
  }, [jobs, sortData, sortDirection, sortProp]);

  const handleHeaderCellClick = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.currentTarget as HTMLElement;
    const sortProperty = target.dataset.sortprop as keyof Job;
    if (sortProperty === sortProp) {
      // clicked same currently sorted column
      if (sortDirection === 'ASC') {
        setSortDirection('DESC');
      } else {
        setSortDirection('ASC');
      }
    } else {
      // clicked new column
      setSortProp(sortProperty);
      setSortDirection('ASC');
    }
  };

  const handleTabeRowClick = (job: Job) => {
    dispatch({ type: 'EDIT_JOB', payload: job });
    navigate('job-details');
  };

  console.log(columnDefs)

  return (
    <div className='table-wrapper'>
      <RuxTable>
        <RuxTableHeader>
          <RuxTableHeaderRow>
            {columnDefs.map((colDef, index) => (
              <RuxTableHeaderCell
                key={`${colDef.property}${index}`}
                data-sortprop={colDef.property}
                onClick={handleHeaderCellClick}
                className='jobs-header-cell'
              >
                <div className={ (colDef.property === 'createdOn' || colDef.property === 'startedOn' || colDef.propery === 'stoppedOn') ? 'job-table_right-align' : '' }>
                  <span>{colDef.label}</span>
                  <RuxIcon
                    icon={
                      sortDirection === 'ASC'
                        ? 'arrow-drop-down'
                        : 'arrow-drop-up'
                    }
                    size='small'
                    className={
                      sortProp === colDef.property ? 'visible' : 'hidden'
                    }
                  />
                </div>
              </RuxTableHeaderCell>
            ))}
          </RuxTableHeaderRow>
        </RuxTableHeader>
        <RuxTableBody>
          {sortedData.map((job, index) => {
            return (
              <RuxTableRow
                key={`${job.jobId}${index}`}
                onClick={() => handleTabeRowClick(job)}
              >
                {columnDefs.map((colDef, index) => {
                  const property: keyof Job = colDef.property;
                  return (
                    <RuxTableCell className='jobs-cell' key={colDef.label}>
                      {property === 'jobDescription'
                        ? capitalize(job[property])
                        : property === 'createdOn' ||
                          (property === 'startTime' && job[property] !== '') ||
                          (property === 'stopTime' && job[property] !== '')
                        ? setHhMmSs(job[property])
                        : job[property]}
                    </RuxTableCell>
                  );
                })}
              </RuxTableRow>
            );
          })}
        </RuxTableBody>
      </RuxTable>
    </div>
  );
};

export default JobsTable;
