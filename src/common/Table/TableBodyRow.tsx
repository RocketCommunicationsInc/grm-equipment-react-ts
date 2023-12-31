import { RuxTableRow, RuxTableCell, RuxStatus } from '@astrouxds/react';
import type { Contact } from '@astrouxds/mock-data';
import type { ColumnDef } from './Table';

type PropTypes = {
  columnDefs: ColumnDef[];
  rowData: Contact;
};

const ContactsTable = ({ columnDefs, rowData }: PropTypes) => {
  return (
    <RuxTableRow key={rowData.id}>
      {columnDefs.map((colDef, index) => {
        const property = colDef.property;
        const cellValue = colDef.valueFn
          ? colDef.valueFn(rowData[property])
          : rowData[property];
        return (
          <RuxTableCell
            key={colDef.label}
            className={colDef.isRightAligned ? 'right-align' : ''}
          >
            {property === 'status' ? (
              <RuxStatus status={cellValue}></RuxStatus>
            ) : (
              <span className={colDef.isRightAligned ? 'right-align' : ''}>
                {cellValue}
              </span>
            )}
          </RuxTableCell>
        );
      })}
    </RuxTableRow>
  );
};

export default ContactsTable;
