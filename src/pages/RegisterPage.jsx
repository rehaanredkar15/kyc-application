import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { register } from "../network/kyc-api";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const userDetails = {
        name: values.name,
        email: values.email,
        password: values.password,
        role: "user", 
        kycDetails: {
          status: "pending",
          documentPath: "",
        },
      };
      try {
        const response = await register(userDetails);
        if (response.data) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
          if (response.data.role === "admin") {
            navigate("/dashboard");
          } else {
            navigate("/kyc");
          }
        }
      } catch (error) {
        console.error("Registration failed:", error);
        alert("Registration failed. Please try again.");
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      if (user.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/kyc");
      }
    }
  }, [navigate]);

  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex flex-col justify-center items-center bg-gray-50 px-8">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">Create an account</h1>
          <p className="text-gray-500 mb-6">Sign up to start your KYC process and access exclusive services.</p>
          <div className="flex items-center justify-between mb-4">
            <span className="h-px w-full bg-gray-300"></span>
            <span className="h-px w-full bg-gray-300"></span>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-red-500 text-sm">{formik.errors.name}</div>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-sm">{formik.errors.email}</div>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Create a password"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-sm">{formik.errors.password}</div>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition duration-300"
            >
              {loading ? (
                <div className="flex justify-center items-center">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path
                      fill="currentColor"
                      d="M4 12a8 8 0 0 1 16 0"
                    />
                  </svg>
                  <span className="ml-2">Signing up...</span>
                </div>
              ) : (
                "Sign up"
              )}
            </button>
          </form>
          <p className="text-center text-gray-500 text-sm mt-4">
            Already have an account?{' '}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => navigate("/")}
            >
              Log in here
            </span>
          </p>
        </div>
      </div>

      <div className="w-1/2 bg-blue-600 text-white flex flex-col justify-center items-center">
        <div className="max-w-md text-center">
          <div className="mb-6">
            <img
              src={'https://images.pexels.com/photos/3823488/pexels-photo-3823488.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
              alt="Secure Registration"
              className="rounded-lg"
            />
          </div>
          <h2 className="text-2xl font-bold mb-4">
            Join Us Today
          </h2>
          <p className="text-sm mb-6">
            Start your journey with secure and reliable identity verification.
          </p>
          <p className="text-sm font-semibold">Trusted by Thousands</p>
          <p className="text-sm">Streamlined registration for hassle-free access.</p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
