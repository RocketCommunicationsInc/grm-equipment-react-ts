import { useState } from 'react';
import { Equipment } from '../../Types/Equipment';
import EquipmentDetailsPage from '../EquipmentDetailsPage/EquipmentDetailsPage';
import EquipmentTree from '../EquipmentTree/EquipmentTree';
import './DashboardPage.css';

const Dashboard = () => {
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment[]>([]);

  return (
    <main className='dashboard'>
      <EquipmentTree
        selectedEquipment={selectedEquipment}
        setSelectedEquipment={setSelectedEquipment}
      />
      <EquipmentDetailsPage
        selectedEquipment={selectedEquipment}
        setSelectedEquipment={setSelectedEquipment}
      />
    </main>
  );
};

export default Dashboard;
