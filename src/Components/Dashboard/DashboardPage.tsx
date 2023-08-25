import EquipmentDetailsPage from '../EquipmentDetailsPage/EquipmentDetailsPage';
import EquipmentTree from '../EquipmentTree/EquipmentTree';
import './DashboardPage.css';

const Dashboard = () => {
  return (
    <main className='dashboard'>
      <EquipmentTree />
      <EquipmentDetailsPage />
    </main>
  );
};

export default Dashboard;
