import React from "react";
import './Search.css';

const Search = props => (
  <form className="search-form" onSubmit={e => e.preventDefault()}>
    <input
      type="text"
      id="input"
      className="search-form__input"
      onChange={props.onSearchLocation}
      value={props.searchQuery}
      required
    />
    <label htmlFor="input" className="search-form__label">
      Search by name or category
    </label>
  </form>
);

export default Search;
