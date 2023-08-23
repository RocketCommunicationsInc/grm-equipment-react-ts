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
  const [popUpOpen, setPopupOpen] = useState(false);

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
          console.log('dispatching', equipment);
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

  useEffect(() => {
    state.selectedEquipment.length >= 9
      ? setShowMenu(true)
      : setShowMenu(false);
  }, [state.selectedEquipment.length]);

  const equipmentSelect = (e: any) => {
    const { detail } = e;
    for (const equipment of state.selectedEquipment) {
      if (detail.value === equipment.id) {
        dispatch({ type: 'CURRENT_EQUIPMENT', payload: equipment });
      }
    }
    setPopupOpen(true);
    setInoperablePanelShow(false);
  };

  return (
    <div className='dashboard_equipment-wrapper'>
      <div className='tabs-and-menu-wrapper'>
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
          {state.selectedEquipment
            .slice(0, 8)
            .map((equipment: Equipment, index: number) => (
              <RuxTab
                key={equipment.id + equipment.category + index}
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
        {showMenu && state.selectedEquipment.length > 8 && (
          <RuxPopUp
            placement='bottom-start'
            closeOnSelect
            onRuxpopupopened={() => setPopupOpen(true)}
            onRuxpopupclosed={() => setPopupOpen(false)}
          >
            {popUpOpen ? (
              <RuxIcon
                icon='arrow-drop-down'
                slot='trigger'
                size='large'
                className='open-popup'
              />
            ) : (
              <RuxIcon icon='arrow-right' slot='trigger' size='large' />
            )}

            <RuxMenu onRuxmenuselected={(e) => equipmentSelect(e)}>
              {state.selectedEquipment
                .slice(8)
                .map((equipment: Equipment, index: any) => (
                  <RuxMenuItem
                    value={equipment.id}
                    key={equipment.id + index}
                    id={equipment.id}
                    selected={
                      state.currentEquipment &&
                      equipment.id === state.currentEquipment.id
                        ? true
                        : false
                    }
                  >
                    <span>
                      {equipment.config}-{equipment.equipmentString}
                      <RuxButton
                        iconOnly
                        borderless
                        icon='clear'
                        onClick={() => handleClearClick(equipment)}
                      />
                    </span>
                  </RuxMenuItem>
                ))}
            </RuxMenu>
          </RuxPopUp>
        )}
      </div>
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
