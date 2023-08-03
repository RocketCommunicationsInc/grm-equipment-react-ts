import { useMemo, useCallback } from 'react';
import { RuxButton, RuxContainer, RuxSegmentedButton } from '@astrouxds/react';
import { useTTCGRMContacts } from '@astrouxds/mock-data';
import type { Contact } from '@astrouxds/mock-data';
import type { ColumnDef } from '../../common/Table/Table';
import Table from '../../common/Table/Table';
import { determineTimeString, setHhMmSs, capitalize } from '../../utils';
import './ContactsTable.css';

type PropTypes = {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
};

const columnDefs: ColumnDef[] = [
  { label: 'Status', property: 'status' },
  { label: 'IRON', property: 'satellite' },
  { label: 'Ground Station', property: 'ground' },
  { label: 'REV', property: 'rev' },
  { label: 'Equipment', property: 'equipment' },
  { label: 'State', property: 'state', valueFn: capitalize },
  {
    label: 'DOY',
    property: 'dayOfYear',
  },
  {
    label: 'Start Time',
    property: 'beginTimestamp',
    valueFn: determineTimeString,
  },
  { label: 'AOS', property: 'aos', valueFn: determineTimeString },
  { label: 'LOS', property: 'los', valueFn: determineTimeString },
  {
    label: 'Stop Time',
    property: 'endTimestamp',
    valueFn: determineTimeString,
  },
];

const ContactsTable = ({ searchValue = '', setSearchValue }: PropTypes) => {
  const { dataArray: contacts } = useTTCGRMContacts();

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

  const filteredContacts = useMemo(() => {
    return filterContacts(contacts, searchValue);
  }, [contacts, filterContacts, searchValue]);

  return (
    <main className='contacts page'>
      <RuxContainer className='contacts-table'>
        <div slot='header'>
          <span>Current Contacts</span>
          <div className='active-contacts'>
            <span>10 Contacts</span>
            <span>1 Failed</span>
            <span>9 Executing</span>
          </div>
          <RuxSegmentedButton
            // onRuxchange={(e) => setFilterValue(e.target.selected)}
            data={[
              { label: 'All' },
              { label: 'Executing' },
              { label: 'Failed' },
            ]}
          />
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
