import { useState } from 'react';
import ContactsTable from '../ContactsList/ContactsTable';
// import SearchBar from '../../common/SearchBar/SearchBar';
import EquipmentDetailsPanel from '../EquipmentDetailsPanel/EquipmentDetailsPanel';
import Alerts from '../AlertsPanel/Alerts';
import MaintenancePanel from '../MaintenancePanel/MaintenancePanel';
import { Equipment } from '../../Types/Equipment';
import { RuxContainer } from '@astrouxds/react';

type PropTypes = {
  activeEquipment?: Equipment | null;
}
const EquipmentDetailsPage = ({ activeEquipment }: PropTypes) => {
  const [searchValue, setSearchValue] = useState<string>('');

  return (
    <main className='equip-details'>
       <RuxContainer className='equipment-details'>
      <header slot='header'>Equipment Details</header>
      {/* <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} /> */}
      <div className="equipment-details_wrapper">
      <EquipmentDetailsPanel activeEquipment={activeEquipment} />
      <Alerts />
      <ContactsTable
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      </div>
      
      </RuxContainer>
      <MaintenancePanel />
    </main>
  );
};

export default EquipmentDetailsPage;
