import { useNavigate } from 'react-router-dom';
import { RuxTableBody } from '@astrouxds/react';
import TableBodyRow from './TableBodyRow';
import type { ColumnDef } from './Table';
import type { Contact } from '@astrouxds/mock-data';

type PropTypes = {
  columnDefs: ColumnDef[];
  sortedData: Contact[];
};

const TableBody = ({ columnDefs, sortedData }: PropTypes) => {
  const navigate = useNavigate();

  return (
    <RuxTableBody>
      {sortedData.map((data, index) => {
        return (
          <TableBodyRow
            key={`${data.id}${index}`}
            columnDefs={columnDefs}
            rowData={data}
            handleRowClick={() => navigate(`/contacts/${data.id}`)}
          />
        );
      })}
    </RuxTableBody>
  );
};

export default TableBody;
