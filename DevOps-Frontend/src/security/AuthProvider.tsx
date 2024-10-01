import { createContext, useState, ReactNode, useContext } from "react";
import { LoginResponse } from "../api/api.ts"; // LoginResponse er korrekt her
// import { logout } from "../api/api.ts"; // logout er korrekt her

interface AuthContextType {
  username: string | null;
  signIn: (user: LoginResponse) => Promise<void>; // LoginResponse har token og username
  signOut: () => Promise<void>; // signOut skal nu returnere en Promise
  isLoggedIn: () => boolean;
  isLoggedInAs: (role: string[]) => boolean;
}

const AuthContext = createContext<AuthContextType>(null!);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const initialUsername = localStorage.getItem("username") || null;
  const [username, setUsername] = useState<string | null>(initialUsername);

  const signIn = async (user: LoginResponse) => {
    setUsername(user.username);
    localStorage.setItem("username", user.username);
    localStorage.setItem("token", user.token);
  };

//   const handleLogout = async () => {
  
//   try {
//     const response = await logout(); // Send token med i logout-anmodningen
//     // alert(response.message); // Viser besked om logout
//   } catch (err: unknown) {
//     if (err instanceof Error) {
//       alert(err.message);
//     } else {
//       alert("An unknown error occurred");
//     }
//   }
// };

  const signOut = async () => {
    // await handleLogout(); // Kald handleLogout for at håndtere API kaldet
    setUsername(null); // Ryd brugernavn
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("roles");
  };

  function isLoggedIn() {
    return username != null;
  }

  function isLoggedInAs(role: string[]) {
    const roles: Array<string> = JSON.parse(localStorage.getItem("roles") || "[]");
    return roles?.some((r) => role.includes(r)) || false;
  }

  const value = { username, isLoggedIn, isLoggedInAs, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
