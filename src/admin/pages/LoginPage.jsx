import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { Lock } from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (login(username, password)) {
      navigate("/admin");
    } else {
      setError("Username atau password salah!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8">
        <div className="text-center mb-6">
          <div className="mx-auto w-14 h-14 bg-sky-100 rounded-full flex items-center justify-center mb-3">
            <Lock size={24} className="text-sky-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Admin Login</h1>
          <p className="text-sm text-gray-500 mt-1">
            PT Adinata Sentra Teknika
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full border rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
              placeholder="Masukkan username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
              placeholder="Masukkan password"
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center bg-red-50 py-2 rounded-lg">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-sky-600 text-white py-2.5 rounded-lg font-medium hover:bg-sky-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
