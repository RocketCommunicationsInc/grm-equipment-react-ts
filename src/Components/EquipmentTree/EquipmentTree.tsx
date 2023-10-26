import { useEffect, useRef, useState } from 'react';
import {
  RuxContainer,
  RuxStatus,
  RuxTree,
  RuxTreeNode,
} from '@astrouxds/react';
import { capitalize } from '../../utils';
import './EquipmentTree.css';
import { Equipment } from '../../Types/Equipment';

type PropTypes = {
  equipmentList: Equipment[];
  handleSelected: Function;
};

const EquipmentTree = ({ equipmentList, handleSelected }: PropTypes) => {
  const [selected, setSelected] = useState<null | string>(null);

  const treeNodeRef = useRef<Set<HTMLRuxTreeNodeElement>>(new Set());
  const tree = useRef<HTMLRuxTreeElement | null>(null);
  const configArray: string[] = ['A', 'B', 'C', 'D', 'E'];
  const categoryArray: string[] = ['Comms', 'Digital', 'Facilities', 'RF'];

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
  }, [selected]);

  const handleSelectedEquipment = (equipment: Equipment) => {
    setSelected(equipment.id);
    if (handleSelected) {
      handleSelected(equipment);
    }
  };

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

  const checkConfig = (category: string, config: string) => {
    return equipmentList.some(
      (equip) =>
        equip.category.toLowerCase() === category.toLowerCase() &&
        equip.config.toLowerCase() === config.toLowerCase()
    );
  };

  return (
    <RuxContainer className='equipment-tree'>
      <RuxTree ref={tree}>
        {categoryArray.map(
          (category) =>
            equipmentList.some(
              (equip) => equip.category.toLowerCase() === category.toLowerCase()
            ) && (
              <RuxTreeNode key={category}>
                {category === 'rf'
                  ? category.toUpperCase()
                  : capitalize(category)}
                {configArray.map(
                  (config) =>
                    checkConfig(category, config) && (
                      <RuxTreeNode slot='node' key={`${category}${config}`}>
                        Component {config}
                        {equipmentList.map(
                          (equipment: any, index: number) =>
                            equipment.category.toLowerCase() ===
                              category.toLowerCase() &&
                            equipment.config.toLowerCase() ===
                              config.toLowerCase() && (
                              <RuxTreeNode
                                key={`${category}${config}${index}`}
                                id={equipment.id}
                                slot='node'
                                onRuxtreenodeselected={() =>
                                  handleSelectedEquipment(equipment)
                                }
                                selected={equipment.id === selected}
                                ref={(el) => {
                                  if (el) {
                                    treeNodeRef.current.add(el);
                                  }
                                }}
                              >
                                <RuxStatus
                                  slot='prefix'
                                  status={equipment.status}
                                />
                                {equipment.config}-{equipment.equipmentString}
                              </RuxTreeNode>
                            )
                        )}
                      </RuxTreeNode>
                    )
                )}
              </RuxTreeNode>
            )
        )}
      </RuxTree>
    </RuxContainer>
  );
};

export default EquipmentTree;
