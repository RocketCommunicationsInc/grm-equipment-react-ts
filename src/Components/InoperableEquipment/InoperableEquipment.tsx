import { RuxContainer, RuxMonitoringIcon } from '@astrouxds/react';
import { useAppContext } from '../../providers/AppProvider';
import './InoperableEquipment.css';
import { Equipment } from '../../Types/Equipment';

const InoperableEquipment = () => {
  const { state, dispatch }: any = useAppContext();

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

  const handleSelectedEquipment = (equipment: Equipment) => {
    dispatch({ type: 'CURRENT_EQUIPMENT', payload: equipment });
  };
  return (
    <RuxContainer className='inoperable-equipment'>
      <div slot='header'>Inoperable Equipment</div>
      <RuxContainer className='section'>
        <span>Comms ({comms.length})</span>
        <ul>
          {comms.map((equipment: Equipment, index: number) => (
            <li key={index}>
              <RuxMonitoringIcon
                status={equipment.status}
                icon='center-focus-weak'
                label={equipment.name}
                onClick={() => handleSelectedEquipment(equipment)}
              />
            </li>
          ))}
        </ul>
      </RuxContainer>
      <RuxContainer className='section'>
        <span>Digital ({digital.length})</span>
        <ul>
          {digital.map((equipment: Equipment, index: number) => (
            <li key={index}>
              <RuxMonitoringIcon
                status={equipment.status}
                icon='center-focus-weak'
                label={equipment.name}
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
            <li key={index}>
              <RuxMonitoringIcon
                status={equipment.status}
                icon='center-focus-weak'
                label={equipment.name}
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
            <li key={index}>
              <RuxMonitoringIcon
                status={equipment.status}
                icon='center-focus-weak'
                label={equipment.name}
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
