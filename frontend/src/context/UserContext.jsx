import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { endPoint } from "../api/endpoints";

const UserContext = createContext(null);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const checkAuthStatus = useCallback(async () => {
    console.log("checkAuthStatus: Starting...");
    setIsLoading(true);
    try {
      const token = localStorage.getItem("userToken");
      console.log("checkAuthStatus: Found token in localStorage?", !!token);

      if (token) {
        const response = await fetch(endPoint.verifyAuth, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        console.log(
          "checkAuthStatus: Backend verify response status:",
          response.status
        );

        if (response.ok) {
          const userData = await response.json();
          console.log("checkAuthStatus: Token verified, user data:", userData);
          setUser(userData);
        } else {
          console.warn(
            "checkAuthStatus: Token verification failed.",
            response.status,
            await response.text()
          );
          localStorage.removeItem("userToken");
          setUser(null);
          toast.error("Your session expired. Please log in again.");
        }
      } else {
        console.log("checkAuthStatus: No token found in localStorage.");
        setUser(null);
      }
    } catch (error) {
      console.error(
        "checkAuthStatus: Error during authentication check:",
        error
      );
      setUser(null);
      localStorage.removeItem("userToken");
      toast.error("Could not verify session. Please try logging in.");
    } finally {
      setIsLoading(false);
      console.log("checkAuthStatus: Finished.");
    }
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const login = useCallback(
    async (email, password) => {
      setIsLoading(true);
      try {
        const response = await fetch(endPoint.login, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Login failed");
        }

        localStorage.setItem("userToken", data.token);
        setUser(data.user);
        toast.success("Login successful!");
        const from = location.state?.from?.pathname || "/";
        navigate(from, { replace: true });
        return true;
      } catch (error) {
        console.error("Login error:", error);
        toast.error(
          error.message || "An unexpected error occurred during login."
        );
        setUser(null);
        localStorage.removeItem("userToken");
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [navigate, location]
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("userToken");
    toast.info("Logged out successfully");
    navigate("/user-login");
  }, [navigate]);

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
