import { RuxLog } from '@astrouxds/react';
import { memo } from 'react';
import { generateEvents } from '../../data/data';
import { setHhMmSs } from '../../utils';
import './EventLog.css';

export const EventLog = memo(() => {
  const events = generateEvents();

  const filter = ''.toLowerCase();
  const filteredEventLogs = events.filter(
    (event: { message: string; timestamp: string | number }) => {
      return (
        (event.message && event.message.toLowerCase().includes(filter)) ||
        (event.timestamp &&
          setHhMmSs(event.timestamp).toString().includes(filter))
      );
    }
  );

  return (
    <div className='log-wrapper'>
      <RuxLog
        data={filteredEventLogs.map(
          (event: {
            message: string;
            timestamp: string | number | Date;
            status: any;
          }) => {
            const message =
              event.message.length < 62
                ? event.message
                : event.message.slice(0, 62) + '...';
            return {
              timestamp: new Date(event.timestamp),
              status: event.status,
              message: message,
            };
          }
        )}
        filter={filter}
      />
    </div>
  );
});
