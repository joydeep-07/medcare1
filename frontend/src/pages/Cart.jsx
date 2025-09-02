import React, { useContext, useState } from "react";
import { CartContext } from "../context/cartContext";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import Prescription from "../Components/Prescription";
import {
  FaRupeeSign,
  FaTrash,
  FaPlus,
  FaMinus,
  FaFileUpload,
  FaShoppingCart,
  FaStar,
  FaPills,
} from "react-icons/fa";
import Summary from "../Components/Summary";

const Cart = () => {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    prescriptionFile,
    handlePrescriptionUpload,
    prescriptionRequiredInCart,
    isPrescriptionReady,
  } = useContext(CartContext);

  const [uploadMessage, setUploadMessage] = useState("");
  const [uploadError, setUploadError] = useState("");

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryCharge = subtotal > 500 ? 0 : 50;
  const total = subtotal + deliveryCharge;

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(price);
  };

  const handleFileChange = (event) => {
    setUploadMessage("");
    setUploadError("");
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setUploadError("File size exceeds 5MB. Please upload a smaller file.");
        toast.error("File too large (max 5MB)");
        return;
      }
      const fileType = file.type;
      if (!["image/jpeg", "image/png", "application/pdf"].includes(fileType)) {
        setUploadError(
          "Invalid file type. Only JPEG, PNG, or PDF are allowed."
        );
        toast.error("Invalid file type (JPEG, PNG or PDF only)");
        return;
      }
      handlePrescriptionUpload(file);
      setUploadMessage(`File "${file.name}" uploaded successfully.`);
      toast.success("Prescription uploaded successfully");
    }
  };

  const handleProceedToCheckout = () => {
    if (prescriptionRequiredInCart && !prescriptionFile) {
      toast.error("Please upload a prescription to proceed with your order");
      return;
    }
    toast.success("Proceeding to Checkout!");
    // Your checkout logic here
  };

  return (
    <div className="bg-blue-50 py-8 pt-22 relative  flex flex-col">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex-grow">
        <div className="flex items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
              Your Medicine Cart
            </span>{" "}
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 mb-8">
          {/* Cart Items - Left Side (Scrollable) */}
          <div className="lg:w-2/3 animate-fadeIn">
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 backdrop-blur-sm">
              {/* Cart Header */}
              <div className="bg-gradient-to-r from-blue-50 to-sky-100 px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-medium text-gray-900 flex items-center">
                  <FaShoppingCart className="mr-2 text-blue-600" />
                  {cartItems.length} {cartItems.length === 1 ? "Item" : "Items"}{" "}
                  in Cart
                </h2>
              </div>

              {/* Cart Items List */}
              <div className="divide-y divide-gray-100">
                {cartItems.length === 0 ? (
                  <div className="p-8 h-75 text-center flex flex-col items-center justify-center">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-50 to-sky-100 flex items-center justify-center shadow-inner">
                      <FaShoppingCart className="text-blue-400 text-3xl" />
                    </div>
                    <p className="text-gray-600 text-lg font-medium">
                      Your cart is empty
                    </p>
                    <p className="text-gray-400 mt-2 text-sm">
                      Add some medicines to get started
                    </p>
                    <Link to="/medshop">
                      <button className="text-white bg-gradient-to-r from-sky-400 to-blue-500 rounded-lg px-6 py-2.5 mt-6 shadow-md hover:shadow-lg transition-all duration-300">
                        Browse Medicines
                      </button>
                    </Link>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 sm:p-6 hover:bg-sky-50/30 transition-colors duration-300 ease-in-out"
                    >
                      <div className="flex flex-col sm:flex-row">
                        {/* Medicine Image */}
                        <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6 relative">
                          <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-sky-50 to-white border border-sky-100 flex items-center justify-center p-2 shadow-sm">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          {item.prescriptionRequired && (
                            <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 shadow-md">
                              <FaPills className="text-xs" />
                            </div>
                          )}
                        </div>

                        {/* Medicine Details */}
                        <div className="flex-grow">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-800 tracking-tight">
                                {item.name}
                              </h3>
                              <p className="text-sm text-gray-500 mt-1 flex items-center">
                                <span className="bg-sky-100 text-sky-800 text-xs px-2.5 py-1 rounded-full mr-2 font-medium">
                                  {item.manufacturer}
                                </span>
                                <span className="flex items-center text-yellow-500">
                                  <FaStar className="mr-1" />
                                  {item.rating || "4.2"}
                                </span>
                              </p>
                            </div>
                            <button
                              onClick={() => {
                                removeFromCart(item.id);
                                toast.success("Item removed from cart");
                              }}
                              className="text-gray-400 hover:text-red-500 transition-colors duration-200 hover:bg-red-50 p-2 rounded-full"
                            >
                              <FaTrash />
                            </button>
                          </div>

                          {/* Price and Quantity */}
                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center">
                              <span className="font-bold text-gray-900 flex items-center">
                                <FaRupeeSign className="mr-1" />
                                {item.price.toFixed(2)}
                              </span>
                              {item.originalPrice && (
                                <span className="ml-2 text-sm text-gray-400 line-through">
                                  <FaRupeeSign className="inline" />
                                  {item.originalPrice.toFixed(2)}
                                </span>
                              )}
                            </div>

                            <div className="flex items-center border border-gray-100 rounded-lg bg-white shadow-xs">
                              <button
                                onClick={() => {
                                  updateQuantity(item.id, item.quantity - 1);
                                  toast.info("Quantity updated");
                                }}
                                disabled={item.quantity <= 1}
                                className={`px-3 py-2 rounded-l-lg ${
                                  item.quantity <= 1
                                    ? "text-gray-300 bg-gray-50"
                                    : "text-gray-600 hover:bg-blue-50"
                                } transition-colors duration-200`}
                              >
                                <FaMinus size={12} />
                              </button>
                              <span className="px-3 py-1 text-sm font-medium border-x border-gray-100">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => {
                                  updateQuantity(item.id, item.quantity + 1);
                                  toast.info("Quantity updated");
                                }}
                                disabled={
                                  item.quantity >= (item.maxQuantity || 10)
                                }
                                className={`px-3 py-2 rounded-r-lg ${
                                  item.quantity >= (item.maxQuantity || 10)
                                    ? "text-gray-300 bg-gray-50"
                                    : "text-gray-600 hover:bg-blue-50"
                                } transition-colors duration-200`}
                              >
                                <FaPlus size={12} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Summary */}
          <div className="lg:w-1/3">
            <Summary
              cartItems={cartItems}
              subtotal={subtotal}
              deliveryCharge={deliveryCharge}
              total={total}
              prescriptionRequiredInCart={prescriptionRequiredInCart}
              isPrescriptionReady={isPrescriptionReady}
              prescriptionFile={prescriptionFile}
              handlePrescriptionUpload={handlePrescriptionUpload}
              handleProceedToCheckout={handleProceedToCheckout}
            />
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Prescription
            prescriptionRequired={prescriptionRequiredInCart}
            prescriptionFile={prescriptionFile}
            handlePrescriptionUpload={handlePrescriptionUpload}
            uploadMessage={uploadMessage}
            uploadError={uploadError}
            setUploadMessage={setUploadMessage}
            setUploadError={setUploadError}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
