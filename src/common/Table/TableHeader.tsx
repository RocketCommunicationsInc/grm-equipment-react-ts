import { RuxTableHeader, RuxTableHeaderRow } from '@astrouxds/react';
import type { Dispatch, SetStateAction } from 'react';
import TableHeaderCell from './TableHeaderCell';
import type { ColumnDef } from './Table';
import type { Contact } from '@astrouxds/mock-data';

type PropTypes = {
  columnDefs: ColumnDef[];
  setSortProp: Dispatch<SetStateAction<keyof Contact>>;
  setSortDirection: Dispatch<SetStateAction<'ASC' | 'DESC'>>;
  sortProp: keyof Contact;
  sortDirection: 'ASC' | 'DESC';
};

const TableHeader = ({
  columnDefs,
  setSortProp,
  setSortDirection,
  sortProp,
  sortDirection,
}: PropTypes) => {
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.currentTarget as HTMLElement;
    const sortProperty = target.dataset.sortprop as keyof Contact;
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

  return (
    <RuxTableHeader>
      <RuxTableHeaderRow>
        {columnDefs.map((colDef) => (
          <TableHeaderCell
            key={colDef.label}
            columnDefinition={colDef}
            handleClick={handleClick}
            sortDirection={sortDirection}
            sortProp={sortProp}
          />
        ))}
      </RuxTableHeaderRow>
    </RuxTableHeader>
  );
};

export default TableHeader;
