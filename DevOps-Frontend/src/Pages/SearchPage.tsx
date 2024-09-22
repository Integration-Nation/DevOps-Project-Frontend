import { useEffect, useState } from "react";
import SearchComponent from "../Components/SearchComponent";
import { getSearchResults } from "../api/api.ts";

interface SearchResult {
  url: string;
  title: string;
  description: string;
}

function SearchPage() {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [query, setQuery] = useState<string>("");

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
          console.error("Error fetching search results:", error);
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
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-gray-50 flex flex-col items-center p-8">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-8">
        <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-6">Search the Web</h1>
        {/* Pass search results rendering responsibility to SearchComponent */}
        <SearchComponent searchResults={searchResults} onSearch={handleSearch} />
      </div>
    </div>
  );
}

export default SearchPage;
