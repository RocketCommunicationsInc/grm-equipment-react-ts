import {
  RuxSegmentedButton,
  RuxInput,
  RuxStatus,
  RuxContainer,
} from '@astrouxds/react';
import { EventLog } from '../../common/EventLog/EventLog';
import { Equipment } from '../../Types/Equipment';
import { capitalize } from '../../utils';
import './EquipmentDetailsPanel.css';

type PropTypes = {
  activeEquipment?: Equipment | null;
};

const firstButton = [{ label: 'Online', selected: true }, { label: 'Offline' }];
const secondButton = [
  { label: 'Considered', selected: true },
  { label: 'Deconsidered' },
];

const EquipmentDetailsPanel = ({ activeEquipment }: PropTypes) => {
  return (
    <RuxContainer className="equipment-details_details">
      <span>
        <RuxStatus status={activeEquipment?.status} slot='prefix' />{' '}
        {activeEquipment?.equipmentString}
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
            <RuxInput
              label='Category'
              value={activeEquipment?.category}
              readonly
              size='small'
            />
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
            <p>{activeEquipment?.description}</p>
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
