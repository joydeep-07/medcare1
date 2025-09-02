import React, { useState, useEffect } from "react";
import {
  FiEye,
  FiEyeOff,
  FiLoader,
  FiLock,
  FiMail,
  FiAlertCircle,
  FiMessageSquare,
} from "react-icons/fi";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import { useForm } from "react-hook-form";
import AuthImagePattern from "../Components/AuthImagePattern";
import AOS from "aos";
import "aos/dist/aos.css";
import { toast } from "sonner";
import { useUser } from "../context/UserContext";
// import { endPoint } from "../api/endpoints"; // Not directly used here, login from context handles it

const UserLogin = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the location object
  const { login } = useUser();
  const [isLoading, setIsLoading] = useState(false); // Local loading state for the form submission
  const [authError, setAuthError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out-quad",
      once: true,
      offset: 50,
      disable: "mobile",
    });
    AOS.refresh();
  }, []);

  const onSubmit = async (data) => {
    setAuthError(""); // Clear previous errors
    setIsLoading(true); // Start local loading indicator

    try {
      // Pass the current location's state to the login function if needed for redirection
      const from = location.state?.from?.pathname || "/";
      const success = await login(data.email, data.password, from); // Pass `from` if your context handles redirection

      // The context's `login` function now handles `toast.success` and navigation.
      // This `if (success)` block is primarily for local form cleanup if the context signals success.
      if (success) {
        reset(); // Clear form fields on successful login
        // No need to navigate here, as the context's login function handles it
        // based on the `from` state or defaults to "/".
        // The toast.success is also handled by the context.
      } else {
        // If login returns false, it means an error occurred and the context
        // likely already displayed a toast. Here, you can set a local error
        // for form-specific display if the context provides a message.
        // Example: If the context's login function returns `{ success: false, message: "Invalid credentials" }`
        // You would adjust your context's login to return the message.
        // For now, based on your context, an error thrown by fetch or a non-ok response
        // is caught, a toast is shown, and `false` is returned.
        // So `setAuthError` needs to get a message back.
        // Let's assume the context's login function returns { success: bool, message: string }
        // The updated UserContext already does this.
        setAuthError("Login failed. Please check your credentials."); // General message if context didn't provide specific
      }
    } catch (error) {
      console.error("Login attempt error caught in UserLogin.jsx:", error);
      // This catch block would primarily execute if the `login` function itself
      // throws an unexpected error *before* the API call or if something in the context's
      // logic unexpectedly throws.
      setAuthError(error.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false); // Stop local loading indicator
    }
  };

  return (
    <div className="mt-24 mb-10 flex items-center justify-center p-4">
      <div
        className="w-full max-w-[1550px] bg-white rounded-xl shadow-lg overflow-hidden lg:grid lg:grid-cols-2 min-h-[600px]"
        data-aos="fade-up"
        data-aos-delay="50"
      >
        {/* Left Side - Login Form */}
        <div
          className="flex flex-col justify-center items-center p-6 sm:p-12"
          data-aos="fade-up"
          data-aos-delay="150"
        >
          <div className="w-full max-w-md space-y-8">
            {/* Logo and Welcome Text */}
            <div
              className="text-center mb-8"
              data-aos="fade-up"
              data-aos-delay="250"
            >
              <div className="flex flex-col items-center gap-2 group">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                  <FiMessageSquare className="w-6 h-6 text-indigo-600" />
                </div>
                <h1 className="text-2xl font-bold mt-2 text-gray-800">
                  Welcome Back!
                </h1>
                <p className="text-gray-600">Sign in to your account</p>
              </div>
            </div>

            {authError && (
              <div
                className="p-4 mb-4 bg-red-50 text-red-700 rounded-lg flex items-center"
                data-aos="fade-up"
              >
                <FiAlertCircle className="mr-2" />
                {authError}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              {/* Email Field */}
              <div
                className="transition-all duration-300"
                data-aos="fade-up"
                data-aos-delay="350"
              >
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-medium mb-1"
                >
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    className={`block w-full pl-10 pr-3 py-2 border-b ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:border-indigo-500 sm:text-sm rounded-md`}
                    placeholder="Enter your email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Email is invalid",
                      },
                    })}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div
                className="transition-all duration-300"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-medium mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className={`block w-full pl-10 pr-10 py-2 border-b ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:border-indigo-500 sm:text-sm rounded-md`}
                    placeholder="Enter your password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <FiEyeOff className="h-5 w-5" />
                    ) : (
                      <FiEye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent
                rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600
                hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2
                focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
                data-aos="fade-up"
                data-aos-delay="450"
              >
                {isLoading ? (
                  <>
                    <FiLoader className="h-5 w-5 animate-spin mr-2" />
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>

              <div
                className="flex justify-between items-center text-sm"
                data-aos="fade-up"
                data-aos-delay="500"
              >
                <div className="text-left">
                  <span className="text-gray-600">Don't have an account? </span>
                  <Link
                    to="/register"
                    className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline"
                  >
                    Sign Up
                  </Link>
                </div>
                <div className="text-right">
                  <Link
                    to="/forgot-password"
                    className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Right Side - Image/Pattern */}
        <AuthImagePattern
          title="New Here?"
          subtitle="Join our health community and get access to top-tier medical services."
          data-aos="fade-up"
          data-aos-delay="150"
        />
      </div>
    </div>
  );
};

export default UserLogin;
