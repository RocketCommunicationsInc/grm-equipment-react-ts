import { useState } from 'react';
import EquipmentDetailsPage from '../EquipmentDetailsPage/EquipmentDetailsPage';
import EquipmentTree from '../EquipmentTree/EquipmentTree';
import { Equipment } from '../../Types/Equipment';
import { useAppContext } from '../../providers/AppProvider';
import './DashboardPage.css';

const Dashboard = () => {
  const { state, dispatch }: any = useAppContext();
  const [inoperablePanelShow, setInoperablePanelShow] = useState<boolean>(
    state.selectedEquipment.length ? false : true
  );

  // const [selectedTreeNode, setSelectedTreeNode] = useState(false);
  const handleSelectedEquipment = (equipment: Equipment) => {
    // always set the selected equipment to the current equipment in app state.
    dispatch({ type: 'CURRENT_EQUIPMENT', payload: equipment });

    // hide the inoperable panel in favor of the equipment panel
    setInoperablePanelShow(false);

    // check if equipment already has an existing tab (if it is in selectedEquipment state)
    const equipmentFound =
      state.selectedEquipment &&
      state.selectedEquipment.some((equipmentItem: Equipment) => {
        if (equipmentItem.id === equipment.id) {
          return true;
        }
        return false;
      });

    //if it has a tab, don't add it, return
    if (equipmentFound) {
      return;
    } else {
      // if it doesn't have a tab, add to selectedEquipment state array, which will then re-render component and create new tab.
      dispatch({ type: 'ADD_SELECTED_EQUIPMENT', payload: equipment });
    }
  };

  return (
    <main className='dashboard'>
      <EquipmentTree handleSelectedEquipment={handleSelectedEquipment} />
      <EquipmentDetailsPage
        inoperablePanelShow={inoperablePanelShow}
        setInoperablePanelShow={setInoperablePanelShow}
        handleSelectedEquipment={handleSelectedEquipment}
      />
    </main>
  );
};

export default Dashboard;
