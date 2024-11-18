import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void; // Prop para manejar la búsqueda
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(query); // Ejecuta la búsqueda con el texto ingresado
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(); // Ejecuta la búsqueda si se presiona "Enter"
    }
  };

  return (
    <div className="search-bar d-flex">
      <input
        type="text"
        className="form-control"
        placeholder="Search cocktails..."
        value={query}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <button className="btn btn-primary ms-2" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
