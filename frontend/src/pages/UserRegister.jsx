import React, { useState, useEffect } from "react";
import {
  FiEye,
  FiEyeOff,
  FiLoader,
  FiLock,
  FiMail,
  FiUser,
  FiAlertCircle,
  FiMessageSquare,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AuthImagePattern from "../Components/AuthImagePattern";
import AOS from "aos";
import "aos/dist/aos.css";
import { toast } from "sonner";
import { endPoint } from "../api/endpoints";

const UserRegister = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

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
    setAuthError("");
    setIsLoading(true);
    try {
      const res = await fetch(endPoint.register, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname: data.fullname,
          email: data.email,
          password: data.password,
        }),
      });

      const result = await res.json();
      if (!res.ok) {
        setAuthError(result.message || "Registration failed");
        throw new Error(result.message);
      }

      toast.success("Registration successful! You can now log in.");
      reset();
      navigate("/user-login");
    } catch (error) {
      console.error("Registration error:", error);
      if (!error.message.includes("Registration failed")) {
        setAuthError("Registration failed: " + error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-24 mb-10 flex items-center justify-center p-4">
      <div
        className="w-full max-w-[1550px] bg-white rounded-xl shadow-lg overflow-hidden lg:grid lg:grid-cols-2 min-h-[600px]"
        data-aos="fade-up"
        data-aos-delay="50"
      >
        {/* Left Side - Registration Form */}
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
                  Create Your Account
                </h1>
                <p className="text-gray-600">
                  Join our community to get started
                </p>
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
              {/* Full Name Field */}
              <div
                className="transition-all duration-300"
                data-aos="fade-up"
                data-aos-delay="350"
              >
                <label
                  htmlFor="fullname"
                  className="block text-gray-700 text-sm font-medium mb-1"
                >
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="fullname"
                    type="text"
                    className={`block w-full pl-10 pr-3 py-2 border-b ${
                      errors.fullname ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:border-indigo-500 sm:text-sm rounded-md`}
                    placeholder="Enter your full name"
                    {...register("fullname", {
                      required: "Full Name is required",
                    })}
                  />
                </div>
                {errors.fullname && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.fullname.message}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div
                className="transition-all duration-300"
                data-aos="fade-up"
                data-aos-delay="400"
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
                data-aos-delay="450"
              >
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-medium mb-1"
                >
                  Create Password
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
                    placeholder="Create Password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
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

              {/* Confirm Password Field */}
              <div
                className="transition-all duration-300"
                data-aos="fade-up"
                data-aos-delay="500"
              >
                <label
                  htmlFor="confirmPassword"
                  className="block text-gray-700 text-sm font-medium mb-1"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    className={`block w-full pl-10 pr-10 py-2 border-b ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:outline-none focus:border-indigo-500 sm:text-sm rounded-md`}
                    placeholder="Confirm Password"
                    {...register("confirmPassword", {
                      required: "Confirm Password is required",
                      validate: (value) =>
                        value === password || "Passwords must match",
                    })}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showConfirmPassword ? (
                      <FiEyeOff className="h-5 w-5" />
                    ) : (
                      <FiEye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.confirmPassword.message}
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
                data-aos-delay="550"
              >
                {isLoading ? (
                  <>
                    <FiLoader className="h-5 w-5 animate-spin mr-2" />
                    Registering...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>

              <div
                className="text-center text-sm"
                data-aos="fade-up"
                data-aos-delay="600"
              >
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to="/user-login"
                    className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Right Side - Image/Pattern */}
        <AuthImagePattern
          title="Already a Member?"
          subtitle="Sign in to manage your appointments and health records."
          data-aos="fade-up"
          data-aos-delay="150"
        />
      </div>
    </div>
  );
};

export default UserRegister;
