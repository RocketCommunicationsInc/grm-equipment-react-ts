import ContactsTable from '../ContactsList/ContactsTable';
import EquipmentDetailsPanel from '../EquipmentDetailsPanel/EquipmentDetailsPanel';
import Alerts from '../AlertsPanel/Alerts';
import MaintenancePanel from '../MaintenancePanel/MaintenancePanel';
import {
  RuxButton,
  RuxContainer,
  RuxTab,
  RuxTabPanel,
  RuxTabPanels,
  RuxTabs,
} from '@astrouxds/react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../providers/AppProvider';
import { useState } from 'react';
import { Equipment } from '../../Types/Equipment';
import InoperableEquipment from '../InoperableEquipment/InoperableEquipment';
import { RuxTabsCustomEvent } from '@astrouxds/astro-web-components';
import EquipmentTree from '../EquipmentTree/EquipmentTree';

const EquipmentDetailsPage = () => {
  const { state, dispatch }: any = useAppContext();
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment[]>([]);
  const navigate = useNavigate();

  const setEquipment = (e: RuxTabsCustomEvent<any>) => {
    for (const equipment of selectedEquipment) {
      if (e.detail.id === equipment.id) {
        dispatch({ type: 'CURRENT_EQUIPMENT', payload: equipment });
      }
    }
  };

  const selectEquipment = () => {
    navigate('/');
  };

  const handleClearClick = (equipment: Equipment) => {
    setSelectedEquipment((prevState) =>
      prevState.filter(
        (equipmentItem: Equipment) => equipmentItem.id !== equipment.id
      )
    );

    if (state.currentEquipment.id === equipment.id) {
      dispatch({ type: 'CURRENT_EQUIPMENT', payload: null });
    }
  };

  return (
    <main className='dashboard'>
      <EquipmentTree
        selectedEquipment={selectedEquipment}
        setSelectedEquipment={setSelectedEquipment}
      />
      <div className='dashboard_equipment-wrapper'>
        <RuxTabs
          small={true}
          id='equipment-tabs'
          onRuxselected={(e) => setEquipment(e)}
        >
          <RuxTab
            id='inoperable-equipment'
            key='inoperable-equipment'
            selected={state.currentEquipment === null ? true : false}
          >
            Inoperable
          </RuxTab>
          {selectedEquipment.map((equipment) => (
            <RuxTab
              key={equipment.id}
              id={equipment.id}
              selected={
                equipment.id === state.currentEquipment.id ? true : false
              }
            >
              {equipment.config}-{equipment.equipmentString}
              <RuxButton
                iconOnly
                borderless
                icon='clear'
                onClick={() => handleClearClick(equipment)}
              />
            </RuxTab>
          ))}
        </RuxTabs>
        <RuxTabPanels aria-labelledby='equipment-tabs'>
          <RuxTabPanel aria-labelledby='inoperable-equipment'>
            <InoperableEquipment selectEquipment={selectEquipment} />
          </RuxTabPanel>
          {state.currentEquipment &&
            selectedEquipment.map((equipment) => (
              <RuxTabPanel key={equipment.id} aria-labelledby={equipment.id}>
                <RuxContainer className='equipment-details'>
                  <header slot='header'>Equipment Details</header>
                  <div className='equipment-details_wrapper'>
                    <EquipmentDetailsPanel />
                    <Alerts />
                    <ContactsTable />
                  </div>
                  <MaintenancePanel />
                </RuxContainer>{' '}
              </RuxTabPanel>
            ))}
        </RuxTabPanels>
      </div>
    </main>
  );
};

export default EquipmentDetailsPage;
