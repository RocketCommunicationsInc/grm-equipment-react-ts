import { useState } from 'react';
import ContactsTable from '../ContactsList/ContactsTable';
// import SearchBar from '../../common/SearchBar/SearchBar';
import EquipmentDetailsPanel from '../EquipmentDetailsPanel/EquipmentDetailsPanel';
import Alerts from '../AlertsPanel/Alerts';
import MaintenancePanel from '../MaintenancePanel/MaintenancePanel';
import { RuxContainer, RuxTabPanel } from '@astrouxds/react';
import { useAppContext } from '../../providers/AppProvider';
import { Equipment } from '../../Types/Equipment';
import InoperableEquipment from '../InoperableEquipment/InoperableEquipment';
import { useNavigate } from 'react-router-dom';

type PropType = {
  selectedEquipment: Equipment[];
  inoperablePanelShow: boolean;
};

const EquipmentDetailsPage = ({ selectedEquipment, inoperablePanelShow }: PropType) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const { state }: any = useAppContext();
  const navigate = useNavigate();

  const selectEquipment = () => {
    navigate('/equipment-details');
  };

  return (
    <div className='equip-details'>
      <div id='inoperable-equipment-panel' className={`${!inoperablePanelShow && 'hidden'}`}>
        <InoperableEquipment selectEquipment={selectEquipment} />
      </div>

      <div id="equipment-panel" className={`${inoperablePanelShow && 'hidden'}`}>
        <RuxContainer className='equipment-details'>
          <header slot='header'>Equipment Details</header>
          {/* <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} /> */}
          <div className='equipment-details_wrapper'>
            {state.currentEquipment && <EquipmentDetailsPanel />}

            <Alerts />
            <ContactsTable
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />
          </div>
        </RuxContainer>
      </div>

      {/* <MaintenancePanel /> */}
    </div>
  );
};

export default EquipmentDetailsPage;
