import { useState } from 'react';
import { LoginRequest, login } from '../api/api.ts';


export default function LoginPage() {

      const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState<string  | null>(null);

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

     try {
      const loginObject: LoginRequest = {
        username: formData.username,
        password: formData.password,
      };

      const response = await login(loginObject);
      alert(response.message);

      //TODO redirect to login page
      
    
} catch (err: unknown) {
    // Check if the error is an instance of Error
    if (err instanceof Error) {
      setError(err.message); // Safely access the message property
    } else {
      setError("An unknown error occurred");
    }
}}
    return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
      {error && (
        <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">
          <strong>Error:</strong> {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Username"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Password"
          />
        </div>
                <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
}