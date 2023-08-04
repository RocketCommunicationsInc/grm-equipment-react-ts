import { RuxTab, RuxTabPanel, RuxTabPanels, RuxTabs } from '@astrouxds/react';
import EquipmentTree from '../EquipmentTree/EquipmentTree';
import InoperableEquipment from '../InoperableEquipment/InoperableEquipment';
import { useNavigate } from 'react-router-dom';
import { Equipment } from '../../Types/Equipment';
import './DashboardPage.css';
import { useState } from 'react';

const Dashboard = () => {
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment[]>([]);
  const navigate = useNavigate();

  const selectEquipment = () => {
    navigate('/equipment-details');
  };

  return (
    <main className='dashboard'>
      <EquipmentTree
        selectedEquipment={selectedEquipment}
        setSelectedEquipment={setSelectedEquipment}
      />
      <div className='dashboard_equipment-wrapper'>
        <RuxTabs small={true} id='equipment-tabs'>
          <RuxTab id='inoperable-equipment'>Inoperable</RuxTab>
          {selectedEquipment.map((equipment) => (
            <RuxTab key={equipment.id} id={equipment.id}>
              {equipment.config}-{equipment.equipmentString}
            </RuxTab>
          ))}
        </RuxTabs>
        <RuxTabPanels aria-labelledby='equipment-tabs'>
          <RuxTabPanel aria-labelledby='inoperable-equipment'>
            <InoperableEquipment selectEquipment={selectEquipment} />
          </RuxTabPanel>
          {selectedEquipment.map((equipment) => (
            <RuxTabPanel key={equipment.id} aria-labelledby={equipment.id}>
              {equipment.equipmentString}
            </RuxTabPanel>
          ))}
        </RuxTabPanels>
      </div>
    </main>
  );
};

export default Dashboard;
