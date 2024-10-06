import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { IoSearchOutline } from 'react-icons/io5';
import css from './SearchBar.module.css';

const SearchBar = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(inputValue);
    setInputValue('');
  };

  return (
    <div className={css.searchBar}>
      <header>
        <form className={css.searchForm} onSubmit={handleSubmit}>
          <div className={css.inputWrapper}>
            <IoSearchOutline className={css.searchIcon} size={20} />
            <input
              className={css.searchFormInput}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              autoComplete="off"
              autoFocus
              placeholder="Search..."
            />
          </div>
        </form>
        <Toaster position="top-center" reverseOrder={false} />
      </header>
    </div>
  );
};

export default SearchBar;
