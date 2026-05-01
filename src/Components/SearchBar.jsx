import React from "react";

const SearchBar = ({ searchText, handleSearch }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search Pokemon..."
        value={searchText}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
