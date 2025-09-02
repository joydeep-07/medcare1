import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { toast } from "sonner";
import Loader from "./Loader";

const ProtectedUserRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast.error("You need to log in to access this page.");
      navigate("/user-login", {
        replace: true,
        state: { from: location },
      });
    }
  }, [isAuthenticated, isLoading, navigate, location]);

  if (isLoading) {
    return <Loader />;
  }

  return isAuthenticated ? children : null;
};

export default ProtectedUserRoute;
