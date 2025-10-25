import React from 'react';
import { BUTTON_TEXT } from '../../../../constants';
import Button from '../../../../common/Button/Button';
import './SearchBar.css';

const SearchBar: React.FC = () => {
  return (
    <div className="search-bar-container">
        <input type="text" placeholder="Search" className="search-bar-input" />
        <Button buttonText={BUTTON_TEXT.SEARCH} type="button" className="main-button search-bar-button" />
    </div>
  )
};
export default SearchBar;
