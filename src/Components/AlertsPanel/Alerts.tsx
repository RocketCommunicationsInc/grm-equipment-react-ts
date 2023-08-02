import { useState } from 'react';
import {
  RuxContainer,
  RuxSelect,
  RuxOption,
  RuxButton,
} from '@astrouxds/react';
import AlertsList from './AlertsList';
import { useTTCGRMActions, useTTCGRMAlerts } from '@astrouxds/mock-data';
import type { Category, Status } from '@astrouxds/mock-data';
import './Alerts.css';

const Alerts = () => {
  const [severitySelection, setSeveritySelection] = useState<Status | 'all'>(
    'all'
  );
  const [categorySelection, setCategorySelection] = useState<Category | 'all'>(
    'all'
  );

  const { deleteAlertsWithProp, anyAlertsHaveProp } = useTTCGRMActions();
  const { dataIds: alertIds } = useTTCGRMAlerts();
  const anySelected = anyAlertsHaveProp('selected', true);
  const deleteSelectedAlerts = () => deleteAlertsWithProp('selected', true);

  const handleClearFilter = () => {
    setSeveritySelection('all');
    setCategorySelection('all');
  };

  return (
    <RuxContainer className='alerts'>
      <div slot='header'>
        <div className='active-alerts'>
          <span>{alertIds.length}</span> Active Alerts
        </div>
        <div className='select-menu-div'>
          <RuxSelect
            value={severitySelection}
            onRuxchange={(e) => setSeveritySelection(e.target.value as Status)}
            size='small'
            label='Severity'
          >
            <RuxOption label='All' value='all' />
            <RuxOption label='Critical' value='critical' />
            <RuxOption label='Caution' value='caution' />
            <RuxOption label='Serious' value='serious' />
          </RuxSelect>

          <RuxSelect
            value={categorySelection}
            onRuxchange={(e) =>
              setCategorySelection(e.target.value as Category)
            }
            size='small'
            label='Category'
          >
            <RuxOption label='All' value='all' />
            <RuxOption label='Hardware' value='hardware' />
            <RuxOption label='Software' value='software' />
            <RuxOption label='Spacecraft' value='spacecraft' />
          </RuxSelect>
        </div>
      </div>
      <div
        className='filter-notification'
        hidden={severitySelection === 'all' && categorySelection === 'all'}
      >
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
      <AlertsList
        severitySelection={severitySelection}
        categorySelection={categorySelection}
      />
      <div slot='footer'>
        <RuxButton
          secondary
          onClick={deleteSelectedAlerts}
          disabled={!anySelected}
        >
          Dismiss
        </RuxButton>
        <RuxButton onClick={deleteSelectedAlerts} disabled={!anySelected}>
          Acknowledge
        </RuxButton>
      </div>
    </RuxContainer>
  );
};

export default Alerts;
