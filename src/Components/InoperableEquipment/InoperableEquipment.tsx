import { RuxContainer, RuxMonitoringIcon } from '@astrouxds/react';
import './InoperableEquipment.css';
import { useAppContext } from '../../providers/AppProvider';

type PropTypes = {
  selectEquipment: (e: any) => void;
};

const InoperableEquipment = ({ selectEquipment }: PropTypes) => {
  const { state }: any = useAppContext();

  const category = state.equipment.map((equip: string) => equip);

  const digital = category
    .filter((category: any) => category.category === 'digital')
    .map((equip: any) => equip.equipmentString);

  const facilities = category
    .filter((category: any) => category.category === 'facilities')
    .map((equip: any) => equip.equipmentString);

  const comms = category
    .filter((category: any) => category.category === 'comms')
    .map((equip: any) => equip.equipmentString);

  const RF = category
    .filter((category: any) => category.category === 'rf')
    .map((equip: any) => equip.equipmentString);

  return (
    <RuxContainer className='inoperable-equipment'>
      <div slot='header'>Inoperable Equipment</div>
      <RuxContainer className='section'>
        <span>Digital</span>
        {/* <div className='no-equipment'>No Inoperable Equipment</div> */}
        <ul>
          {digital.map((equip: string, index: number) => (
            <li key={index}>
              <RuxMonitoringIcon
                key={`${equip}${index}`}
                status='normal'
                icon='center-focus-weak'
                label={equip}
                onClick={selectEquipment}
              />
            </li>
          ))}
        </ul>
      </RuxContainer>
      <RuxContainer className='section'>
        <span>Facilities</span>
        <ul>
          {facilities.map((equip: string, index: number) => (
            <li key={index}>
              <RuxMonitoringIcon
                key={`${equip}${index}`}
                status='normal'
                icon='center-focus-weak'
                label={equip}
                onClick={selectEquipment}
              />
            </li>
          ))}
        </ul>
      </RuxContainer>
      <RuxContainer className='section'>
        <span>Comms</span>
        <ul>
          {comms.map((equip: string, index: number) => (
            <li key={index}>
              <RuxMonitoringIcon
                key={`${equip}${index}`}
                status='normal'
                icon='center-focus-weak'
                label={equip}
                onClick={selectEquipment}
              />
            </li>
          ))}
        </ul>
      </RuxContainer>
      <RuxContainer className='section'>
        <span>RF</span>
        <ul>
          {RF.map((equip: string, index: number) => (
            <li key={index}>
              <RuxMonitoringIcon
                key={`${equip}${index}`}
                status='normal'
                icon='center-focus-weak'
                label={equip}
                onClick={selectEquipment}
              />
            </li>
          ))}
        </ul>
      </RuxContainer>
    </RuxContainer>
  );
};

export default InoperableEquipment;
