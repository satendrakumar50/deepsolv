import React from "react";

const PokemonCard = ({
  poke,
  favorites,
  toggleFavorite,
  setSelectedPokemon,
}) => {
  const isFavorite = favorites.includes(poke.id);
  return (
    <div className="pokemon-card" onClick={() => setSelectedPokemon(poke)}>
      <button
        className="favorite-btn"
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(poke.id);
        }}
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>
      <img
        src={poke.sprites.front_default}
        alt={poke.name}
        className="pokemon-image"
      />
      <h3 className="pokemon-name">
        {poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}
      </h3>
      <div className="type-wrapper">
        {poke.types.map((t) => (
          <span key={t.type.name} className="type-badge">
            {t.type.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;
