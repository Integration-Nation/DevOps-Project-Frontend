import { useState } from 'react';
import { LoginRequest, login, LoginResponse } from '../api/api.ts';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../security/AuthProvider.tsx';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth(); // Brug auth hook fra AuthProvider

  // Hvis brugeren allerede er logget ind, omdiriger til forsiden
  if (auth.isLoggedIn()) {
    navigate("/", { replace: true });
    return null; // Returner null for at forhindre yderligere rendering
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const loginObject: LoginRequest = {
        username: formData.username,
        password: formData.password,
      };

      // Kald login API og få response (inkl. token og username)
      const response: LoginResponse = await login(loginObject);

      // Brug auth.signIn til at håndtere brugerens data og gemme token
      await auth.signIn(response);

      // Efter succesfuldt login, omdiriger brugeren til den ønskede side
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">Log Ind</h2>
      {error && (
        <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">
          <strong>Fejl:</strong> {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Brugernavn
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Brugernavn"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Adgangskode
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Adgangskode"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Log Ind
          </button>
        </div>
      </form>
    </div>
  );
}
