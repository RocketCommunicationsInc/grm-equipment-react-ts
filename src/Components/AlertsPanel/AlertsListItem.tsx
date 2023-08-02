import {
  RuxCheckbox,
  RuxStatus,
  RuxButton,
  RuxAccordion,
  RuxAccordionItem,
} from '@astrouxds/react';
import { useNavigate } from 'react-router-dom';
import { useTTCGRMActions } from '@astrouxds/mock-data';
import type { Alert } from '@astrouxds/mock-data';

type PropTypes = {
  alertItem: Alert;
};

const AlertListItem = ({ alertItem }: PropTypes) => {
  const navigate = useNavigate();
  const { modifyAlert } = useTTCGRMActions();
  const toggleSelected = (alert: Alert) =>
    modifyAlert({ ...alert, selected: !alertItem.selected });

  const handleClick = () => {
    navigate(`alerts/${alertItem.id}`);
  };

  return (
    <li>
      <RuxAccordion>
        <RuxAccordionItem id={alertItem.id}>
          <div className='accordion-item__content'>
            <div>{alertItem.message}</div>
            <RuxButton icon='launch' onClick={handleClick}>
              Investigate
            </RuxButton>
          </div>
          <div slot='label' className='alert-list-label'>
            <RuxCheckbox
              id={alertItem.id}
              checked={alertItem.selected}
              onRuxinput={() => toggleSelected(alertItem)}
            />
            <RuxStatus status={alertItem.status} />
            <span>{alertItem.message}</span>
            <span>{alertItem.category}</span>
            <span>
              {new Date(alertItem.timestamp).toTimeString().slice(0, 8)}
            </span>
          </div>
        </RuxAccordionItem>
      </RuxAccordion>
    </li>
  );
};

export default AlertListItem;
