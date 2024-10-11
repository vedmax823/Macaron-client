import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import apiPublic from "../http/apiPublic";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { MAIN_ROUTE } from "../routes/routesConsts";




const LoginPage = () => {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await apiPublic.post(
        "/api/auth/login",
        { login, password },
      );
      console.log(response)
      const { accessToken } = response.data;
      console.log(accessToken)
      try {
        const user : UserJwt = jwtDecode(accessToken);
        setUser(user);
        navigate(MAIN_ROUTE);
        
        // Return decoded data
      } catch (err) {
        console.error('Token verification failed:', err);
        return null; // or handle error appropriately
      }

      setToken(accessToken); // Зберігаємо JWT токен у Zustand
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Invalid login or password");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen moving-gradient">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-sm w-full">
        <h1 className="text-3xl font-bold text-indigo-600 mb-4">
          Don Macaron Admin
        </h1>
        <input
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
          placeholder="Login"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
          placeholder="Password"
        />
        {error && <p>{error}</p>}
        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-semibold shadow-md hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
