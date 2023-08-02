import {
  RuxContainer,
  RuxStatus,
  RuxTree,
  RuxTreeNode,
} from '@astrouxds/react';
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
          <RuxTreeNode>
            Comms
            <RuxTreeNode
              slot='node'
              //onRuxtreenodeselected={() => selectEquipment()}
            >
              Child Node
              <RuxTreeNode slot='node'>
                <RuxStatus slot='prefix' status='caution' />
                Grandchild
              </RuxTreeNode>
            </RuxTreeNode>
          </RuxTreeNode>
          <RuxTreeNode>
            Digital
            <RuxTreeNode
              slot='node'
              //onRuxtreenodeselected={() => selectEquipment()}
            >
              Child Node
            </RuxTreeNode>
          </RuxTreeNode>
          <RuxTreeNode>
            Facilities
            <RuxTreeNode
              slot='node'
              //onRuxtreenodeselected={() => selectEquipment()}
            >
              Child Node
            </RuxTreeNode>
          </RuxTreeNode>
          <RuxTreeNode>
            RF
            <RuxTreeNode
              slot='node'
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
