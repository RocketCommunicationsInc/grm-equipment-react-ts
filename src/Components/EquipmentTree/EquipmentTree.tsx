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
  const tree = useRef<HTMLRuxTreeElement | null>(null);
  const configArray: string[] = ['A', 'B', 'C', 'D', 'E'];
  const categoryArray: string[] = ['digital', 'facilities', 'comms', 'rf'];

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
      if (node.selected === true) {
        expandTreeNodeParent(node);
      }
    }
  }, [state.currentEquipment]);

  useEffect(() => {
    if (!tree.current) return;
    const ruxTree = tree.current;
    const handleTreeClick = (event: any) => {
      const target = event.target as HTMLRuxTreeNodeElement;
      //if the target isn't the bottom node of the tree then we don't want it to do normal tree things
      //such as get a 'selected' state
      if (target.getAttribute('aria-level') !== '3') {
        event.stopImmediatePropagation();
        target.toggleAttribute('expanded');
      }
    };

    ruxTree.addEventListener('click', handleTreeClick, { capture: true });

    return () => {
      ruxTree.removeEventListener('click', handleTreeClick, { capture: true });
    };
  }, [tree]);

  return (
    <RuxContainer className='equipment-tree'>
      <RuxTree ref={tree}>
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
                        selected={equipment.id === state?.currentEquipment?.id}
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
