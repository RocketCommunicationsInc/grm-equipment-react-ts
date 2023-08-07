import { RuxTab, RuxTabPanel, RuxTabPanels, RuxTabs } from '@astrouxds/react';
import EquipmentTree from '../EquipmentTree/EquipmentTree';
import InoperableEquipment from '../InoperableEquipment/InoperableEquipment';
import { useNavigate } from 'react-router-dom';
import './DashboardPage.css';

const Dashboard = () => {
  const navigate = useNavigate();

  const selectEquipment = () => {
    navigate('/equipment-details');
  };

  return (
    <main className='dashboard'>
      <EquipmentTree />
      <div className='dashboard_equipment-wrapper'>
        <div className='tabs-and-search'>
          <RuxTabs id='equipment-tabs'>
            <RuxTab id='inoperable-equipment'>Inoperable</RuxTab>
          </RuxTabs>
        </div>
        <RuxTabPanels aria-labelledby='equipment-tabs'>
          <RuxTabPanel aria-labelledby='inoperable-equipment'>
            <InoperableEquipment selectEquipment={selectEquipment} />
          </RuxTabPanel>
        </RuxTabPanels>
      </div>
    </main>
  );
};

export default Dashboard;
