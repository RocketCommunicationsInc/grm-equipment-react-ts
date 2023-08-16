import { RuxTableBody } from '@astrouxds/react';
import TableBodyRow from './TableBodyRow';
import type { ColumnDef } from './Table';
import type { Contact } from '@astrouxds/mock-data';

type PropTypes = {
  columnDefs: ColumnDef[];
  sortedData: Contact[];
};

const TableBody = ({ columnDefs, sortedData }: PropTypes) => {
  return (
    <RuxTableBody>
      {sortedData.map((data, index) => {
        return (
          <TableBodyRow
            key={`${data.id}${index}`}
            columnDefs={columnDefs}
            rowData={data}
          />
        );
      })}
    </RuxTableBody>
  );
};

export default TableBody;
