import { useState } from 'react';
import EquipmentDetailsPage from '../EquipmentDetailsPage/EquipmentDetailsPage';
import EquipmentTree from '../EquipmentTree/EquipmentTree';
import './DashboardPage.css';

const Dashboard = () => {
  const [inoperablePanelShow, setInoperablePanelShow] = useState<boolean>(true);

  return (
    <main className='dashboard'>
      <EquipmentTree setInoperablePanelShow={setInoperablePanelShow} />
      <EquipmentDetailsPage
        inoperablePanelShow={inoperablePanelShow}
        setInoperablePanelShow={setInoperablePanelShow}
      />
    </main>
  );
};

export default Dashboard;
