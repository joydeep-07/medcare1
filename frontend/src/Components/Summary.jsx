import React from "react";
import { FaRupeeSign, FaFileUpload } from "react-icons/fa";
import { toast } from "sonner";

const Summary = ({
  cartItems,
  subtotal,
  deliveryCharge,
  total,
  prescriptionRequiredInCart,
  isPrescriptionReady,
  prescriptionFile,
  handlePrescriptionUpload,
  handleProceedToCheckout,
}) => {
  const [uploadMessage, setUploadMessage] = React.useState("");
  const [uploadError, setUploadError] = React.useState("");

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

  return (
    <div className="lg:sticky lg:top-4 lg:self-start space-y-6">
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 backdrop-blur-sm bg-opacity-70">
        <div className="bg-gradient-to-r from-blue-50 to-teal-50 px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium flex items-center">
                <FaRupeeSign className="mr-1" size={12} />
                {subtotal.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Delivery</span>
              <span className="font-medium flex items-center">
                {deliveryCharge === 0 ? (
                  <span className="text-green-500">Free</span>
                ) : (
                  <>
                    <FaRupeeSign className="mr-1" size={12} />
                    {deliveryCharge.toFixed(2)}
                  </>
                )}
              </span>
            </div>

            <div className="border-t border-gray-200 pt-4 flex justify-between">
              <span className="text-lg font-medium">Total</span>
              <span className="text-lg font-bold flex items-center">
                <FaRupeeSign className="mr-1" size={14} />
                {total.toFixed(2)}
              </span>
            </div>

            {subtotal < 500 && (
              <div className="text-sm text-blue-600 bg-blue-50 p-3 rounded-lg border border-blue-100">
                Add medicines worth ₹{(500 - subtotal).toFixed(2)} more for free
                delivery
              </div>
            )}

            <button
              onClick={handleProceedToCheckout}
              className={`w-full mt-4 py-3 px-4 rounded-lg font-medium text-white ${
                cartItems.length === 0 ||
                (prescriptionRequiredInCart && !prescriptionFile)
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
              } transition-all duration-300 shadow-md shadow-blue-500/20 flex items-center justify-center gap-2`}
              disabled={
                cartItems.length === 0 ||
                (prescriptionRequiredInCart && !prescriptionFile)
              }
            >
              Proceed to Checkout
            </button>
            {prescriptionRequiredInCart && !isPrescriptionReady && (
              <p className="text-red-500 text-sm mt-2 text-center font-semibold">
                Prescription required to proceed!
              </p>
            )}
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Summary;
