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
      {Object.keys(state.equpimentByCategory).map((category) => (
        <>
          <RuxContainer className='section'>
            <span>
              {category === 'rf'
                ? category.toUpperCase()
                : capitalize(category)}
            </span>

            {/* <div className='no-equipment'>No Inoperable Equipment</div> */}
            {Object.keys(state.equpimentByCategory[category]).map((config) => (
              <EquipmentIcons
                equipmentString={config}
                onClick={selectEquipment}
              />
            ))}
          </RuxContainer>
        </>
      ))}
    </RuxContainer>
  );
};

export default InoperableEquipment;

//         {/* {Object.values(state.equpimentByCategory).map((job: any) =>
//       job.map((val: any) => ( */}
//       <RuxContainer className='section'>
//       <span>Digital </span>
//       <EquipmentIcons
//         equipmentString={'SFEP19'}
//         onClick={selectEquipment}
//       />
//     </RuxContainer>
//     {/* ))
// )} */}
//     <RuxContainer className='section'>
//       <span>Facilities (#)</span>
//       <EquipmentIcons
//         equipmentString={'ECEU15'}
//         onClick={selectEquipment}
//       />
//     </RuxContainer>
//     <RuxContainer className='section'>
//       <span>RF (#)</span>
//       <EquipmentIcons
//         equipmentString={'RVC14'}
//         onClick={selectEquipment}
//       />
//     </RuxContainer>
//   </>
