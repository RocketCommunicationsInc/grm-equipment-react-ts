import { RuxContainer } from '@astrouxds/react';
import './InoperableEquipment.css';

const InoperableEquipment = () => {
  return (
    <RuxContainer className='inoperable-equipment'>
      <div slot='header'>Inoperable Equipment</div>
    </RuxContainer>
  );
};

export default InoperableEquipment;
