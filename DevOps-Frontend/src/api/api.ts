const endpoint = import.meta.env.VITE_ENDPOINT;

export interface RegisterRequest {
username: string,
email: string,
password: string,

}

export interface LoginRequest {
  username: string,
  password: string
}
async function getSearchResults(query: string, language: string = "en") {
  const response = await fetch(`${endpoint}/api/search?q=${encodeURIComponent(query)}&language=${encodeURIComponent(language)}`, {
    method: "GET", 
  });

  if (!response.ok) {
    throw new Error("Failed to fetch search results");
  }

  return response.json(); // Assuming the API returns a JSON object
}

//register users
async function registerUser(registerRequest: RegisterRequest) {
  const response = await fetch(`${endpoint}/api/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerRequest),
    
  });

  if (!response.ok) {
    throw new Error("Failed to fetch register user");
  }

  return response.json();
}

async function login(loginRequest: LoginRequest) {
  const response = await fetch(`${endpoint}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginRequest),
    
  });

  if (!response.ok) {
    throw new Error("Failed to login");
  }

  return response.json();
}

export { getSearchResults, registerUser, login };