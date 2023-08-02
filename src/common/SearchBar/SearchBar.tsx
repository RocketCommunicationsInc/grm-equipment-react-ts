import { RuxInput } from '@astrouxds/react';
import './Searchbar.css';

type PropTypes = {
  searchValue: string;
  setSearchValue: (value: string) => void;
};

const SearchBar = ({ searchValue, setSearchValue }: PropTypes) => {
  return (
    <div className='search-bar-container'>
      <RuxInput
        type='search'
        placeholder='Search...'
        onRuxinput={(e) => setSearchValue(e.target.value)}
        value={searchValue}
      />
    </div>
  );
};

export default SearchBar;
