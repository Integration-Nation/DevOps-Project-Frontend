
const endpoint = import.meta.env.VITE_ENDPOINT

async function getSearchResults(query: string, language: string = 'en') {
  const response = await fetch(`${endpoint}/api/search?q=${encodeURIComponent(query)}&language=${encodeURIComponent(language)}`);
  if (!response.ok) {
    throw new Error('Failed to fetch search results');
  }
  return response.json(); // Assuming the API returns a JSON object with 'search_results' key
}

export { getSearchResults };
