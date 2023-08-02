import { RuxContainer, RuxTree, RuxTreeNode } from '@astrouxds/react';
import './EquipmentTree.css';

// type PropTypes = {
//   selectEquipment: () => void;
// };

const EquipmentTree = () =>
  //{ selectEquipment }: PropTypes
  {
    return (
      <RuxContainer className='equipment-tree'>
        <RuxTree>
          Tree
          <RuxTreeNode>
            Node
            <RuxTreeNode
            //onRuxtreenodeselected={() => selectEquipment()}
            >
              Child Node
            </RuxTreeNode>
          </RuxTreeNode>
        </RuxTree>
      </RuxContainer>
    );
  };

export default EquipmentTree;
