import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { uploadkyc } from "../network/kyc-api";
import { FaSpinner } from "react-icons/fa";


const KYCFormPage = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [selectedDocType, setSelectedDocType] = useState("Identity Card");
  const [uploading, setUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);  
  const [kycDoc, setKycDoc] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const [isLoading, setIsLoading] = useState(false); 


  useEffect(() => {
    if (user) {
      setUserName(user?.name || "User");
      setUserEmail(user?.email || "");
    
      if(user.kycDetails.documentPath?.length>1){
        setKycDoc(user.kycDetails?.documentPath);
      }

    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setUserName(newName);

    const user = JSON.parse(localStorage.getItem("user"));
    localStorage.setItem("user", JSON.stringify({ ...user, name: newName }));
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setUserEmail(newEmail);
  };

  const handleDocTypeClick = (type) => {
    setSelectedDocType(type);
    setUploadedFile(null);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setUploading(true);
      setTimeout(() => {
        setUploadedFile(acceptedFiles[0]);
        setUploading(false);
      }, 2000);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); 
    if (!uploadedFile) {
      alert("Please upload a file.");
      return;
    }

    const formData = new FormData();
    formData.append("kycFile", uploadedFile);
    formData.append("name", userName);
    formData.append("email", userEmail);

    try {
      await uploadkyc(formData);
      setFormSubmitted(true); 
      setIsLoading(false); 
    } catch (error) {
      console.error("Error submitting KYC:", error);
      alert("Failed to submit KYC. Please try again.");
      setIsLoading(false); 
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-[Poppins]">
      <header className="bg-white shadow-md px-6 py-2 flex justify-between items-center">
        <img
          src="https://img.freepik.com/premium-vector/kyc-compliance-identity-verification-illustration_211498-96.jpg"
          alt="Logo"
          className="h-16"
        />
        <div className="flex items-center space-x-6">
          <span className="text-gray-700 text-lg font-semibold">
            Hi, {userName}
          </span>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 font-medium"
          >
            Logout
          </button>
        </div>
      </header>
      {kycDoc ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center bg-white shadow-lg p-10 rounded-lg">
            <h2 className="text-3xl font-bold mb-4">KYC Already Submitted</h2>
            <p className="text-lg text-gray-700 mb-4">
              Your uploaded document:{" "}
              <a
                href={user.kycDetails.documentPath}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline cursor-pointer"
              >
                View Document
              </a>
            </p>
            <button
              className={`px-6 py-2 rounded-lg font-medium border-2 ${
                user.kycDetails.status === "Pending"
                  ? "border-yellow-500 text-yellow-500"
                  : user.kycDetails.status === "Approved"
                  ? "border-green-500 text-green-500"
                  : "border-red-500 text-red-500"
              }`}
            >
              Status: {user.kycDetails.status}
            </button>
          </div>
        </div>
      ) : (
        <>
         {!formSubmitted ? (
        <div className="flex justify-center items-start py-10 px-12">
          <div className="w-1/4 bg-white p-6 shadow-lg rounded-lg">
            <h3 className="text-xl font-bold mb-6">Steps</h3>
            <ul className="space-y-6">
              <li className="flex items-center text-blue-600 font-medium">
                <span className="w-10 h-10 flex items-center justify-center bg-green-600 text-white rounded-full  mr-4">
                  1
                </span>
                Account Creation
              </li>
              <li className="flex items-center text-blue-600 font-medium">
                <span className="w-10 h-10 flex items-center justify-center bg-green-600 text-white rounded-full text-base mr-4">
                  2
                </span>
               Submit Kyc
              </li>
              <li className="flex items-center text-gray-400 font-medium">
                <span className="w-10 h-10 flex items-center justify-center bg-gray-300 text-gray-600 rounded-full text-base mr-4">
                  3
                </span>
                Verification
              </li>
            </ul>
          </div>

          <div className="w-3/4 bg-white p-12 shadow-lg rounded-lg ml-12">
            <h2 className="text-3xl font-bold text-center mb-8">
              Verify Your Identity
            </h2>

            <div className="mb-8">
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Name
              </label>
              <input
                type="text"
                className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter your name"
                value={userName}
                onChange={handleNameChange}
              />
            </div>

            <div className="mb-8">
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Email
              </label>
              <input
                type="email"
                className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter your email"
                value={userEmail}
                onChange={handleEmailChange}
              />
            </div>
            <div className="flex justify-between mb-10">
              {["Identity Card", "Driver License", "Passport"].map((type) => (
                <button
                  key={type}
                  className={`flex-1 mx-2 py-4 rounded-lg font-medium border-2 text-center transition-colors duration-300 ${
                    selectedDocType === type
                      ? "bg-green-100 border-green-600 text-green-600"
                      : "bg-gray-100 border-gray-300 text-gray-600"
                  }`}
                  onClick={() => handleDocTypeClick(type)}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="text-center">
              {uploadedFile ? (
                <div>
                  <p className="text-gray-600">{uploadedFile.name}</p>
                  <p className="text-gray-400 text-sm">Uploaded successfully</p>
                  <button
                    className="mt-4 bg-red-600 text-white rounded-full px-4 py-2 text-sm hover:bg-red-700"
                    onClick={() => setUploadedFile(null)}
                  >
                    Delete
                  </button>
                </div>
              ) : (
                <div
                  {...getRootProps({
                    className:
                      "bg-gray-100 border-dashed border-2 border-gray-300 p-6 rounded-lg hover:border-blue-600",
                  })}
                >
                  <input {...getInputProps()} />
                  {uploading ? (
                    <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-600 mx-auto"></div>
                  ) : (
                    <p className="text-gray-600">
                      Drag and drop your file here or click to upload
                    </p>
                  )}
                </div>
              )}
            </div>

            <button
              className={`mt-10 flex items-center justify-center bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 ${
                isLoading ? "opacity-75 cursor-not-allowed" : ""
              }`}
              disabled={!uploadedFile || isLoading}
              onClick={handleSubmit}
            >
              {isLoading ? (
                <FaSpinner className="animate-spin mr-2" /> 
              ) : (
                "Continue"
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center">
            <img
              src="https://img.freepik.com/free-vector/green-double-circle-check-mark_78370-1749.jpg?semt=ais_hybrid"
              alt="Success"
              className="w-32 mx-auto mb-4"
            />
            <h2 className="text-3xl font-bold mb-4">KYC Submitted Successfully!</h2>
            <p className="text-lg text-gray-700">
              We will notify you as soon as your KYC is approved.
            </p>
          </div>
        </div>
      )}
        </>
      )}
    
    </div>
  );
};

export default KYCFormPage;
