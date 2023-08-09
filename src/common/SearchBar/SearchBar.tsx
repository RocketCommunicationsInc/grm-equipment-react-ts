import { RuxInput } from '@astrouxds/react';
import './Searchbar.css';

type PropTypes = {
  searchValue: string;
  setSearchValue: (value: string) => void;
  placeholder: string;
};

const SearchBar = ({ searchValue, setSearchValue, placeholder }: PropTypes) => {
  return (
    <div className='search-bar-container'>
      <RuxInput
        type='search'
        placeholder={placeholder}
        onRuxinput={(e) => setSearchValue(e.target.value)}
        value={searchValue}
      />
    </div>
  );
};

export default SearchBar;
