import { RuxInput } from '@astrouxds/react';
import './Searchbar.css';
import { useCallback } from 'react';
import { setHhMmSs } from '../../utils';
import { useAppContext } from '../../providers/AppProvider';

type PropTypes = {
  searchValue: string;
  setSearchValue: (value: string) => void;
};

const SearchBar = ({ searchValue }: PropTypes) => {
  const { state, dispatch }: any = useAppContext();

  const searchKeys = [
    'contactAOS',
    'contactLOS',
    'contactDOY',
    'contactBeginTimestamp',
    'contactEndTimestamp',
    'contactEquipment',
    'contactGround',
    'contactName',
    'contactPriority',
    'contactREV',
    'contactSatellite',
    'contactState',
    'contactStatus',
  ];

  const search = useCallback(
    (searchValue: string) => {
      const equipment = [...state.equipment];
      const searchedContacts = equipment.filter((contact: any) => {
        let matchedValue = false;
        for (const key in contact) {
          if (searchKeys.includes(key)) {
            let currentValue = '';
            if (
              contact[key] === contact.contactBeginTimestamp ||
              contact[key] === contact.contactEndTimestamp ||
              contact[key] === contact.contactAOS ||
              contact[key] === contact.contactLOS
            ) {
              currentValue = setHhMmSs(contact[key]);
            } else if (contact[key]) {
              currentValue = contact[key].toString().toLowerCase();
            }
            if (currentValue.includes(searchValue)) matchedValue = true;
          }
        }
        return matchedValue;
      });
      dispatch({
        type: 'SEARCHED_CONTACTS',
        payload: { searchedContacts: searchedContacts },
      });
    },
    [dispatch, state.equipment]
  );

  return (
    <div className='search-bar-container'>
      <RuxInput
        type='search'
        placeholder='Search...'
        onRuxinput={(e) => search(e.target.value)}
        value={searchValue}
      />
    </div>
  );
};

export default SearchBar;
