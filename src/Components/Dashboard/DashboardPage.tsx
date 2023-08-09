import {
  RuxButton,
  RuxTab,
  RuxTabPanel,
  RuxTabPanels,
  RuxTabs,
} from '@astrouxds/react';
import EquipmentTree from '../EquipmentTree/EquipmentTree';
import InoperableEquipment from '../InoperableEquipment/InoperableEquipment';
import { useNavigate } from 'react-router-dom';
import { Equipment } from '../../Types/Equipment';
import './DashboardPage.css';
import { useState } from 'react';
import { RuxTabsCustomEvent } from '@astrouxds/astro-web-components';
import EquipmentDetailsPage from '../EquipmentDetailsPage/EquipmentDetailsPage';
import { useAppContext } from '../../providers/AppProvider';

const Dashboard = () => {
  const { state, dispatch }: any = useAppContext();
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment[]>([]);
  const [inoperablePanelShow, setInoperablePanelShow] = useState<boolean>(true);

  const setCurrentEquipment = (e: RuxTabsCustomEvent<any>) => {
    if (e.detail.id === 'inoperable-equipment') {
      setInoperablePanelShow(true)
      dispatch({ type: 'CURRENT_EQUIPMENT', payload: null });
    } else {
      for (const equipment of selectedEquipment) {
        if (e.detail.id === equipment.id) {
          dispatch({ type: 'CURRENT_EQUIPMENT', payload: equipment });
        }
      }
      setInoperablePanelShow(false)
    }
    
  };

  const handleClearClick = (equipment: Equipment) => {
    setSelectedEquipment((prevState) =>
      prevState.filter(
        (equipmentItem: Equipment) => equipmentItem.id !== equipment.id
      )
    );

    // if the tab being cleared is the currently selected one, fallback to inoperable equipment
    if (state.currentEquipment && state.currentEquipment.id === equipment.id) {
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
          onRuxselected={(e) => setCurrentEquipment(e)}
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
                (state.currentEquipment && equipment.id === state.currentEquipment.id) ? true : false
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
        <EquipmentDetailsPage inoperablePanelShow={inoperablePanelShow} selectedEquipment={selectedEquipment} />
        {/* {selectedEquipment.map((equipment) => (
            <RuxTabPanel key={equipment.id} aria-labelledby={equipment.id}>
              <EquipmentDetailsPage />
            </RuxTabPanel>
          ))} */}
      </div>
    </main>
  );
};

export default Dashboard;
