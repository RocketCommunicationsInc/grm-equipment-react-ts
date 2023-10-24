import { RuxMonitoringIcon } from '@astrouxds/react';

import './EquipmentIcons.css';

type PropTypes = {
  name: string;
  onClick: () => void;
};

const EquipmentIcons = ({ name, onClick }: PropTypes) => {
  return (
    <div className='equipment-icons'>
      {name.split(' ').map((equipmentSubString: string) => (
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
