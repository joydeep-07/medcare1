import React from "react";
import { FaFileUpload, FaPills } from "react-icons/fa";
import { toast } from "sonner";

const Prescription = ({
  prescriptionRequired,
  prescriptionFile,
  handlePrescriptionUpload,
  uploadMessage,
  uploadError,
  setUploadMessage,
  setUploadError,
}) => {
  const handleFileChange = (event) => {
    setUploadMessage("");
    setUploadError("");
    const file = event.target.files[0];

    if (!file) return;

    
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("File size exceeds 5MB. Please upload a smaller file.");
      toast.error("File too large (max 5MB)");
      return;
    }

    
    if (!["image/jpeg", "image/png", "application/pdf"].includes(file.type)) {
      setUploadError("Invalid file type. Only JPEG, PNG, or PDF are allowed.");
      toast.error("Invalid file type (JPEG, PNG or PDF only)");
      return;
    }

    handlePrescriptionUpload(file);
    setUploadMessage(`File "${file.name}" uploaded successfully.`);
    toast.success("Prescription uploaded successfully");
  };

  if (!prescriptionRequired) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 backdrop-blur-sm bg-opacity-70">
      <div className="bg-gradient-to-r from-blue-50 to-teal-50 px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900 flex items-center">
          <FaFileUpload className="mr-2 text-blue-600" />
          Upload Prescription
        </h2>
      </div>
      <div className="p-6">
        <p className="text-sm text-gray-600 mb-4">
          Some medicines in your cart require a valid prescription. Please
          upload it below to proceed.
        </p>
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center bg-gradient-to-br from-blue-50/50 to-teal-50/50 hover:border-blue-400 transition-colors duration-200">
          <label className="cursor-pointer flex flex-col items-center justify-center">
            <input
              type="file"
              className="hidden"
              accept="image/*,.pdf"
              onChange={handleFileChange}
            />
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-3">
              <FaFileUpload className="text-blue-600 text-2xl" />
            </div>
            <div className="text-blue-600 font-medium">
              {prescriptionFile ? "Change Prescription" : "Upload Prescription"}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              (JPEG, PNG or PDF, max 5MB)
            </p>
          </label>
         
          {uploadMessage && (
            <p className="text-green-600 text-sm mt-2 bg-green-50 p-2 rounded-lg">
              {uploadMessage}
            </p>
          )}
          {uploadError && (
            <p className="text-red-600 text-sm mt-2 bg-red-50 p-2 rounded-lg">
              {uploadError}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Prescription;
