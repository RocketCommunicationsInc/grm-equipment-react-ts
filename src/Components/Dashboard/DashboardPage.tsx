import {
  RuxButton,
  RuxContainer,
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
import { useMemo, useState } from 'react';
import { RuxTabsCustomEvent } from '@astrouxds/astro-web-components';
import { useAppContext } from '../../providers/AppProvider';
import SearchBar from '../../common/SearchBar/SearchBar';
import EquipmentDetailsPanel from '../EquipmentDetailsPanel/EquipmentDetailsPanel';
import Alerts from '../AlertsPanel/Alerts';
import ContactsTable from '../ContactsList/ContactsTable';
import MaintenancePanel from '../MaintenancePanel/MaintenancePanel';
import { useTTCGRMContacts } from '@astrouxds/mock-data';
import { filterContacts } from '../../utils/filterContacts';

const Dashboard = () => {
  const [searchValue, setSearchValue] = useState('');
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
    navigate('/equipment-details');
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

  const { dataArray: contacts } = useTTCGRMContacts();

  const filteredContacts = useMemo(() => {
    return filterContacts(contacts, searchValue);
  }, [contacts, searchValue]);

  return (
    <main className='dashboard'>
      <EquipmentTree
        selectedEquipment={selectedEquipment}
        setSelectedEquipment={setSelectedEquipment}
      />
      <div className='dashboard_equipment-wrapper'>
        <div className='tabs-wrapper'>
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
          <SearchBar
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        </div>
        <RuxTabPanels aria-labelledby='equipment-tabs'>
          <RuxTabPanel aria-labelledby='inoperable-equipment'>
            <InoperableEquipment selectEquipment={selectEquipment} />
          </RuxTabPanel>
          {state.currentEquipment &&
            selectedEquipment.map((equipment) => (
              <RuxTabPanel key={equipment.id} aria-labelledby={equipment.id}>
                <main className='equip-details'>
                  <RuxContainer className='equipment-details'>
                    <header slot='header'>Equipment Details</header>
                    <div className='equipment-details_wrapper'>
                      <EquipmentDetailsPanel />
                      <Alerts />
                      <ContactsTable
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                      />
                    </div>
                  </RuxContainer>
                  <MaintenancePanel searchValue={searchValue} />
                </main>
              </RuxTabPanel>
            ))}
        </RuxTabPanels>
      </div>
    </main>
  );
};

export default Dashboard;
