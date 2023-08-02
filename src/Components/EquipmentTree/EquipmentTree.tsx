import { RuxContainer, RuxTree } from '@astrouxds/react';
import './EquipmentTree.css';

const EquipmentTree = () => {
  return (
    <RuxContainer className='equipment-tree'>
      <RuxTree>Tree</RuxTree>
    </RuxContainer>
  );
};

export default EquipmentTree;
