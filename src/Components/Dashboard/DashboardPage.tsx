import EquipmentDetailsPage from '../EquipmentDetailsPage/EquipmentDetailsPage';
import EquipmentTree from '../EquipmentTree/EquipmentTree';
import { Equipment } from '../../Types/Equipment';
import { useAppContext } from '../../providers/AppProvider';
import './DashboardPage.css';

const Dashboard = () => {
  const { state, dispatch }: any = useAppContext();

  const handleSelectedEquipment = (equipment: Equipment) => {
    dispatch({ type: 'CURRENT_EQUIPMENT', payload: equipment });
  };

  return (
    <main className='dashboard'>
      <EquipmentTree handleSelectedEquipment={handleSelectedEquipment} />
      <EquipmentDetailsPage inoperablePanelShow={!state.currentEquipment} />
    </main>
  );
};

export default Dashboard;
