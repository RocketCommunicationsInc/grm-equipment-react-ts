import { Equipment } from '../../Types/Equipment';
import { useAppContext } from '../../providers/AppProvider';
import EquipmentDetailsPage from '../EquipmentDetailsPage/EquipmentDetailsPage';
import EquipmentTree from '../EquipmentTree/EquipmentTree';
import './DashboardPage.css';

const Dashboard = () => {
  const { state, dispatch }: any = useAppContext();

  const handleSelectedEquipment = (equipment: Equipment): void => {
    dispatch({ type: 'CURRENT_EQUIPMENT', payload: equipment });
  };

  return (
    <main className='dashboard'>
      <EquipmentTree
        equipmentList={state.equipment}
        handleSelected={handleSelectedEquipment}
      />
      <EquipmentDetailsPage />
    </main>
  );
};

export default Dashboard;
