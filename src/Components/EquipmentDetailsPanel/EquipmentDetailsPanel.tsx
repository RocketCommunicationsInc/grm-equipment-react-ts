import {
  RuxSegmentedButton,
  RuxInput,
  RuxStatus,
  RuxContainer,
} from '@astrouxds/react';
import { EventLog } from '../../common/EventLog/EventLog';
import { useAppContext } from '../../providers/AppProvider';
import { addToast, capitalize } from '../../utils';
import './EquipmentDetailsPanel.css';

const firstButton = [{ label: 'Online', selected: true }, { label: 'Offline' }];
const secondButton = [
  { label: 'Considered', selected: true },
  { label: 'Deconsidered' },
];

const EquipmentDetailsPanel = () => {
  const { state }: any = useAppContext();

  const handleSegmentedButton = () => {
    addToast('This feature has not been implemented', false, 3000);
  };

  return (
    <RuxContainer className='equipment-details_details'>
      <span className='equipment-title'>
        <RuxStatus status={state.currentEquipment.status} slot='prefix' />
        {state.currentEquipment.equipmentString}
      </span>
      <div className='equipment-alerts'>
        <div>
          <section className='segmented-button-group'>
            <RuxSegmentedButton
              onRuxchange={handleSegmentedButton}
              size='small'
              data={firstButton}
            />
            <RuxSegmentedButton
              onRuxchange={handleSegmentedButton}
              size='small'
              data={secondButton}
            />
            <RuxInput
              label='Status'
              value={capitalize('active')}
              readonly
              size='small'
            />
            <RuxInput label='Type' value={'Iron'} readonly size='small' />
            <RuxInput
              label='Category'
              value={capitalize(state.currentEquipment.category)}
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
            <p>{capitalize(state.currentEquipment.description)}</p>
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
