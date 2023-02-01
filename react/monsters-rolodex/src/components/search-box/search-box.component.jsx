// import { Component } from 'react';

import './search-box.styles.css';

const SearchBox = ({ className, placeholder, onChangeHandler }) => {
  // const { className, placeholder, onChangeHandler } = props;

  return (
    <input
      className={className}
      type='search'
      placeholder={placeholder}
      onChange={onChangeHandler}
    />
  );
};

export default SearchBox;
