import {
  RuxContainer,
  RuxStatus,
  RuxTree,
  RuxTreeNode,
} from '@astrouxds/react';
import { useAppContext } from '../../providers/AppProvider';
import { capitalize } from '../../utils';
import './EquipmentTree.css';
import { Equipment } from '../../Types/Equipment';

type PropTypes = {
  handleSelectedEquipment: (equipment: Equipment) => void;
};

const EquipmentTree = ({ handleSelectedEquipment }: PropTypes) => {
  const { state }: any = useAppContext();
  const configArray: string[] = ['A', 'B', 'C', 'D', 'E'];
  const categoryArray: string[] = ['digital', 'facilities', 'comms', 'rf'];

  return (
    <RuxContainer className='equipment-tree'>
      <RuxTree>
        {categoryArray.map((category) => (
          <RuxTreeNode key={category}>
            {category === 'rf' ? category.toUpperCase() : capitalize(category)}
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
