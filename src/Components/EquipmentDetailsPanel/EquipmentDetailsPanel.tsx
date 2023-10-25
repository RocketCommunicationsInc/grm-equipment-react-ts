import {
  RuxSegmentedButton,
  RuxInput,
  RuxStatus,
  RuxContainer,
  RuxTextarea,
} from '@astrouxds/react';
import { EventLog } from '../../common/EventLog/EventLog';
import { addToast, capitalize } from '../../utils';
import type { Equipment } from '../../Types/Equipment';
import './EquipmentDetailsPanel.css';
import React from 'react';

const firstButton = [{ label: 'Online', selected: true }, { label: 'Offline' }];
const secondButton = [
  { label: 'Considered', selected: true },
  { label: 'Deconsidered' },
];

type PropTypes = {
  equipmentData: Equipment;
};

const EquipmentDetailsPanel = ({ equipmentData }: PropTypes) => {
  const { status, equipmentString, category, description } = equipmentData;

  const handleSegmentedButton = () => {
    addToast('This feature has not been implemented', false, 3000);
  };

  return (
    <RuxContainer className='equipment-details_details'>
      <span className='equipment-title'>
        <RuxStatus status={status} slot='prefix' />
        <span>{equipmentString}</span>
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
              value={capitalize(category)}
              readonly
              size='small'
            />
          </section>
        </div>
        <RuxTextarea
          label='Description'
          size='large'
          value={capitalize(description)}
        />
        <div className='equipment-details-log'>
          <EventLog />
        </div>
      </div>
    </RuxContainer>
  );
};

export default EquipmentDetailsPanel;
