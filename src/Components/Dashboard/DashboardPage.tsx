import EquipmentTree from '../EquipmentTree/EquipmentTree';
import InoperableEquipment from '../InoperableEquipment/InoperableEquipment';

const Dashboard = () => {
  return (
    <main className='dashboard'>
      <EquipmentTree />
      <InoperableEquipment />
    </main>
  );
};

export default Dashboard;
