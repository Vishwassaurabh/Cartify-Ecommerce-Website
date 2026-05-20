import { createContext, useContext, useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { checkUserAuthStatusAPI } from "../apis/user/userAPI";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check Auth Status
  const { isError, isLoading, data, isSuccess } = useQuery({
    queryKey: ["checkAuth"],
    queryFn: checkUserAuthStatusAPI,
  });

  // Update Auth State
  useEffect(() => {
    if (isSuccess && data) {
      setIsAuthenticated(data.isAuthenticated);
    }
  }, [data, isSuccess]);

  // Login
  const login = () => {
    setIsAuthenticated(true);
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isError,
        isLoading,
        isSuccess,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook
export const useAuth = () => {
  return useContext(AuthContext);
};
