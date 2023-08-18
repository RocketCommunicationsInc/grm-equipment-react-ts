import { RuxTableHeaderCell, RuxIcon } from '@astrouxds/react';
import type { ColumnDef } from './Table';
import type { Contact } from '@astrouxds/mock-data';

type PropTypes = {
  columnDefinition: ColumnDef;
  handleClick: React.MouseEventHandler<HTMLElement>;
  sortDirection: 'ASC' | 'DESC';
  sortProp: keyof Contact;
};

const TableHeaderCell = ({
  columnDefinition,
  handleClick,
  sortDirection,
  sortProp,
}: PropTypes) => {
  return (
    <RuxTableHeaderCell
      data-sortprop={columnDefinition.property}
      onClick={handleClick}
      className={columnDefinition.isRightAligned ? 'right-align' : ''}
    >
      {columnDefinition.label}
      <RuxIcon
        icon={sortDirection === 'ASC' ? 'arrow-drop-down' : 'arrow-drop-up'}
        size='small'
        className={
          sortProp === columnDefinition.property ? 'visible' : 'hidden'
        }
      />
    </RuxTableHeaderCell>
  );
};

export default TableHeaderCell;
