import React from "react";

const PokemonModal = ({ pokemon, onClose }) => {
  if (!pokemon) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-btn" onClick={onClose}>
          X
        </button>
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="modal-image"
        />
        <h2 className="modal-title">
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </h2>
        <div className="modal-section">
          <h3>Types</h3>
          <div className="type-wrapper">
            {pokemon.types.map((t) => (
              <span key={t.type.name} className="type-badge">
                {t.type.name}
              </span>
            ))}
          </div>
        </div>
        <div className="modal-section">
          <h3>Abilities</h3>
          <ul>
            {pokemon.abilities.map((ability) => (
              <li key={ability.ability.name}>{ability.ability.name}</li>
            ))}
          </ul>
        </div>

        <div className="modal-section">
          <h3>Stats</h3>
          <ul>
            {pokemon.stats.map((stat) => (
              <li key={stat.stat.name}>
                <strong>{stat.stat.name}</strong>: {stat.base_stat}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PokemonModal;
