import { useEffect, useMemo, useState } from "react";
import "./App.css";
import PokemonList from "./components/PokemonList";
import SearchBar from "./components/SearchBar";
import FilterButtons from "./components/FilterButtons";
import PokemonModal from "./components/PokemonModal";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const { isAuthenticated, isLoading, user, loginWithRedirect, logout } = useAuth0();

  console.log("wwwwwwwwwwwwwwwwww", isAuthenticated, isLoading, user);

  const limit = 10;
  const pokemonTypes = [
    "all",
    "grass",
    "fire",
    "water",
    "bug",
    "normal",
    "poison",
    "electric",
    "ground",
  ];

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const fetchApiData = async () => {
    if (loading) return;

    try {
      setLoading(true);
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
      );
      const data = await response.json();
      const pokemonData = await Promise.all(
        data.results.map(async (item) => {
          const res = await fetch(item.url);
          return res.json();
        }),
      );
      setPokemon((prev) => {
        const allPokemon = [...prev, ...pokemonData];
        const uniquePokemon = allPokemon.filter(
          (poke, index, self) =>
            index === self.findIndex((p) => p.id === poke.id),
        );
        return uniquePokemon;
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApiData();
  }, [offset]);
  useEffect(() => {
    const handleScroll = () => {
      if (loading) return;
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
      ) {
        setOffset((prev) => prev + limit);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading]);

  const filteredPokemon = useMemo(() => {
    return pokemon.filter((poke) => {
      const searchMatch = poke.name
        .toLowerCase()
        .includes(searchText.toLowerCase());
      const typeMatch =
        selectedType === "all"
          ? true
          : poke.types.some((t) => t.type.name === selectedType);

      return searchMatch && typeMatch;
    });
  }, [pokemon, searchText, selectedType]);

  const handleSearch = (text) => {
    setSearchText(text);
  };
  const handleFilter = (type) => {
    setSelectedType(type);
  };
  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      return [...prev, id];
    });
  };

    
  return (
    
    <div className="container">
      <button onClick={() => loginWithRedirect()}>Login</button>
      <h1 className="title">Pokemon List</h1>
      <SearchBar searchText={searchText} handleSearch={handleSearch} />
      <FilterButtons
        pokemonTypes={pokemonTypes}
        selectedType={selectedType}
        handleFilter={handleFilter}
      />

      <PokemonList
        filteredPokemon={filteredPokemon}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        setSelectedPokemon={setSelectedPokemon}
      />

      {loading && <h2 style={{ textAlign: "center" }}>Loading...</h2>}
      {selectedPokemon && (
        <PokemonModal
          pokemon={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
        />
      )}
    </div>
  );
 
}

export default App;
