import React, { useState, useEffect } from "react";
import {
  FiEye,
  FiEyeOff,
  FiLoader,
  FiLock,
  FiMail,
  FiMessageSquare,
  FiAlertCircle,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import AuthImagePattern from "../Components/AuthImagePattern";
import AOS from "aos";
import "aos/dist/aos.css";
import { toast } from "sonner";
import { endPoint } from "../api/endpoints";



const ForgotPassword = () => {
  const [showOtp, setShowOtp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [resetToken, setResetToken] = useState(""); // Store JWT reset token

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setValue,
    trigger,
  } = useForm({
    defaultValues: {
      email: "",
      otp: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  // Start OTP timer when OTP is sent
  useEffect(() => {
    let interval;
    if (otpSent && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    } else if (otpTimer === 0 && otpSent) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [otpSent, otpTimer]);

  // Format timer to MM:SS
  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

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

  const handleSendOtp = async (data) => {
    setLoginError("");
    setIsLoading(true);

    try {
      const res = await fetch(`${endPoint.requestPasswordReset}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      });
      const result = await res.json();

      if (result.success) {
        setIsLoading(false);
        setOtpSent(true);
        setOtpTimer(300); // 5 minutes
        toast.success(result.message || "OTP sent to your email!");
        AOS.refresh();
      } else {
        setIsLoading(false);
        setLoginError(result.message || "Failed to send OTP.");
      }
    } catch (error) {
      setIsLoading(false);
      setLoginError("Failed to send OTP. Please try again.");
    }
  };

  const handleVerifyOtp = async (data) => {
    setLoginError("");
    setIsLoading(true);

    try {
      const res = await fetch(`${endPoint.verifyResetOtp}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: watch("email"), otp: data.otp }),
      });
      const result = await res.json();

      if (result.success && result.resetToken) {
        setIsLoading(false);
        setOtpVerified(true);
        setResetToken(result.resetToken);
        toast.success(result.message || "OTP verified successfully!");
      } else {
        setIsLoading(false);
        setLoginError(result.message || "Invalid OTP.");
      }
    } catch (error) {
      setIsLoading(false);
      setLoginError("Failed to verify OTP. Please try again.");
    }
  };

  const handleResetPassword = async (data) => {
    setIsLoading(true);
    setLoginError("");

    try {
      const res = await fetch(`${endPoint.resetPassword}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resetToken,
          newPassword: data.newPassword,
        }),
      });
      const result = await res.json();

      if (result.success) {
        setIsLoading(false);
        toast.success(result.message || "Password reset successfully!");
        // navigate("/user-login");
        // Reset form after successful password reset
        reset();
        setOtpSent(false);
        setOtpVerified(false);
        setOtpTimer(0);
        setResetToken("");
      } else {
        setIsLoading(false);
        setLoginError(result.message || "Failed to reset password.");
      }
    } catch (error) {
      setIsLoading(false);
      setLoginError("Failed to reset password. Please try again.");
    }
  };

  const resendOtp = async () => {
    if (otpTimer > 0) return;
    setIsLoading(true);
    setLoginError("");

    try {
      const res = await fetch(`${endPoint.requestPasswordReset}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: watch("email") }),
      });
      const result = await res.json();

      if (result.success) {
        setIsLoading(false);
        setOtpTimer(300);
        toast.success(result.message || "New OTP sent to your email!");
      } else {
        setIsLoading(false);
        setLoginError(result.message || "Failed to resend OTP.");
      }
    } catch (error) {
      setIsLoading(false);
      setLoginError("Failed to resend OTP. Please try again.");
    }
  };

  return (
    <div className="mt-24 mb-10 flex items-center justify-center p-4">
      <div
        className="w-full max-w-[1550px] bg-white rounded-xl shadow-lg overflow-hidden lg:grid lg:grid-cols-2 min-h-[600px]"
        data-aos="fade-up"
        data-aos-delay="50"
      >
        {/* Left Side - Form */}
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
                  {otpVerified ? "Reset Password" : "Forgot Password"}
                </h1>
                <p className="text-gray-600">
                  {otpVerified
                    ? "Enter your new password"
                    : "Reset your password using OTP"}
                </p>
              </div>
            </div>

            {loginError && (
              <div
                className="p-4 mb-4 bg-red-50 text-red-700 rounded-lg flex items-center"
                data-aos="fade-up"
              >
                <FiAlertCircle className="mr-2" />
                {loginError}
              </div>
            )}

            <form
              onSubmit={handleSubmit(
                otpVerified
                  ? handleResetPassword
                  : otpSent
                  ? handleVerifyOtp
                  : handleSendOtp
              )}
              className="space-y-6"
            >
              {/* Email Field - Always visible until password reset */}
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
                    } focus:outline-none focus:border-indigo-500 sm:text-sm`}
                    placeholder="Enter your registered email"
                    disabled={otpSent}
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

              {/* OTP Field - Shown after email is submitted */}
              {otpSent && !otpVerified && (
                <div
                  className="transition-all duration-500 ease-in-out"
                  data-aos-delay="500"
                >
                  <label
                    htmlFor="otp"
                    className="block text-gray-700 text-sm font-medium mb-1"
                  >
                    Enter OTP
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="otp"
                      type="text"
                      className={`block w-full pl-10 pr-10 py-2 border-b ${
                        errors.otp ? "border-red-500" : "border-gray-300"
                      } focus:outline-none focus:border-indigo-500 sm:text-sm`}
                      placeholder="Enter OTP"
                      {...register("otp", {
                        required: "OTP is required",
                        pattern: {
                          value: /^\d{6}$/,
                          message: "OTP must be 6 digits",
                        },
                      })}
                    />
                  </div>
                  {errors.otp && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.otp.message}
                    </p>
                  )}
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-sm text-gray-500">
                      {otpTimer > 0
                        ? `OTP expires in ${formatTimer(otpTimer)}`
                        : "OTP expired"}
                    </p>
                    <button
                      type="button"
                      onClick={resendOtp}
                      disabled={otpTimer > 0 || isLoading}
                      className={`text-sm ${
                        otpTimer > 0
                          ? "text-gray-400"
                          : "text-indigo-600 hover:text-indigo-500"
                      } font-medium`}
                    >
                      Resend OTP
                    </button>
                  </div>
                </div>
              )}

              {/* Password Fields - Shown after OTP is verified */}
              {otpVerified && (
                <div
                  className="transition-all duration-500 ease-in-out space-y-4"
                  data-aos-delay="500"
                >
                  <div>
                    <label
                      htmlFor="newPassword"
                      className="block text-gray-700 text-sm font-medium mb-1"
                    >
                      New Password (6-digit number)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiLock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="newPassword"
                        type={showPassword ? "text" : "password"}
                        className={`block w-full pl-10 pr-10 py-2 border-b ${
                          errors.newPassword
                            ? "border-red-500"
                            : "border-gray-300"
                        } focus:outline-none focus:border-indigo-500 sm:text-sm`}
                        placeholder="Enter new password"
                        {...register("newPassword", {
                          required: "New password is required",
                          pattern: {
                            value: /^\d{6}$/,
                            message: "Password must be a 6-digit number",
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
                    {errors.newPassword && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.newPassword.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="confirmNewPassword"
                      className="block text-gray-700 text-sm font-medium mb-1"
                    >
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiLock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="confirmNewPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        className={`block w-full pl-10 pr-10 py-2 border-b ${
                          errors.confirmNewPassword
                            ? "border-red-500"
                            : "border-gray-300"
                        } focus:outline-none focus:border-indigo-500 sm:text-sm`}
                        placeholder="Confirm new password"
                        {...register("confirmNewPassword", {
                          required: "Please confirm your new password",
                          validate: (value) =>
                            value === watch("newPassword") ||
                            "Passwords do not match",
                        })}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        aria-label={
                          showConfirmPassword
                            ? "Hide password"
                            : "Show password"
                        }
                      >
                        {showConfirmPassword ? (
                          <FiEyeOff className="h-5 w-5" />
                        ) : (
                          <FiEye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    {errors.confirmNewPassword && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.confirmNewPassword.message}
                      </p>
                    )}
                  </div>
                </div>
              )}

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
                    {otpVerified
                      ? "Resetting..."
                      : otpSent
                      ? "Verifying..."
                      : "Sending OTP..."}
                  </>
                ) : otpVerified ? (
                  "Reset Password"
                ) : otpSent ? (
                  "Verify OTP"
                ) : (
                  "Send OTP"
                )}
              </button>
            </form>

            <div
              className="text-center text-sm"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <p className="text-gray-600">
                Remembered your password?{" "}
                <Link
                  to="/user-login"
                  className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline"
                >
                 Login here
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Image/Pattern */}
        <AuthImagePattern
          title={otpVerified ? "Set a new password" : "Forgot your password?"}
          subtitle={
            otpVerified
              ? "Create a strong password to secure your account"
              : otpSent
              ? "Enter the OTP sent to your registered email"
              : "Enter your email to receive a password reset OTP"
          }
          data-aos="fade-up"
          data-aos-delay="150"
        />
      </div>
    </div>
  );
};

export default ForgotPassword;
