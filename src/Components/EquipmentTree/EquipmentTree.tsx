import React, { useState, useEffect, useRef } from 'react'; //for webpack
import {
  RuxContainer,
  RuxStatus,
  RuxTree,
  RuxTreeNode,
} from '@astrouxds/react';
import { capitalize } from '../../utils';
import './EquipmentTree.css';
import { Equipment } from '../../Types/Equipment';

const EquipmentTree = () => {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [currentEquipment, setCurrentEquipment] = useState<Equipment | null>(
    null
  );
  const treeNodeRef = useRef<Set<HTMLRuxTreeNodeElement>>(new Set());
  const tree = useRef<HTMLRuxTreeElement | null>(null);
  const configArray: string[] = ['A', 'B', 'C', 'D', 'E'];
  const categoryArray: string[] = ['comms', 'digital', 'facilities', 'rf'];

  const handleSelectedEquipment = (equipment: Equipment) => {
    setCurrentEquipment(equipment);
    const currentEquipChanged = new CustomEvent('currentEquipChanged', {
      detail: equipment,
      bubbles: true,
    });
    tree.current?.dispatchEvent(currentEquipChanged);
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
    fetch(`https://grm-api-3a31afd8ee4e.herokuapp.com/equipment`)
      .then((res) => res.json())
      .then((data) => setEquipment(data))
      .catch((err) => console.log('error', err));
  }, []);

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
  }, [equipment]);

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
              <RuxTreeNode
                slot='node'
                key={`${category}${config}`}
                hidden={
                  equipment.filter(
                    (equip) =>
                      equip.category.toLowerCase() === category.toLowerCase() &&
                      equip.config.toLowerCase() === config.toLowerCase()
                  ).length < 1
                }
              >
                Component {config}
                {equipment.map(
                  (equip: Equipment, index: number) =>
                    equip.category.toLowerCase() === category.toLowerCase() &&
                    equip.config.toLowerCase() === config.toLowerCase() && (
                      <RuxTreeNode
                        key={`${category}${config}${index}`}
                        id={equip.id}
                        slot='node'
                        onRuxtreenodeselected={() =>
                          handleSelectedEquipment(equip)
                        }
                        selected={equip.id === currentEquipment?.id}
                        ref={(el) => {
                          if (el) {
                            treeNodeRef.current.add(el);
                          }
                        }}
                      >
                        {equip.status && (
                          <RuxStatus slot='prefix' status={equip.status} />
                        )}
                        {equip.config}-{equip.name}
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
