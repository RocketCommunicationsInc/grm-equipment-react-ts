import {
  RuxSegmentedButton,
  RuxContainer,
  RuxInput,
  RuxStatus,
} from '@astrouxds/react';
import { EventLog } from '../../common/EventLog/EventLog';
import { capitalize } from '../../utils';
import './EquipmentDetailsPanel.css';

const firstButton = [{ label: 'Online', selected: true }, { label: 'Offline' }];
const secondButton = [
  { label: 'Considered', selected: true },
  { label: 'Deconsidered' },
];

const EquipmentDetailsPanel = () => {
  return (
    <RuxContainer className='equipment-details'>
      <header slot='header'>Equipment Details</header>
      <span>
        <RuxStatus status='caution' slot='prefix' /> Black FEP 6566
      </span>
      <div className='equipment-alerts'>
        <div>
          <section className='segmented-button-group'>
            <RuxSegmentedButton size='small' data={firstButton} />
            <RuxSegmentedButton size='small' data={secondButton} />
            <RuxInput
              label='Status'
              value={capitalize('active')}
              readonly
              size='small'
            />
            <RuxInput label='Type' value={'Iron'} readonly size='small' />
            <RuxInput label='Category' value={'RF'} readonly size='small' />
          </section>
        </div>
        <div className='alert-description'>
          <header>Description</header>
          <div
            className='description-message'
            tabIndex={0}
            aria-readonly='true'
            role='textbox'
          >
            <p>
              Aenean ac sagittis odio. Pellentesque vehicula, justo et
              sollicitudin bibendum, urna libero ornare augue, a bibendum nulla
              ipsum eu ante…
            </p>
          </div>
        </div>

        <div className='equipment-details-log'>
          <EventLog />
        </div>
      </div>
    </RuxContainer>
  );
};

export default EquipmentDetailsPanel;
