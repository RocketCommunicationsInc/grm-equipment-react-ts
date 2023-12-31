import { useMemo, useCallback, useState } from 'react';
import { RuxButton, RuxContainer, RuxSegmentedButton } from '@astrouxds/react';
import { useTTCGRMContacts } from '@astrouxds/mock-data';
import type { Contact } from '@astrouxds/mock-data';
import type { ColumnDef } from '../../common/Table/Table';
import Table from '../../common/Table/Table';
import { determineTimeString, setHhMmSs, capitalize } from '../../utils';
import SearchBar from '../../common/SearchBar/SearchBar';
import './ContactsTable.css';

const columnDefs: ColumnDef[] = [
  { label: 'Status', property: 'status' },
  { label: 'IRON', property: 'satellite' },
  { label: 'Ground Station', property: 'ground' },
  {
    label: 'REV',
    property: 'rev',
    isRightAligned: true,
  },
  {
    label: 'Equipment',
    property: 'equipment',
    isRightAligned: true,
  },
  { label: 'State', property: 'state', valueFn: capitalize },
  {
    label: 'DOY',
    property: 'dayOfYear',
    isRightAligned: true,
  },
  {
    label: 'Start Time',
    property: 'beginTimestamp',
    valueFn: determineTimeString,
    isRightAligned: true,
  },
  {
    label: 'AOS',
    property: 'aos',
    valueFn: determineTimeString,
    isRightAligned: true,
  },
  {
    label: 'LOS',
    property: 'los',
    valueFn: determineTimeString,
    isRightAligned: true,
  },
  {
    label: 'Stop Time',
    property: 'endTimestamp',
    valueFn: determineTimeString,
    isRightAligned: true,
  },
];

const ContactsTable = () => {
  const { dataArray: contacts } = useTTCGRMContacts();
  const [filterValue, setFilterValue] = useState('All');
  const [searchValue, setSearchValue] = useState('');

  const handleClearFilter = () => {
    setSearchValue('');
  };

  const filterContacts = useCallback(
    (contactsArray: Contact[], searchValue: string) => {
      if (!searchValue) return contactsArray;
      const propertyArray = columnDefs.map((def) => def.property);
      const filteredForStateContacts = contactsArray.filter((contact) =>
        propertyArray.some((key) => {
          const contactVal = contact[key] as string;
          if (
            key === 'beginTimestamp' ||
            key === 'endTimestamp' ||
            key === 'los' ||
            key === 'aos'
          ) {
            return setHhMmSs(contactVal).toString().includes(searchValue);
          } else {
            return contactVal
              .toString()
              .toLowerCase()
              .includes(searchValue.toLowerCase());
          }
        })
      );
      return filteredForStateContacts || contactsArray;
    },
    []
  );

  const failedContacts = contacts.filter((val) => val.state === 'failed');
  const executingContacts = contacts.filter((val) => val.state === 'executing');

  const filteredState =
    filterValue === 'Executing'
      ? executingContacts
      : filterValue === 'Failed'
      ? failedContacts
      : contacts;

  const filteredContacts = useMemo(() => {
    return filterContacts(filteredState, searchValue);
  }, [filteredState, filterContacts, searchValue]);

  return (
      <RuxContainer className='contacts-table'>
        <span slot='header'>Current Contacts</span>
        <div slot='header'>
          <div className='active-contacts'>
            <li className='total-section'>
              <span className='total'>{contacts.length} </span>Contacts
            </li>
            <li className='total-section'>
              <span className='total'>{failedContacts.length} </span>Failed
            </li>
            <li className='total-section'>
              <span className='total'>{executingContacts.length} </span>
              Executing
            </li>
          </div>
          <div className='filter-wrapper'>
            <SearchBar
              placeholder='Search...'
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />
            <RuxSegmentedButton
              selected={filterValue}
              onRuxchange={(e) => setFilterValue(e.target.selected)}
              data={[
                { label: 'All' },
                { label: 'Executing' },
                { label: 'Failed' },
              ]}
            />
          </div>
        </div>
        <div className='filter-notification' hidden={searchValue === ''}>
          One or more filters selected.
          <RuxButton
            onClick={handleClearFilter}
            secondary
            borderless
            size='small'
          >
            Clear filters
          </RuxButton>
          to display all alerts.
        </div>
        <Table columnDefs={columnDefs} filteredData={filteredContacts} />
      </RuxContainer>
  );
};

export default ContactsTable;
