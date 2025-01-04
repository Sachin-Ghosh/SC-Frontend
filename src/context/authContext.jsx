import { createContext, useContext, useState, useEffect } from 'react';
import { setCookie, removeCookie, getCookie } from '@/utils/myCookie';
import { useNavigate } from 'react-router-dom';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [authUser, setAuthUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the authentication token exists in the cookie
    const storedToken = localStorage.getItem("token");
    const storedAuthUser = getCookie("authUser");

    if (storedToken && storedAuthUser) {
      setToken(storedToken);
      setAuthUser(JSON.parse(storedAuthUser));
    }
  }, []);

  const login = (value) => {
    setToken(value.token);
    setAuthUser(value.user || value); // Adjust based on your API response structure

    setCookie("authUser", JSON.stringify(value.user || value));
    setCookie("token", value.token);
  };

  const logout = () => {
    setToken(null);
    setAuthUser(null);
    removeCookie("token");
    removeCookie("authUser");
    localStorage.clear();
    navigate("/");
  };

  const value = {
    token,
    authUser,
    login,
    logout,
    setToken,
    setAuthUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);