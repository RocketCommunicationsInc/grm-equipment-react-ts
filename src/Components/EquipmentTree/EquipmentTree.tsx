import { RuxContainer, RuxTree, RuxTreeNode } from '@astrouxds/react';
import './EquipmentTree.css';

const EquipmentTree = () => {
  return (
    <RuxContainer className='equipment-tree'>
      <RuxTree>
        Tree
        <RuxTreeNode>
          Node
          <RuxTreeNode>Child Node</RuxTreeNode>
        </RuxTreeNode>
      </RuxTree>
    </RuxContainer>
  );
};

export default EquipmentTree;
