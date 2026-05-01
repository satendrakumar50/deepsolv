// import React from "react";

// const pokemonTypes = [
//   "all",
//   "grass",
//   "fire",
//   "water",
//   "bug",
//   "normal",
//   "electric",
//   "poison",
// ];

// function filterData(searchText, allPokemon) {
//   return allPokemon.filter((pokemon) =>
//     pokemon.name
//       .toLowerCase()
//       .includes(searchText.toLowerCase())
//   );
// }

// const Pokemon = ({
//   pokemon,
//   filteredPokemon,
//   setFilteredPokemon,
//   selectedType,
//   setSelectedType,
//   searchText,
//   setSearchText,
//   filteredRestaurants,
//   setFilteredRestaurants,
// }) => {

//   const handleFilter = (type) => {
//     setSelectedType(type);

//     if (type === "all") {
//       setFilteredPokemon(pokemon);
//       return;
//     }

//     const filtered = pokemon.filter((poke) =>
//       poke.types.some((t) => t.type.name === type)
//     );

//     setFilteredPokemon(filtered);
//   };

//   return (
//     <div className="container">

//       {/* Title */}
//       <h1 className="title">
//         Pokemon List ({filteredPokemon.length})
//       </h1>

//       {/* Search */}
//       <div className="search-container">

//         <input
//           type="text"
//           placeholder="Search Here"
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//         />

//         <button
//           onClick={() => {
//             const data = filterData(searchText, pokemon);
//             setFilteredRestaurants(data);
//           }}
//         >
//           Search
//         </button>

//       </div>

//       {/* Search Result */}
//       <h2>Search Pokemon</h2>

//       <div className="pokemon-grid">
//         {filteredRestaurants &&
//           filteredRestaurants.map((restaurant) => (
//             <div
//               key={restaurant.id}
//               className="pokemon-card"
//             >
//               <img
//                 src={restaurant.sprites.front_default}
//                 alt={restaurant.name}
//                 className="pokemon-image"
//               />

//               <h3 className="pokemon-name">
//                 {restaurant.name}
//               </h3>
//             </div>
//           ))}
//       </div>

//       {/* Filter Buttons */}
//       <div className="filter-container">
//         {pokemonTypes.map((type) => (
//           <button
//             key={type}
//             className={`filter-btn ${
//               selectedType === type ? "active" : ""
//             }`}
//             onClick={() => handleFilter(type)}
//           >
//             {type}
//           </button>
//         ))}
//       </div>

//       {/* Pokemon Grid */}
//       <div className="pokemon-grid">
//         {filteredPokemon &&
//           filteredPokemon.map((poke) => (
//             <div
//               key={poke.id}
//               className="pokemon-card"
//             >
//               <img
//                 src={poke.sprites.front_default}
//                 alt={poke.name}
//                 className="pokemon-image"
//               />

//               <h3 className="pokemon-name">
//                 {poke.name.charAt(0).toUpperCase() +
//                   poke.name.slice(1)}
//               </h3>

//               <div className="type-wrapper">
//                 {poke.types.map((t) => (
//                   <span
//                     key={t.type.name}
//                     className="type-badge"
//                   >
//                     {t.type.name}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           ))}
//       </div>

//     </div>
//   );
// };

// export default Pokemon;



import React from "react";

const pokemonTypes = [
  "all",
  "grass",
  "fire",
  "water",
  "bug",
  "normal",
  "electric",
  "poison",
  "ground",
];

function filterData(searchText, allPokemon) {
  return allPokemon.filter((pokemon) =>
    pokemon.name
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );
}

const PokemonCard = ({ poke }) => {
  return (
    <div className="pokemon-card">
      <img
        src={poke.sprites.front_default}
        alt={poke.name}
        className="pokemon-image"
      />

      <h3 className="pokemon-name">
        {poke.name.charAt(0).toUpperCase() +
          poke.name.slice(1)}
      </h3>

      <div className="type-wrapper">
        {poke.types.map((t) => (
          <span
            key={t.type.name}
            className="type-badge"
          >
            {t.type.name}
          </span>
        ))}
      </div>
    </div>
  );
};

const Pokemon = ({
  pokemon,
  filteredPokemon,
  setFilteredPokemon,
  selectedType,
  setSelectedType,
  searchText,
  setSearchText,
  filteredRestaurants,
  setFilteredRestaurants,
}) => {

  const handleFilter = (type) => {
    setSelectedType(type);

    if (type === "all") {
      setFilteredPokemon(pokemon);
      return;
    }

    const filtered = pokemon.filter((poke) =>
      poke.types.some((t) => t.type.name === type)
    );

    setFilteredPokemon(filtered);
  };

  return (
    <>
    <div className="container">

      {/* Title */}
      <h1 className="title">
        Pokemon List ({filteredPokemon.length})
      </h1>

      {/* Search */}
      <div className="search-container">

        <input
          type="text"
          placeholder="Search Pokemon..."
          value={searchText}
          onChange={(e) =>
            setSearchText(e.target.value)
          }
        />

        <button
          onClick={() => {
            const data = filterData(
              searchText,
              pokemon
            );

            setFilteredRestaurants(data);
          }}
        >
          Search
        </button>

      </div>

      {/* Search Result */}
      {filteredRestaurants.length > 0 && (
        <>
          <h2 className="search-title">
            Search Result
          </h2>

          <div className="pokemon-grid">
            {filteredRestaurants.map((restaurant) => (
              <PokemonCard
                key={restaurant.id}
                poke={restaurant}
              />
            ))}
          </div>
        </>
      )}

      {/* Filter Buttons */}
      <div className="filter-container">
        {pokemonTypes.map((type) => (
          <button
            key={type}
            className={`filter-btn ${
              selectedType === type
                ? "active"
                : ""
            }`}
            onClick={() =>
              handleFilter(type)
            }
          >
            {type}
          </button>
        ))}
      </div>

      {/* Pokemon Grid */}
      <div className="pokemon-grid">
        {filteredPokemon.map((poke) => (
          <PokemonCard
            key={poke.id}
            poke={poke}
          />
        ))}
      </div>

    </div>
</>
  );
};

export default Pokemon;