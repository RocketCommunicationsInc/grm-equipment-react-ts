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
  //useMemo,
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

  const openTabs = document.querySelectorAll('rux-tab').length;

  useEffect(() => {
    openTabs >= 9 ? setShowMenu(true) : setShowMenu(false);
    console.log('running');
  }, [openTabs]);

  const firstEqupimentTabs = state.selectedEquipment
    .map((equipment: Equipment) => equipment)
    .slice(0, 8);

  const remainingEquipmentItems = state.selectedEquipment
    .map((equipment: Equipment) => equipment)
    .slice(8, 56);

  const equipmentSelect = (e: any) => {
    const { detail } = e;
    for (const equipment of state.selectedEquipment) {
      if (detail.value === equipment.id) {
        dispatch({ type: 'CURRENT_EQUIPMENT', payload: equipment });
      }
    }
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
        </RuxTabs>
        {showMenu && (
          <RuxPopUp placement='bottom-start' open>
            <RuxIcon icon='chevron-right' slot='trigger' />
            <RuxMenu onRuxmenuselected={(e) => equipmentSelect(e)}>
              {remainingEquipmentItems.map((equipment: Equipment) => (
                <RuxMenuItem
                  value={equipment.id}
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
