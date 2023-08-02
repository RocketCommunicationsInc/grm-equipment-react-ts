import { RuxContainer } from '@astrouxds/react';
import './InoperableEquipment.css';
import EquipmentIcons from '../EquipmentIcons/EqupimentIcons';

const InoperableEquipment = () => {
  return (
    <RuxContainer className='inoperable-equipment'>
      <div slot='header'>Inoperable Equipment</div>
      <RuxContainer>
        <EquipmentIcons equipmentString={''} />
      </RuxContainer>
    </RuxContainer>
  );
};

export default InoperableEquipment;
