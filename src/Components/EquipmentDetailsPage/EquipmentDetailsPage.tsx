import { useRef, useMemo, MouseEvent } from 'react';
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
import { Equipment } from '../../Types/Equipment';
import InoperableEquipment from '../InoperableEquipment/InoperableEquipment';
import EquipmentDetailsPanel from '../EquipmentDetailsPanel/EquipmentDetailsPanel';
import Alerts from '../AlertsPanel/Alerts';
import ContactsTable from '../ContactsList/ContactsTable';
import MaintenancePanel from '../MaintenancePanel/MaintenancePanel';
import './EquipmentDetailsPage.css';

type PropType = {
  inoperablePanelShow: boolean;
};

const EquipmentDetailsPage = ({ inoperablePanelShow }: PropType) => {
  const { state, dispatch }: any = useAppContext();
  const tabsRef = useRef<Set<HTMLRuxTabElement>>(new Set());
  const menuItemsRef = useRef<Set<HTMLRuxMenuItemElement>>(new Set());

  const menuItemIsSelected = useMemo(
    () => state.selectedEquipment.slice(8).includes(state.currentEquipment),
    [state.currentEquipment, state.selectedEquipment]
  );

  const setCurrentEquipment = (
    e: MouseEvent<HTMLRuxTabsElement, globalThis.MouseEvent>
  ) => {
    const target = e.target as HTMLElement;
    if (target.id === 'inoperable-equipment') {
      dispatch({ type: 'CURRENT_EQUIPMENT', payload: null });
      return;
    } else {
      for (const equipment of state.selectedEquipment) {
        if (target.id === equipment.id) {
          dispatch({ type: 'CURRENT_EQUIPMENT', payload: equipment });
        }
      }
    }
  };

  const handleClearClick = (equipment: Equipment) => {
    // if the tab being cleared is the currently selected one, fallback to inoperable equipment
    if (state.currentEquipment && state.currentEquipment.id === equipment.id) {
      dispatch({ type: 'CURRENT_EQUIPMENT', payload: null });
    }
    dispatch({ type: 'REMOVE_SELECTED_EQUIPMENT', payload: equipment });
  };

  const equipmentSelect = (e: any) => {
    const { detail } = e;
    for (const equipment of state.selectedEquipment) {
      if (detail.value === equipment.id) {
        dispatch({ type: 'CURRENT_EQUIPMENT', payload: equipment });
      }
    }
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
            ref={(el) => {
              if (el) {
                tabsRef.current.add(el);
              }
            }}
            id='inoperable-equipment'
            key='inoperable-equipment'
            selected={state.currentEquipment === null}
          >
            Inoperable
          </RuxTab>
          {state.selectedEquipment.slice(0, 8).map((equipment: Equipment) => (
            <RuxTab
              className='equipment-tabs'
              ref={(el) => {
                if (el) {
                  tabsRef.current.add(el);
                }
              }}
              key={equipment.id}
              id={equipment.id}
              selected={equipment?.id === state?.currentEquipment?.id}
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
        {
          <RuxPopUp
            hidden={state.selectedEquipment.length <= 8}
            placement='bottom-start'
            closeOnSelect
          >
            {menuItemIsSelected ? (
              <RuxIcon
                icon='arrow-drop-down'
                slot='trigger'
                className='open-popup-selected-item'
              />
            ) : (
              <RuxIcon icon='arrow-right' slot='trigger' />
            )}
            <div className='menu-wrapper'>
              <RuxMenu onRuxmenuselected={(e) => equipmentSelect(e)}>
                {state.selectedEquipment
                  .slice(8)
                  .map((equipment: Equipment) => (
                    <RuxMenuItem
                      className='equip-menu-item'
                      ref={(el) => {
                        if (el) {
                          menuItemsRef.current.add(el);
                        }
                      }}
                      value={equipment.id}
                      key={equipment.id}
                      id={equipment.id}
                      selected={equipment.id === state?.currentEquipment?.id}
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
            </div>
          </RuxPopUp>
        }
      </div>
      <div
        id='inoperable-equipment-panel'
        className={`${!inoperablePanelShow && 'hidden-panel'}`}
      >
        <InoperableEquipment />
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
