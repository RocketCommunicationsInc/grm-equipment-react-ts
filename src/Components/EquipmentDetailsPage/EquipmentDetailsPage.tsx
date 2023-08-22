import {
  RuxButton,
  RuxContainer,
  RuxIcon,
  RuxMenu,
  RuxMenuItem,
  RuxPopUp,
  RuxTab,
  RuxTabs,
} from '@astrouxds/react';
import { useAppContext } from '../../providers/AppProvider';
import {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useState,
  useEffect,
} from 'react';
import { Equipment } from '../../Types/Equipment';
import InoperableEquipment from '../InoperableEquipment/InoperableEquipment';
import EquipmentDetailsPanel from '../EquipmentDetailsPanel/EquipmentDetailsPanel';
import Alerts from '../AlertsPanel/Alerts';
import ContactsTable from '../ContactsList/ContactsTable';
import MaintenancePanel from '../MaintenancePanel/MaintenancePanel';

type PropType = {
  inoperablePanelShow: boolean;
  setInoperablePanelShow: Dispatch<SetStateAction<boolean>>;
  handleSelectedEquipment: (equipment: Equipment) => void;
};

const EquipmentDetailsPage = ({
  inoperablePanelShow,
  setInoperablePanelShow,
  handleSelectedEquipment,
}: PropType) => {
  const { state, dispatch }: any = useAppContext();
  const [showMenu, setShowMenu] = useState(false);

  const setCurrentEquipment = (
    e: MouseEvent<HTMLRuxTabsElement, globalThis.MouseEvent>
  ) => {
    const target = e.target as HTMLElement;
    //if the target isn't a tab do nothing
    if (!target.closest('rux-tab')) return;
    //if the target is a tab but is the remove button don't change tabs
    if (target.classList.contains('equipment-panel_tab-clear-button')) return;

    if (target.id === 'inoperable-equipment') {
      setInoperablePanelShow(true);
      dispatch({ type: 'CURRENT_EQUIPMENT', payload: null });
      return;
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

  //if more than 9
  const openTabs = document.querySelectorAll('rux-tab').length;

  useEffect(() => {
    openTabs >= 8 ? setShowMenu(true) : setShowMenu(false);
  }, [openTabs]);

  const firstEqupimentTabs = state.selectedEquipment
    .map((equipment: Equipment) => equipment)
    .slice(0, 8);

  const remainingEquipmentItems = state.selectedEquipment
    .map((equipment: Equipment) => equipment)
    .slice(9, 56);

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
        {firstEqupimentTabs.map((equipment: Equipment) => (
          <>
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
          </>
        ))}
        {showMenu && (
          <div className='tabs-menu'>
            <RuxIcon icon='chevron-right' slot='trigger' />
            <RuxPopUp
              className='app-icon-pop-up'
              placement='bottom-start'
              slot='left-side'
              closeOnSelect
            >
              {remainingEquipmentItems.map((equipment: Equipment) => (
                <RuxMenu
                  onRuxmenuselected={() =>
                    state.currentEquipment &&
                    equipment.id === state.currentEquipment.id
                      ? true
                      : false
                  }
                >
                  <RuxMenuItem key={equipment.id} id={equipment.id}>
                    {equipment.config}-{equipment.equipmentString}
                    <RuxButton
                      className='equipment-panel_tab-clear-button'
                      iconOnly
                      borderless
                      icon='clear'
                      onClick={() => handleClearClick(equipment)}
                    />
                  </RuxMenuItem>
                </RuxMenu>
              ))}
            </RuxPopUp>
          </div>
        )}
      </RuxTabs>
      <div
        id='inoperable-equipment-panel'
        className={`${!inoperablePanelShow && 'hidden-panel'}`}
      >
        <InoperableEquipment
          handleSelectedEquipment={handleSelectedEquipment}
        />
      </div>
      <div
        id='equipment-panel'
        className={`${inoperablePanelShow && 'hidden-panel'}`}
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
