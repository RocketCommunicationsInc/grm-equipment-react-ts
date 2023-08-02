import { RuxMonitoringIcon } from '@astrouxds/react';

import './EquipmentIcons.css';

type PropTypes = {
  equipmentString: string;
};

const EquipmentIcons = ({ equipmentString }: PropTypes) => {
  return (
    <div className='equipment-icons'>
      {equipmentString.split(' ').map((equipmentSubString: string) => (
        <RuxMonitoringIcon
          key={equipmentSubString}
          status='normal'
          icon='center-focus-weak'
          label={equipmentSubString}
        />
      ))}
    </div>
  );
};

export default EquipmentIcons;
