import { useState } from 'react';
import ContactsTable from './ContactsTable';
// import SearchBar from '../../common/SearchBar/SearchBar';
import EquipmentDetailsPanel from '../EquipmentDetailsPanel/EquipmentDetailsPanel';
import Alerts from '../AlertsPanel/Alerts';
import MaintenancePanel from '../MaintenancePanel/MaintenancePanel';

const ContactsTablePage = () => {
  const [searchValue, setSearchValue] = useState<string>('');

  return (
    <main className='equip-details'>
      {/* <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} /> */}
      <EquipmentDetailsPanel />
      <Alerts />
      <ContactsTable
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <MaintenancePanel />
    </main>
  );
};

export default ContactsTablePage;
