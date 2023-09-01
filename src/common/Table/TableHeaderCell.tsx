import { RuxTableHeaderCell, RuxIcon } from '@astrouxds/react';
import type { ColumnDef } from './Table';
import type { Contact } from '@astrouxds/mock-data';

type PropTypes = {
  columnDefinition: ColumnDef;
  handleClick: React.MouseEventHandler<HTMLElement>;
  sortDirection: 'ASC' | 'DESC';
  sortProp: keyof Contact;
  activeHeader: keyof Contact | undefined;
};

const TableHeaderCell = ({
  columnDefinition,
  handleClick,
  sortDirection,
  sortProp,
  activeHeader,
}: PropTypes) => {
  return (
    <RuxTableHeaderCell
      data-sortprop={columnDefinition.property}
      onClick={handleClick}
      className={
        columnDefinition.property === 'status'
          ? 'status-align'
          : columnDefinition.isRightAligned
          ? 'right-align'
          : ''
      }
    >
      <div className={columnDefinition.isRightAligned ? 'right-align' : ''}>
        <span className={columnDefinition.isRightAligned ? 'right-align' : ''}>
          {columnDefinition.label}
        </span>
        <RuxIcon
          icon={(sortDirection === 'ASC' || activeHeader !== columnDefinition.property) ? 'arrow-drop-down' : 'arrow-drop-up'}
          size='32px'
          className={
            sortProp === columnDefinition.property ? 'visible' : 'hidden'
          }
        />
      </div>
    </RuxTableHeaderCell>
  );
};

export default TableHeaderCell;
