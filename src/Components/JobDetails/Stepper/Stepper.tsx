import { RuxIcon } from '@astrouxds/react';
import './Stepper.css';

const Stepper = () => {
  const steps = [
    { title: 'Submitted' },
    { title: 'Approved' },
    { title: 'Started' },
    { title: 'Stopped' },
    { title: 'Online' },
  ];

  return (
    <div className='stepper-wrapper'>
      {steps.map(({ title }, index) => (
        <div className='stepper-item' key={index}>
          <div className='step-counter'>
            <RuxIcon className='checkmark' icon='check' size='1.5rem' />
          </div>
          <div className='step-title'>{title}</div>
        </div>
      ))}
    </div>
  );
};

export default Stepper;
