import { useAuth } from "./AuthProvider";
import { NavLink } from "react-router-dom";

export default function AuthStatus() {
  const auth = useAuth();

  return (
    <li className="flex items-center">
      {auth.isLoggedIn() ? (
        <div className="flex items-center">
          <button
            onClick={async () => {
              await auth.signOut(); // Venter på at signOut er færdig
              alert("You have been logged out."); // Valgfri besked ved logout
            }}
            className="mx-2 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          >
            Logout (Logged in as {auth.username})
          </button>
        </div>
      ) : (
        <NavLink to="/login">
          <button
            type="button"
            className="mx-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login
          </button>
        </NavLink>
      )}
    </li>
  );
}
