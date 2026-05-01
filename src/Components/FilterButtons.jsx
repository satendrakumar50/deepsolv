import React from "react";

const FilterButtons = ({ pokemonTypes, selectedType, handleFilter }) => {
  return (
    <div className="filter-container">
      {pokemonTypes.map((type) => (
        <button
          key={type}
          onClick={() => handleFilter(type)}
          className={selectedType === type ? "active" : ""}
        >
          {type}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
