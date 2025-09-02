import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layouts and Pages
import Root from "./Layouts/Root";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import UserLogin from "./pages/UserLogin";
import AdminPanel from "./pages/AdminPanel";
import AdminLogin from "./pages/AdminLogin";
import Appointments from "./pages/Appoinments";
import ContactDetails from "./pages/ContactDetails";
import YourAppointments from "./pages/YourAppointments";
import Dashboard from "./pages/Dashboard";

// Context Providers
import { CartProvider } from "./context/cartContext";
import { AdminProvider } from "./context/AdminContext";
import { UserProvider } from "./context/UserContext";

// Components
import PreLoader from "./Components/PreLoader";
import ProtectedRoute from "./Components/ProtectedRoute";
import ProtectedUserRoute from "./Components/ProtectedUserRoute";
import ScrollToTop from "./Components/ScrollToTop";

// Global Toast Notifications
import { Toaster } from "sonner";
import AllDoctors from "./pages/AllDoctors";
import DoctorsForm from "./Components/DoctorsForm";
import ForgotPassword from "./pages/ForgotPassword";
import UserRegister from "./pages/UserRegister";
import NoInternet from "./pages/NoInternet";

function App() {
  const [initialLoading, setInitialLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 2500);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      clearTimeout(timer);
    };
  }, []);

  if (initialLoading) {
    return <PreLoader />;
  }

  if (!isOnline) {
    return <NoInternet />;
  }

  return (
    <Router>
      <ScrollToTop />
      <AdminProvider>
        <UserProvider>
          <CartProvider>
            <Routes>
              <Route path="/" element={<Root />}>
                {/* Public routes */}
                <Route index element={<Home />} />
                <Route path="user-login" element={<UserLogin />} />
                <Route path="register" element={<UserRegister />} />
                <Route path="admin" element={<AdminLogin />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />

                {/* User routes */}
                <Route path="medshop" element={<Shop />} />
                <Route path="cart" element={<Cart />} />
                <Route path="checkout" element={<Checkout />} />
                <Route
                  path="your-appointments"
                  element={<YourAppointments />}
                />

                {/* Protected user routes */}
                <Route element={<ProtectedUserRoute />}>
                  <Route path="about" element={<About />} />
                  <Route path="contact" element={<Contact />} />
                </Route>

                {/* Admin routes */}
                <Route element={<ProtectedRoute />}>
                  <Route path="admin-panel" element={<AdminPanel />} />
                  <Route path="contact-details" element={<ContactDetails />} />
                  <Route path="appointments" element={<Appointments />} />
                  <Route path="all-doctors" element={<AllDoctors />} />
                  <Route path="add-doctors" element={<DoctorsForm />} />
                  <Route path="dashboard" element={<Dashboard />} />
                </Route>
              </Route>
            </Routes>
          </CartProvider>
        </UserProvider>
      </AdminProvider>
      <Toaster richColors position="top-right" />
    </Router>
  );
}

export default App;
