import { RuxContainer } from '@astrouxds/react';
import './InoperableEquipment.css';
import EquipmentIcons from '../EquipmentIcons/EqupimentIcons';

const InoperableEquipment = () => {
  return (
    <RuxContainer className='inoperable-equipment'>
      <div slot='header'>Inoperable Equipment</div>
      <RuxContainer className='section'>
        <span>Comms (0)</span>
        <div className='no-equipment'>No Inoperable Equipment</div>
      </RuxContainer>
      <RuxContainer className='section'>
        <span>Digital (#)</span>
        <EquipmentIcons equipmentString={''} />
      </RuxContainer>
      <RuxContainer className='section'>
        <span>Facilities (#)</span>
        <EquipmentIcons equipmentString={''} />
      </RuxContainer>
      <RuxContainer className='section'>
        <span>RF (#)</span>
        <EquipmentIcons equipmentString={''} />
      </RuxContainer>
    </RuxContainer>
  );
};

export default InoperableEquipment;
