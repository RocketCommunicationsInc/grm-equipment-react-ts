import { useState } from 'react';
import { Equipment } from '../../Types/Equipment';
import EquipmentDetailsPage from '../EquipmentDetailsPage/EquipmentDetailsPage';
import EquipmentTree from '../EquipmentTree/EquipmentTree';
import './DashboardPage.css';

const Dashboard = () => {
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment[]>([]);
  const [inoperablePanelShow, setInoperablePanelShow] = useState<boolean>(true);

  return (
    <main className='dashboard'>
      <EquipmentTree
        selectedEquipment={selectedEquipment}
        setSelectedEquipment={setSelectedEquipment}
        setInoperablePanelShow={setInoperablePanelShow}
      />
      <EquipmentDetailsPage
        selectedEquipment={selectedEquipment}
        setSelectedEquipment={setSelectedEquipment}
        inoperablePanelShow={inoperablePanelShow}
        setInoperablePanelShow={setInoperablePanelShow}
      />
    </main>
  );
};

export default Dashboard;
