import { RuxContainer, RuxMonitoringIcon } from '@astrouxds/react';
import { useAppContext } from '../../providers/AppProvider';
import './InoperableEquipment.css';
import { Equipment } from '../../Types/Equipment';

type PropTypes = {
  handleSelectedEquipment: (equipment: Equipment) => void;
};

const InoperableEquipment = ({ handleSelectedEquipment }: PropTypes) => {
  const { state }: any = useAppContext();

  const category = state.equipment.map((equip: string) => equip);

  const digital = category.filter(
    (category: any) => category.category === 'digital'
  );

  const facilities = category.filter(
    (category: any) => category.category === 'facilities'
  );

  const comms = category.filter(
    (category: any) => category.category === 'comms'
  );

  const RF = category.filter((category: any) => category.category === 'rf');

  return (
    <RuxContainer className='inoperable-equipment'>
      <div slot='header'>Inoperable Equipment</div>
      <RuxContainer className='section'>
        <span>Digital ({digital.length})</span>
        <ul>
          {digital.map((equipment: Equipment, index: number) => (
            <li key={equipment.id + equipment.config}>
              <RuxMonitoringIcon
                status='normal'
                icon='center-focus-weak'
                label={equipment.equipmentString}
                onClick={() => handleSelectedEquipment(equipment)}
              />
            </li>
          ))}
        </ul>
      </RuxContainer>
      <RuxContainer className='section'>
        <span>Facilities ({facilities.length})</span>
        <ul>
          {facilities.map((equipment: Equipment, index: number) => (
            <li key={equipment.id + equipment.category}>
              <RuxMonitoringIcon
                status='normal'
                icon='center-focus-weak'
                label={equipment.equipmentString}
                onClick={() => handleSelectedEquipment(equipment)}
              />
            </li>
          ))}
        </ul>
      </RuxContainer>
      <RuxContainer className='section'>
        <span>Comms ({comms.length})</span>
        <ul>
          {comms.map((equipment: Equipment, index: number) => (
            <li key={equipment.id + equipment.equipmentString}>
              <RuxMonitoringIcon
                status='normal'
                icon='center-focus-weak'
                label={equipment.equipmentString}
                onClick={() => handleSelectedEquipment(equipment)}
              />
            </li>
          ))}
        </ul>
      </RuxContainer>
      <RuxContainer className='section'>
        <span>RF ({RF.length})</span>
        <ul>
          {RF.map((equipment: Equipment, index: number) => (
            <li key={equipment.id + equipment.status}>
              <RuxMonitoringIcon
                status='normal'
                icon='center-focus-weak'
                label={equipment.equipmentString}
                onClick={() => handleSelectedEquipment(equipment)}
              />
            </li>
          ))}
        </ul>
      </RuxContainer>
    </RuxContainer>
  );
};

export default InoperableEquipment;
