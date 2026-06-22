import { createContext, useContext, useState } from "react";
import { STORAGE_KEYS, ADMIN_CREDENTIALS } from "../utils/constants";
import { getData, setData, removeData } from "../utils/storage";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = getData(STORAGE_KEYS.auth, null);
    if (stored && stored.loggedIn) return stored;
    return null;
  });

  const login = (username, password) => {
    if (
      username === ADMIN_CREDENTIALS.username &&
      password === ADMIN_CREDENTIALS.password
    ) {
      const session = { username, loggedIn: true, timestamp: Date.now() };
      setData(STORAGE_KEYS.auth, session);
      setUser(session);
      return true;
    }
    return false;
  };

  const logout = () => {
    removeData(STORAGE_KEYS.auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
