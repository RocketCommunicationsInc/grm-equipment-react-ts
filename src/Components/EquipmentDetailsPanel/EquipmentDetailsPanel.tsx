import {
  RuxSegmentedButton,
  RuxInput,
  RuxStatus,
  RuxContainer,
  RuxTextarea,
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
        <span>{state.currentEquipment.equipmentString}</span>
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
        <RuxTextarea
          label='Description'
          size='large'
          disabled
          value={capitalize(state.currentEquipment.description)}
        />
        <div className='equipment-details-log'>
          <EventLog />
        </div>
      </div>
    </RuxContainer>
  );
};

export default EquipmentDetailsPanel;
