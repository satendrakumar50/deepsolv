import React from "react";
import PokemonCard from "./PokemonCard";

const PokemonList = ({
  filteredPokemon,
  favorites,
  toggleFavorite,
  setSelectedPokemon,
}) => {
  return (
    <div className="pokemon-grid">
      {filteredPokemon.map((poke) => (
        <PokemonCard
          key={poke.id}
          poke={poke}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          setSelectedPokemon={setSelectedPokemon}
        />
      ))}
    </div>
  );
};

export default PokemonList;
