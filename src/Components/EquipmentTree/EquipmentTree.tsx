import { useEffect, useRef } from 'react';
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

const EquipmentTree = () => {
  const { state, dispatch }: any = useAppContext();
  const treeNodeRef = useRef<Set<HTMLRuxTreeNodeElement>>(new Set());
  const configArray: string[] = ['A', 'B', 'C', 'D', 'E'];
  const categoryArray: string[] = ['comms', 'digital', 'facilities', 'rf'];

  const handleSelectedEquipment = (equipment: Equipment) => {
    dispatch({ type: 'CURRENT_EQUIPMENT', payload: equipment });
  };

  const expandTreeNodeParent = (treeNode: HTMLRuxTreeNodeElement) => {
    const parentNode = treeNode?.parentElement?.closest('rux-tree-node');
    const grandParentNode = parentNode?.parentElement?.closest('rux-tree-node');
    if (parentNode && grandParentNode) {
      parentNode.expanded = true;
      grandParentNode.expanded = true;
    }
  };

  const collapseTreeNodeParent = (treeNode: HTMLRuxTreeNodeElement) => {
    const parentNode = treeNode?.parentElement?.closest('rux-tree-node');
    const grandParentNode = parentNode?.parentElement?.closest('rux-tree-node');
    if (parentNode && grandParentNode) {
      parentNode.expanded = false;
      grandParentNode.expanded = false;
    }
  };

  useEffect(() => {
    const treeNodeSet = treeNodeRef.current;
    for (const node of treeNodeSet) {
      collapseTreeNodeParent(node);
    }

    for (const node of treeNodeSet) {
      if (node?.id === state?.currentEquipment?.id) {
        node.selected = true;
        expandTreeNodeParent(node);
      } else {
        node.selected = false;
      }
    }
    return () => {
      for (const node of treeNodeSet) {
        node.selected = false;
      }
    };
  }, [state.currentEquipment]);

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
                        id={equipment.id}
                        slot='node'
                        onRuxtreenodeselected={() =>
                          handleSelectedEquipment(equipment)
                        }
                        ref={(el) => {
                          if (el) {
                            treeNodeRef.current.add(el);
                          }
                        }}
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
