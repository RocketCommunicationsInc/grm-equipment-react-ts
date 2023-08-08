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
  selectedEquipment: Equipment[];
  setSelectedEquipment: Dispatch<SetStateAction<Equipment[]>>;
};

const EquipmentTree = ({
  selectedEquipment,
  setSelectedEquipment,
}: PropTypes) => {
  const { state, dispatch }: any = useAppContext();

  const handleSelectedEquipment = (equipment: Equipment) => {
    // always set the selected equipment to the current equipment in app state.
    dispatch({ type: 'CURRENT_EQUIPMENT', payload: equipment });

    // check if equipment already has an existing tab (if it is in selectedEquipment state)
    const equipmentFound = selectedEquipment.some(equipmentItem => {
      if (equipmentItem.id === equipment.id) return true;
      return false;
    });

    //if it already has a tab, don't add it
    if (equipmentFound) return

    // if it doesn't have a tab, add to selectedEquipment state, which will then re-render component and create new tab.
    setSelectedEquipment([...selectedEquipment, { ...equipment }]);
  };

  return (
    <RuxContainer className='equipment-tree'>
      <RuxTree>
        {Object.keys(state.equipmentByCategory).map((category) => (
          <RuxTreeNode key={category}>
            {category === 'rf' ? category.toUpperCase() : capitalize(category)}
            {Object.keys(state.equipmentByCategory[category]).map((config) => (
              <RuxTreeNode slot='node' key={`${category}${config}`}>
                Component {config}
                {Object.values(state.equipmentByCategory[category][config]).map(
                  (equipment: any, index: any) => (
                    <RuxTreeNode
                      key={`${category}${config}${index}`}
                      slot='node'
                      onRuxtreenodeselected={() =>
                        handleSelectedEquipment(equipment)
                      }
                    >
                      <RuxStatus slot='prefix' status={equipment.status} />
                      A-{equipment.equipmentString}
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
