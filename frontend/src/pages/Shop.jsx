import React, { useContext } from "react";
import { CartContext } from "../context/cartContext";
import { useUser } from "../context/UserContext"; // Import useUser hook
import {
  FaShoppingCart,
  FaRupeeSign,
  FaStar,
  FaPills,
  FaCapsules,
  FaSyringe,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import { MdLocalPharmacy, MdHealthAndSafety } from "react-icons/md";
import { Toaster, toast } from "sonner";
import ShopBanner from "../Components/ShopBanner";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Shop = () => {
  const { addToCart } = useContext(CartContext);
  const { isAuthenticated } = useUser(); // Get isAuthenticated from UserContext
  const navigate = useNavigate(); // Initialize useNavigate

  // Sample medicine data with demo image links
  const medicines = [
    {
      id: 1,
      name: "Paracetamol 500mg",
      category: "Pain Relief",
      price: 15.5,
      discountedPrice: 12.75,
      description: "Effective for headaches, fever, and mild pain relief.",
      image:
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      inStock: true,
      manufacturer: "Cipla",
      strips: 10,
      rating: 4.5,
      isFavorite: false,
      prescriptionRequired: false,
    },
    {
      id: 2,
      name: "Ibuprofen 200mg",
      category: "Anti-inflammatory",
      price: 35.75,
      description: "Reduces inflammation and relieves pain.",
      image:
        "https://images.unsplash.com/photo-1558645836-e44122a743ee?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      inStock: true,
      manufacturer: "Dr. Reddy's",
      strips: 15,
      rating: 4.2,
      isFavorite: true,
      prescriptionRequired: false, // Added boolean value
    },
    {
      id: 3,
      name: "Vitamin C 1000mg",
      category: "Supplements",
      price: 125.99,
      discountedPrice: 99.99,
      description: "Boosts immune system and antioxidant support.",
      image:
        "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      inStock: true,
      manufacturer: "Himalaya",
      strips: 30,
      rating: 4.7,
      isFavorite: false,
      prescriptionRequired: false, // Added boolean value
    },
    {
      id: 4,
      name: "Cetirizine 10mg",
      category: "Allergy",
      price: 42.25,
      description: "Relieves allergy symptoms like sneezing and itching.",
      image:
        "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      inStock: false,
      manufacturer: "Sun Pharma",
      strips: 10,
      rating: 4.0,
      isFavorite: false,
      prescriptionRequired: false, // Added boolean value
    },
    {
      id: 5,
      name: "Amoxicillin 500mg",
      category: "Antibiotic",
      price: 89.9,
      description: "Treats bacterial infections.",
      image:
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      inStock: true,
      manufacturer: "Mankind",
      strips: 6,
      rating: 4.3,
      isFavorite: true,
      prescriptionRequired: true,
    },
    {
      id: 6,
      name: "Insulin Syringe",
      category: "Diabetes Care",
      price: 65.0,
      discountedPrice: 55.0,
      description: "Sterile syringe for insulin administration.",
      image:
        "https://images.unsplash.com/photo-1584473457406-6240486418e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      inStock: true,
      manufacturer: "BD",
      count: 5,
      rating: 4.8,
      isFavorite: false,
      prescriptionRequired: true,
    },
  ];

  const handleAddToCartClick = (medicine) => {
    if (!isAuthenticated) {
      toast.error("Please log in first");
      // navigate("/user-login"); // Redirect to login page
      return; // Stop the function here
    }
    addToCart(medicine);
    toast.success(`${medicine.name} added to cart`);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(price);
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Pain Relief":
      case "Anti-inflammatory":
        return <FaPills className="text-blue-500 text-sm" />;
      case "Supplements":
      case "Antibiotic":
        return <FaCapsules className="text-teal-500 text-sm" />;
      case "Diabetes Care":
        return <FaSyringe className="text-purple-500 text-sm" />;
      default:
        return <FaPills className="text-gray-500 text-sm" />;
    }
  };

  return (
    <>
      <Toaster position="top-right" richColors />{" "}
      {/* Ensure Toaster is rendered */}
      <ShopBanner />
      <section
        id="shop"
        className="py-12 pt-20 bg-blue-50 relative overflow-hidden"
      >
        {/* Background elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>
        <div className="absolute -top-[150px] -left-[150px] w-[300px] h-[300px] rounded-full bg-blue-100 blur-[80px]"></div>
        <div className="absolute -bottom-[100px] -right-[100px] w-[250px] h-[250px] rounded-full bg-teal-100 blur-[60px]"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center mb-3">
              <MdHealthAndSafety className="text-3xl text-blue-600 mr-2" />
              <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
                  MedCare
                </span>{" "}
                <span className="text-gray-800">Pharmacy</span>
              </h2>
            </div>
            <p className="mt-3 text-base text-gray-600 max-w-2xl mx-auto">
              Premium pharmaceuticals with certified quality and competitive
              pricing
            </p>
            <div className="mt-5 flex justify-center">
              <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full"></div>
            </div>
          </div>

          {/* Medicine Cards Grid - now with smaller cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {medicines.map((medicine) => (
              <div
                key={medicine.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col transform group"
              >
                {/* Medicine Image */}
                <div className="relative h-40 bg-gradient-to-br from-blue-50 to-gray-50 flex items-center justify-center p-4">
                  {medicine.image ? (
                    <img
                      src={medicine.image}
                      alt={medicine.name}
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "";
                      }}
                    />
                  ) : (
                    <div className="text-gray-400">
                      {getCategoryIcon(medicine.category)}
                    </div>
                  )}

                  {/* Discount Badge */}
                  {medicine.discountedPrice && (
                    <div className="absolute top-2 right-2 bg-gradient-to-r from-blue-500 to-teal-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm">
                      {Math.round(
                        (1 - medicine.discountedPrice / medicine.price) * 100
                      )}
                      % OFF
                    </div>
                  )}

                  {/* Favorite Button */}
                  <button className="absolute top-2 left-2 p-1.5 bg-white bg-opacity-90 rounded-full shadow-xs hover:bg-opacity-100 transition-all z-10 hover:scale-110">
                    {medicine.isFavorite ? (
                      <FaHeart className="text-red-500 text-sm" />
                    ) : (
                      <FaRegHeart className="text-gray-400 hover:text-red-500 text-sm" />
                    )}
                  </button>

                  {/* Out of Stock Overlay */}
                  {!medicine.inStock && (
                    <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center">
                      <span className="bg-gray-800 text-white px-2 py-0.5 rounded-full text-xs font-medium">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>

                {/* Medicine Details - more compact */}
                <div className="p-4 flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-base font-semibold text-gray-800 line-clamp-1">
                      {medicine.name}
                    </h3>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-800">
                      {medicine.category}
                    </span>
                  </div>

                  {/* Rating and Manufacturer */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="flex text-yellow-400 mr-1">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={
                              i < Math.floor(medicine.rating)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }
                            size={12}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 ml-1">
                        ({medicine.rating})
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 font-medium truncate max-w-[100px]">
                      {medicine.manufacturer}
                    </span>
                  </div>

                  <p className="text-gray-600 text-xs mb-3 leading-tight line-clamp-2">
                    {medicine.description}
                  </p>

                  <div className="text-xs text-gray-500 mb-3 space-y-0.5">
                    {medicine.strips ? (
                      <p className="flex items-center">
                        <MdLocalPharmacy className="mr-1 text-xs" />
                        {medicine.strips} tablets
                      </p>
                    ) : (
                      <p className="flex items-center">
                        <MdLocalPharmacy className="mr-1 text-xs" />
                        Pack of {medicine.count}
                      </p>
                    )}
                    {medicine.prescriptionRequired && (
                      <p className="flex items-center text-red-500 font-semibold text-xs">
                        <FaPills className="mr-1 text-xs" /> Rx Required
                      </p>
                    )}
                  </div>

                  <div className="mt-auto">
                    {/* Price */}
                    <div className="mb-3">
                      {medicine.discountedPrice ? (
                        <div className="space-y-0.5">
                          <span className="text-base font-bold text-gray-800 flex items-center">
                            <FaRupeeSign className="mr-1" size={12} />
                            {formatPrice(medicine.discountedPrice)}
                            <span className="ml-1 text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full">
                              Save{" "}
                              {formatPrice(
                                medicine.price - medicine.discountedPrice
                              )}
                            </span>
                          </span>
                          <span className="text-xs text-gray-500 line-through flex items-center">
                            <FaRupeeSign className="mr-1" size={10} />
                            {formatPrice(medicine.price)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-base font-bold text-gray-800 flex items-center">
                          <FaRupeeSign className="mr-1" size={12} />
                          {formatPrice(medicine.price)}
                        </span>
                      )}
                    </div>

                    {/* Add to Cart Button - more refined */}
                    <button
                      onClick={() => handleAddToCartClick(medicine)}
                      disabled={!medicine.inStock} // Disable if out of stock
                      className={`w-full text-sm px-3 py-1.5 rounded-md transition-colors duration-200 ${
                        medicine.inStock
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {medicine.inStock ? "Add to Cart" : "Out of Stock"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View More Button */}
          <div className="mt-12 text-center">
            <button className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-teal-600 text-white font-medium rounded-md hover:from-blue-600 hover:to-teal-700 transition-all duration-300 shadow-sm hover:shadow-md flex items-center mx-auto group">
              <span className="text-sm">Browse All Medicines</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1.5 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Shop;
