import { RuxSegmentedButton, RuxContainer } from '@astrouxds/react';
import { EventLog } from '../../common/EventLog/EventLog';
// import { capitalize } from '../../utils';
import './EquipmentDetailsPanel.css';

const firstButton = [{ label: 'Online', selected: true }, { label: 'Offline' }];
const secondButton = [
  { label: 'Considered', selected: true },
  { label: 'Deconsidered' },
];

const EquipmentDetailsPanel = () => {
  // const equipmentGeneralDetails = [
  //   {
  //     label: 'Status',
  //     node: <RuxInput value={capitalize('active')} readonly size='small' />,
  //   },

  //   {
  //     label: 'Type',
  //     node: <RuxInput value={'Iron'} readonly size='small' />,
  //   },

  //   {
  //     label: 'Category',
  //     node: <RuxInput value={'RF'} readonly size='small' />,
  //   },
  // ];

  return (
    <RuxContainer className='equipment-details'>
      <header slot='header'>Equipment Details</header>
      <RuxContainer className='child-container'>
        <header slot='header'>Black FEP 6566</header>
        {/* <DetailsCommonGrid> */}
        <div>
          <section className='segmented-button-group'>
            <RuxSegmentedButton size='small' data={firstButton} />
            <RuxSegmentedButton size='small' data={secondButton} />
          </section>
          {/* <DetailsGrid details={equipmentGeneralDetails} /> */}
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
        {/* </DetailsCommonGrid> */}
      </RuxContainer>
    </RuxContainer>
  );
};

export default EquipmentDetailsPanel;
