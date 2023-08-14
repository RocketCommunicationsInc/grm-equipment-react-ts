import { RuxButton, RuxContainer, RuxTab, RuxTabs } from '@astrouxds/react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../providers/AppProvider';
import { Dispatch, MouseEvent, SetStateAction } from 'react';
import { Equipment } from '../../Types/Equipment';
import InoperableEquipment from '../InoperableEquipment/InoperableEquipment';
import EquipmentDetailsPanel from '../EquipmentDetailsPanel/EquipmentDetailsPanel';
import Alerts from '../AlertsPanel/Alerts';
import ContactsTable from '../ContactsList/ContactsTable';
import MaintenancePanel from '../MaintenancePanel/MaintenancePanel';

type PropType = {
  inoperablePanelShow: boolean;
  setInoperablePanelShow: Dispatch<SetStateAction<boolean>>;
};

const EquipmentDetailsPage = ({
  inoperablePanelShow,
  setInoperablePanelShow,
}: PropType) => {
  const { state, dispatch }: any = useAppContext();
  const navigate = useNavigate();

  const setCurrentEquipment = (
    e: MouseEvent<HTMLRuxTabsElement, globalThis.MouseEvent>
  ) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('equipment-panel_tab-clear-button')) return;

    if (target.id === 'inoperable-equipment') {
      setInoperablePanelShow(true);
      dispatch({ type: 'CURRENT_EQUIPMENT', payload: null });
    } else {
      for (const equipment of state.selectedEquipment) {
        if (target.id === equipment.id) {
          dispatch({ type: 'CURRENT_EQUIPMENT', payload: equipment });
        }
      }
      setInoperablePanelShow(false);
    }
  };

  const handleClearClick = (equipment: Equipment) => {
    // if the tab being cleared is the currently selected one, fallback to inoperable equipment
    if (state.currentEquipment && state.currentEquipment.id === equipment.id) {
      dispatch({ type: 'CURRENT_EQUIPMENT', payload: null });
      // sets fallback panel
      setInoperablePanelShow(true);
    }

    dispatch({ type: 'REMOVE_SELECTED_EQUIPMENT', payload: equipment });
  };

  const selectEquipment = () => {
    navigate('/');
  };

  return (
    <div className='dashboard_equipment-wrapper'>
      <RuxTabs
        small={true}
        id='equipment-tabs'
        onClick={(e) => setCurrentEquipment(e)}
      >
        <RuxTab
          id='inoperable-equipment'
          key='inoperable-equipment'
          selected={state.currentEquipment === null ? true : false}
        >
          Inoperable
        </RuxTab>
        {state.selectedEquipment.map((equipment: Equipment) => (
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
              className='equipment-panel_tab-clear-button'
              iconOnly
              borderless
              icon='clear'
              onClick={() => handleClearClick(equipment)}
            />
          </RuxTab>
        ))}
      </RuxTabs>
      <div
        id='inoperable-equipment-panel'
        className={`${!inoperablePanelShow && 'hidden'}`}
      >
        <InoperableEquipment selectEquipment={selectEquipment} />
      </div>
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
  );
};

export default EquipmentDetailsPage;
