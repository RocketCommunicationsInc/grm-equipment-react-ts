import { RuxContainer } from '@astrouxds/react';
import { useTTCGRMContacts } from '@astrouxds/mock-data';
import { capitalize, determineTimeString } from '../../utils';
import Table from '../../common/Table/Table';
import type { ColumnDef } from '../../common/Table/Table';

const columnDefs: ColumnDef[] = [
  { label: 'Status', property: 'status' },
  { label: 'IRON', property: 'satellite' },
  { label: 'Ground Station', property: 'ground' },
  { label: 'REV', property: 'rev' },
  { label: 'Equipment String', property: 'equipment' },
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

const ConflictsTable = () => {
  const { dataArray: contacts } = useTTCGRMContacts();

  return (
    <RuxContainer>
      <Table columnDefs={columnDefs} filteredData={contacts} />
    </RuxContainer>
  );
};

export default ConflictsTable;
