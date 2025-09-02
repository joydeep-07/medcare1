import React, { createContext, useState, useEffect, useContext } from "react";
export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });

  const loginAdmin = () => {
    localStorage.setItem("isAuthenticated", "true");
    setIsAdminAuthenticated(true);
  };


  const logoutAdmin = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAdminAuthenticated(false);
  };


  useEffect(() => {
    const checkAuthStatus = () => {
      setIsAdminAuthenticated(
        localStorage.getItem("isAuthenticated") === "true"
      );
    };

    window.addEventListener("storage", checkAuthStatus);

    return () => {
      window.removeEventListener("storage", checkAuthStatus);
    };
  }, []);

  return (
    <AdminContext.Provider
      value={{ isAdminAuthenticated, loginAdmin, logoutAdmin }}
    >
      {children}
    </AdminContext.Provider>
  );
};
