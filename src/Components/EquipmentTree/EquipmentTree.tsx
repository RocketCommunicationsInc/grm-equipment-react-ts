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
}

const EquipmentTree = ({ selectedEquipment, setSelectedEquipment }: PropTypes) => {
  const { state, dispatch }: any = useAppContext();

  const handleSelectedEquipment = (
    equipment: Equipment
  ) => {
    dispatch({ type: 'CURRENT_EQUIPMENT', payload: equipment });
    //? I'm not sure why the first one doesn't work. In theory it should
    if (selectedEquipment.includes(equipment)) return;
    for (const item of selectedEquipment) {
      if (item.equipmentString === equipment.equipmentString) return;
    }
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
