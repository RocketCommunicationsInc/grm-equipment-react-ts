import { getDayOfYear } from '../utils';
import { getRandomInt, randomIndex } from '../utils';
import contacts from './contacts.json';
import equipment from './equipment.json';
import { options } from './options';

export const randomContact = () =>
  contacts[getRandomInt(0, contacts.length - 1)];

let lastAlertId = 1;
const alertBlueprints = contacts.reduce((alerts, contact) => {
  return alerts.concat(contact.alerts);
}, []);

export function getRandomAlert() {
  const bp = alertBlueprints[getRandomInt(0, alertBlueprints.length - 1)];
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
    contactEquipmentConfig: `Config ${getRandomInt(1, 5)}`,
    contactAOS: contact.contactBeginTimestamp * 1000,
    contactLOS: contact.contactEndTimestamp * 1000,
    contactMode: options.modes[randomIndex(options.modes)],
    contactPriority: options.priorities[randomIndex(options.priorities)],
    contactREV: getRandomInt(1, 9999).toString().padStart(4, '0'),
  };
}

export function generateEvents() {
  return contacts.slice(0, getRandomInt(10, 100)).map((c) => ({
    timestamp: c.contactBeginTimestamp * 1000,
    status: c.status,
    message: c.contactDetail,
  }));
}

export const equipmentArr = equipment.map((equipment) => equipment);

export const scehduledJobs = equipment.flatMap(
  (equipment) => equipment.scehduledJobs
);

export const equpimentByCategory = {};
equipment.forEach((item) => {
  const category = item.category;
  const config = item.config;
  if (!equpimentByCategory[category]) {
    equpimentByCategory[category] = [];
  }
  if (!equpimentByCategory[category][config]) {
    equpimentByCategory[category][config] = [];
  }
  equpimentByCategory[category][config].push(item);
  item = equpimentByCategory;
});
