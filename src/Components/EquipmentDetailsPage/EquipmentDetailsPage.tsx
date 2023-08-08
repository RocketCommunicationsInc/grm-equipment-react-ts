import { useState } from 'react';
import SearchBar from '../../common/SearchBar/SearchBar';
import EquipmentDetailsPanel from '../EquipmentDetailsPanel/EquipmentDetailsPanel';
import Alerts from '../AlertsPanel/Alerts';
import MaintenancePanel from '../MaintenancePanel/MaintenancePanel';
import ContactsTable from '../ContactsList/ContactsTable';

const EquipmentDetailsPage = () => {
  const [searchValue, setSearchValue] = useState<string>('');

  return (
    <>
      <div className='equip-details-search-wrapper'>
        <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <main className='equip-details'>
        <EquipmentDetailsPanel />
        <Alerts />
        <ContactsTable
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        <MaintenancePanel searchValue={searchValue} />
      </main>
    </>
  );
};

export default EquipmentDetailsPage;
