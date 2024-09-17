import React, { useEffect, useState } from 'react';

interface SearchResult {
  url: string;
  title: string;
  description: string;
}

interface SearchProps {
  searchResults: SearchResult[];
}

const SearchComponent: React.FC<SearchProps> = ({ searchResults }) => {
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    // Focus the input field when the component mounts
    const input = document.getElementById('search-input') as HTMLInputElement;
    if (input) {
      input.focus();
    }
  }, []);

  const handleSearch = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('q', query);
    window.location.href = url.toString(); // Redirect to the new URL with query
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
};

export default SearchComponent;
