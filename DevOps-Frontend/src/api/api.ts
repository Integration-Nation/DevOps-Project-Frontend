import { handleHttpErrors } from "../security/FetchUtils";

const endpoint = import.meta.env.VITE_ENDPOINT;
const LOGIN_URL = `${endpoint}/api/login`;
const token = localStorage.getItem("token");

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export type User = { username: string; password: string; roles?: string[] };

export interface LoginResponse {
  username: string;
  token: string;
}

export interface Weather {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timeZone_abbreviation: string;
  elevation: number;
  current: Current;
  hourly: Hourly;
}

export interface Current {
  time: string;
  interval: number;
  temperature_2m: number;
}

export interface Hourly {
  time: string[];
  temperature_2m: number[];
}

async function getWeather(latitude: string, longitude: string) {
  const response = await fetch(
    `${endpoint}/api/weather?latitude=${latitude}&longitude=${longitude}`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weather");
  }

  return response.json(); // Assuming the API returns a JSON object
}

async function getSearchResults(query: string, language: string = "en") {
  const response = await fetch(
    `${endpoint}/api/search?q=${encodeURIComponent(
      query
    )}&language=${encodeURIComponent(language)}`,
    {
      method: "GET",
    }
  );

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

const authProvider = {
  isAuthenticated: false,
  signIn(user_: LoginRequest): Promise<LoginResponse> {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(user_),
    };

    return fetch(LOGIN_URL, options).then(handleHttpErrors);
  },
};

// log ud

async function logout() {
  const response = await fetch(`${endpoint}/api/logout`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to logout");
  }

  return response.json();
}
export {
  getSearchResults,
  registerUser,
  login,
  getWeather,
  logout,
  authProvider,
};
