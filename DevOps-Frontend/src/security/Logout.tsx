import { useAuth } from "./AuthProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    auth.signOut();
    alert("You have been logged out successfully."); // Besked om, at brugeren er blevet logget ud
    navigate("/", { replace: true }); // Omdiriger til forsiden efter logud
  }, [auth, navigate]);

  return null; // Returner ingenting, da vi allerede håndterer alt i useEffect
}
