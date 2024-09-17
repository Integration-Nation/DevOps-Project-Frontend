import React, { useEffect, useState } from 'react';
import SearchComponent from '../Components/SearchComponent';

interface SearchResult {
  url: string;
  title: string;
  description: string;
}

const SearchPage: React.FC = () => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    // Simulating a search result fetch based on query (can be replaced by an actual API call)
    const simulateSearchResults = (searchQuery: string) => {
      if (searchQuery) {
        setSearchResults([
          { url: '/result1', title: `Result for ${searchQuery} 1`, description: `Description for ${searchQuery} 1` },
          { url: '/result2', title: `Result for ${searchQuery} 2`, description: `Description for ${searchQuery} 2` },
          { url: '/result3', title: `Result for ${searchQuery} 3`, description: `Description for ${searchQuery} 3` },
        ]);
      } else {
        setSearchResults([]);
      }
    };

    // Perform search when query is updated
    simulateSearchResults(query);
  }, [query]);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
  };

  return (
    <div>
      <h1>Search Page</h1>
      <SearchComponent searchResults={searchResults} onSearch={handleSearch} />
    </div>
  );
};

export default SearchPage;
