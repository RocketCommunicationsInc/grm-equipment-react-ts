import { useState } from 'react';
import ContactsTable from './ContactsTable';
import SearchBar from '../../common/SearchBar/SearchBar';

const ContactsTablePage = () => {
  const [searchValue, setSearchValue] = useState<string>('');

  return (
    <>
      <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
      <ContactsTable
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
    </>
  );
};

export default ContactsTablePage;
