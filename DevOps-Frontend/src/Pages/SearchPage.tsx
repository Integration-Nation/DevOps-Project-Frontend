import React, { useEffect, useState } from 'react';
import SearchComponent from '../Components/SearchComponent';
import { getSearchResults } from '../api/api';

interface SearchResult {
  url: string;
  title: string;
  description: string;
}

function SearchPage() {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    // Only fetch results if there is a query
    if (query) {
      getSearchResults(query)
        .then((response) => {
          if (response && response.search_results) {
            setSearchResults(response.search_results); // Correctly extract the 'search_results' field
          } else {
            setSearchResults([]); // Handle the case where no results are found
          }
        })
        .catch((error) => {
          console.error('Error fetching search results:', error);
          setSearchResults([]); // Clear results if there's an error
        });
    } else {
      setSearchResults([]); // Clear results if query is empty
    }
  }, [query]);

  function handleSearch(searchQuery: string) {
    setQuery(searchQuery); // Update the query to trigger the fetch
  }

  return (
    <div>
      <h1>Search Page</h1>
      <SearchComponent searchResults={searchResults} onSearch={handleSearch} />
    </div>
  );
}

export default SearchPage;
