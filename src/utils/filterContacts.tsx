import { Contact } from '@astrouxds/mock-data';
import { setHhMmSs } from '.';

export const filterContacts = (
  contactsArray: Contact[],
  searchValue: string
) => {
  const searchKeys = [
    'aos',
    'los',
    'dayOfYear',
    'beginTimestamp',
    'endTimestamp',
    'equipment',
    'ground',
    'name',
    'priority',
    'rev',
    'satellite',
    'state',
    'status',
  ];
  if (!searchValue) return contactsArray;
  const filteredForStateContacts = contactsArray.filter((contact) =>
    // eslint-disable-next-line array-callback-return
    searchKeys.some((key: string) => {
      const contactVal = contact[key as keyof typeof contact] as string;
      if (
        key === 'beginTimestamp' ||
        key === 'endTimestamp' ||
        key === 'los' ||
        key === 'aos'
      ) {
        return setHhMmSs(contactVal).toString().includes(searchValue);
      } else if (contactVal) {
        return contactVal
          .toString()
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      }
    })
  );
  return filteredForStateContacts || contactsArray;
};
