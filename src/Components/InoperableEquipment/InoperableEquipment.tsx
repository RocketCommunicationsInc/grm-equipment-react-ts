import { RuxContainer } from '@astrouxds/react';
import './InoperableEquipment.css';
import EquipmentIcons from '../EquipmentIcons/EqupimentIcons';

type PropTypes = {
  selectEquipment: () => void;
};

const InoperableEquipment = ({ selectEquipment }: PropTypes) => {
  return (
    <RuxContainer className='inoperable-equipment'>
      <div slot='header'>Inoperable Equipment</div>
      <RuxContainer className='section'>
        <span>Comms (0)</span>
        <div className='no-equipment'>No Inoperable Equipment</div>
      </RuxContainer>
      <RuxContainer className='section'>
        <span>Digital (#)</span>
        <EquipmentIcons equipmentString={'SFEP19'} onClick={selectEquipment} />
      </RuxContainer>
      <RuxContainer className='section'>
        <span>Facilities (#)</span>
        <EquipmentIcons equipmentString={'ECEU15'} onClick={selectEquipment} />
      </RuxContainer>
      <RuxContainer className='section'>
        <span>RF (#)</span>
        <EquipmentIcons equipmentString={'RVC14'} onClick={selectEquipment} />
      </RuxContainer>
    </RuxContainer>
  );
};

export default InoperableEquipment;
