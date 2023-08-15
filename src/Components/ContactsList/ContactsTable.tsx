import { useMemo, useCallback, useState } from 'react';
import { RuxButton, RuxContainer, RuxSegmentedButton } from '@astrouxds/react';
import { useTTCGRMContacts } from '@astrouxds/mock-data';
import type { Contact } from '@astrouxds/mock-data';
import type { ColumnDef } from '../../common/Table/Table';
import Table from '../../common/Table/Table';
import { determineTimeString, setHhMmSs, capitalize } from '../../utils';
import './ContactsTable.css';
import SearchBar from '../../common/SearchBar/SearchBar';

const columnDefs: ColumnDef[] = [
  { label: 'Status', property: 'status' },
  { label: 'IRON', property: 'satellite' },
  { label: 'Ground Station', property: 'ground' },
  {
    label: 'REV',
    property: 'rev',
    cellClass: 'right-align',
    headerCellClass: 'right-align',
  },
  {
    label: 'Equipment',
    property: 'equipment',
    cellClass: 'right-align',
    headerCellClass: 'right-align',
  },
  { label: 'State', property: 'state', valueFn: capitalize },
  {
    label: 'DOY',
    property: 'dayOfYear',
    cellClass: 'right-align',
    headerCellClass: 'right-align',
  },
  {
    label: 'Start Time',
    property: 'beginTimestamp',
    valueFn: determineTimeString,
    cellClass: 'right-align',
    headerCellClass: 'right-align',
  },
  {
    label: 'AOS',
    property: 'aos',
    valueFn: determineTimeString,
    cellClass: 'right-align',
    headerCellClass: 'right-align',
  },
  {
    label: 'LOS',
    property: 'los',
    valueFn: determineTimeString,
    cellClass: 'right-align',
    headerCellClass: 'right-align',
  },
  {
    label: 'Stop Time',
    property: 'endTimestamp',
    valueFn: determineTimeString,
    cellClass: 'right-align',
    headerCellClass: 'right-align',
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
    <main className='contacts page'>
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
    </main>
  );
};

export default ContactsTable;
