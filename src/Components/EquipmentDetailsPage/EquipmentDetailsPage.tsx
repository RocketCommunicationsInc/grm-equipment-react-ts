import { RuxButton, RuxContainer, RuxTab, RuxTabs } from '@astrouxds/react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../providers/AppProvider';
import { Dispatch, SetStateAction } from 'react';
import { Equipment } from '../../Types/Equipment';
import InoperableEquipment from '../InoperableEquipment/InoperableEquipment';
import { RuxTabsCustomEvent } from '@astrouxds/astro-web-components';
import EquipmentDetailsPanel from '../EquipmentDetailsPanel/EquipmentDetailsPanel';
import Alerts from '../AlertsPanel/Alerts';
import ContactsTable from '../ContactsList/ContactsTable';
import MaintenancePanel from '../MaintenancePanel/MaintenancePanel';

type PropType = {
  selectedEquipment: Equipment[];
  setSelectedEquipment: Dispatch<SetStateAction<Equipment[]>>;
  inoperablePanelShow: boolean;
  setInoperablePanelShow: Dispatch<SetStateAction<boolean>>;
};

const EquipmentDetailsPage = ({
  selectedEquipment,
  setSelectedEquipment,
  inoperablePanelShow,
  setInoperablePanelShow,
}: PropType) => {
  const { state, dispatch }: any = useAppContext();
  const navigate = useNavigate();

  const setCurrentEquipment = (e: RuxTabsCustomEvent<any>) => {
    if (e.detail.id === 'inoperable-equipment') {
      setInoperablePanelShow(true);
      dispatch({ type: 'CURRENT_EQUIPMENT', payload: null });
    } else {
      for (const equipment of selectedEquipment) {
        if (e.detail.id === equipment.id) {
          dispatch({ type: 'CURRENT_EQUIPMENT', payload: equipment });
        }
      }
      setInoperablePanelShow(false);
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

  const selectEquipment = () => {
    navigate('/');
  };

  return (
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
              state.currentEquipment &&
              equipment.id === state.currentEquipment.id
                ? true
                : false
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
      <div>
        <div
          id='inoperable-equipment-panel'
          className={`${!inoperablePanelShow && 'hidden'}`}
        >
          <InoperableEquipment selectEquipment={selectEquipment} />
        </div>

        <div className='equip-details'>
          <div
            id='equipment-panel'
            className={`${inoperablePanelShow && 'hidden'}`}
          >
            <RuxContainer className='equipment-details'>
              <header slot='header'>Equipment Details</header>
              <div className='equipment-details_wrapper'>
                {state.currentEquipment && <EquipmentDetailsPanel />}

                <Alerts />
                <ContactsTable />
              </div>
            </RuxContainer>
            <MaintenancePanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentDetailsPage;
