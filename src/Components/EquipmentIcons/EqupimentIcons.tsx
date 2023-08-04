import { RuxMonitoringIcon } from '@astrouxds/react';

import './EquipmentIcons.css';

type PropTypes = {
  equipmentString: string;
  onClick: () => void;
};

const EquipmentIcons = ({ equipmentString, onClick }: PropTypes) => {
  return (
    <div className='equipment-icons'>
      {equipmentString.split(' ').map((equipmentSubString: string) => (
        <RuxMonitoringIcon
          key={equipmentSubString}
          status='normal'
          icon='center-focus-weak'
          label={equipmentSubString}
          onClick={onClick}
        />
      ))}
    </div>
  );
};

export default EquipmentIcons;
