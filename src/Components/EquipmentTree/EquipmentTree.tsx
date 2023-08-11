import {
  RuxContainer,
  RuxStatus,
  RuxTree,
  RuxTreeNode,
} from '@astrouxds/react';
import { useAppContext } from '../../providers/AppProvider';
import { Equipment } from '../../Types/Equipment';
import { Dispatch, SetStateAction } from 'react';
import { capitalize } from '../../utils';
import './EquipmentTree.css';

type PropTypes = {
  setInoperablePanelShow: Dispatch<SetStateAction<boolean>>;
};

const EquipmentTree = ({ setInoperablePanelShow }: PropTypes) => {
  const { state, dispatch }: any = useAppContext();
  const configArray: string[] = ['A', 'B', 'C', 'D', 'E'];
  const categoryArray: string[] = ['digital', 'facilities', 'comms', 'rf'];

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
    <RuxContainer className='equipment-tree'>
      <RuxTree>
        {categoryArray.map((category) => (
          <RuxTreeNode key={category}>
            {category}
            {configArray.map((config) => (
              <RuxTreeNode slot='node' key={`${category}${config}`}>
                Component {config}
                {state.equipment.map(
                  (equipment: any, index: number) =>
                    equipment.category === category &&
                    equipment.config === config && (
                      <RuxTreeNode
                        key={`${category}${config}${index}`}
                        slot='node'
                        onRuxtreenodeselected={() =>
                          handleSelectedEquipment(equipment)
                        }
                      >
                        <RuxStatus slot='prefix' status={equipment.status} />
                        {equipment.config}-{equipment.equipmentString}
                      </RuxTreeNode>
                    )
                )}
              </RuxTreeNode>
            ))}
          </RuxTreeNode>
        ))}
      </RuxTree>
    </RuxContainer>
  );
};

export default EquipmentTree;
