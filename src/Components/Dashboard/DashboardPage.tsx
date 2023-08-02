import EquipmentTree from '../EquipmentTree/EquipmentTree';
import InoperableEquipment from '../InoperableEquipment/InoperableEquipment';

const Dashboard = () => {
  return (
    <main className={`$jdashboard page`}>
      <EquipmentTree />
      <InoperableEquipment />
    </main>
  );
};

export default Dashboard;
