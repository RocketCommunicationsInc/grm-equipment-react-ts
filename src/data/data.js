import { getDayOfYear } from '../util/date';
import { randInt, randomIndex } from '../util/util';
import contacts from './contacts.json';
import { options } from './options';

export const randomContact = () => contacts[randInt(0, contacts.length - 1)];

let lastAlertId = 1;
const alertBlueprints = contacts.reduce((alerts, contact) => {
  return alerts.concat(contact.alerts);
}, []);

export function getRandomAlert() {
  const bp = alertBlueprints[randInt(0, alertBlueprints.length - 1)];
  const alert = Object.assign({}, bp);
  alert.errorId = lastAlertId++;
  return alert;
}

let lastContactId = 1;
export function getRandomContact() {
  const bp = randomContact();
  const contact = Object.assign({}, bp);
  delete contact.alerts;
  contact.contactId = lastContactId++;
  return {
    ...contact,
    contactBeginTimestamp: contact.contactBeginTimestamp * 1000,
    contactEndTimestamp: contact.contactEndTimestamp * 1000,
    contactDOY: getDayOfYear(contact.contactBeginTimestamp * 1000),
    contactEquipmentConfig: `Config ${randInt(1, 5)}`,
    contactAOS: contact.contactBeginTimestamp * 1000,
    contactLOS: contact.contactEndTimestamp * 1000,
    contactMode: options.modes[randomIndex(options.modes)],
    contactPriority: options.priorities[randomIndex(options.priorities)],
    contactREV: randInt(1, 9999).toString().padStart(4, '0'),
  };
}

export function generateEvents() {
  return contacts.slice(0, randInt(10, 100)).map((c) => ({
    timestamp: c.contactBeginTimestamp * 1000,
    status: c.status,
    message: c.contactDetail,
  }));
}

export const dummyJob = {
  jobId: 76029,
  jobType: 'IT Support',
  description: 'Updates needed on all desktop computers in main building',
  startTime: '2023-06-08T16:31',
  stopTime: '2023-09-08T18:31',
  technician: 'M. Scott',
  follow: true,
  status: 'Approved',
  createdOn: '2023-06-06T11:42',
  equpiment: 'ANT7',
};
