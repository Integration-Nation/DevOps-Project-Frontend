import React, { useEffect, useState } from 'react';

interface SearchResult {
  url: string;
  title: string;
  description: string;
}

interface SearchProps {
  searchResults: SearchResult[];
  onSearch: (query: string) => void; // Add onSearch to SearchProps
}

function SearchComponent({ searchResults, onSearch }: SearchProps) {
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    // Focus the input field when the component mounts
    const input = document.getElementById('search-input') as HTMLInputElement;
    if (input) {
      input.focus();
    }
  }, []);

  const handleSearch = () => {
    onSearch(query); // Call the onSearch function from props
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <div>
        <input
          id="search-input"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div id="results">
        {searchResults.map((result, index) => (
          <div key={index}>
            <h2>
              <a className="search-result-title" href={result.url}>
                {result.title}
              </a>
            </h2>
            <p className="search-result-description">{result.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchComponent;
