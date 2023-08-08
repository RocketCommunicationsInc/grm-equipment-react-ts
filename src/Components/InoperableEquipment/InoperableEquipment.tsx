import { RuxContainer } from '@astrouxds/react';
import './InoperableEquipment.css';
import EquipmentIcons from '../EquipmentIcons/EqupimentIcons';
import { useAppContext } from '../../providers/AppProvider';
import { capitalize } from '../../utils';

type PropTypes = {
  selectEquipment: () => void;
};

const InoperableEquipment = ({ selectEquipment }: PropTypes) => {
  const { state }: any = useAppContext();

  return (
    <RuxContainer className='inoperable-equipment'>
      <div slot='header'>Inoperable Equipment</div>
      {Object.keys(state.equipmentByCategory).map((category, index) => (
        <RuxContainer className='section' key={`${category}${index}`}>
          <span>
            {category === 'rf' ? category.toUpperCase() : capitalize(category)}
          </span>

          {/* <div className='no-equipment'>No Inoperable Equipment</div> */}
          {Object.keys(state.equipmentByCategory[category]).map(
            (config, index) => (
              <EquipmentIcons
                key={`${config}${index}`}
                equipmentString={config}
                onClick={selectEquipment}
              />
            )
          )}
        </RuxContainer>
      ))}
    </RuxContainer>
  );
};

export default InoperableEquipment;
