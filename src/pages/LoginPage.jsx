import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = (values) => {
    setLoading(true);
    setTimeout(() => {
      console.log(values);
      setLoading(false);
      navigate("/dashboard");
    }, 2000); 
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex flex-col justify-center items-center bg-gray-50 px-8">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">Welcome!</h1>
          <p className="text-gray-500 mb-6">Log in to complete your KYC process and access your account.</p>
          <div className="flex items-center justify-between mb-4">
            <span className="h-px w-full bg-gray-300"></span>
            <span className="h-px w-full bg-gray-300"></span>
          </div>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div>
                    <input type="checkbox" id="remember" className="mr-2" />
                    <label htmlFor="remember" className="text-sm text-gray-700">
                      Remember for 30 days
                    </label>
                  </div>
                  <span
                    className="text-sm text-blue-600 cursor-pointer hover:underline"
                    onClick={() => navigate("/forgot-password")}
                  >
                    Forgot password
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition duration-300 flex items-center justify-center"
                  disabled={isSubmitting || loading}
                >
                  {loading ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                  ) : (
                    "Log in"
                  )}
                </button>
              </Form>
            )}
          </Formik>
          <p className="text-center text-gray-500 text-sm mt-4">
            Don't have an account?{' '}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => navigate("/register")}
            >
              Sign up for free
            </span>
          </p>
        </div>
      </div>
      <div className="w-1/2 bg-blue-600 text-white flex flex-col justify-center items-center">
        <div className="max-w-md text-center">
          <div className="mb-6">
            <img
              src={
                "https://images.pexels.com/photos/3823488/pexels-photo-3823488.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              }
              alt="Secure KYC"
              className="rounded-lg"
            />
          </div>
          <h2 className="text-2xl font-bold mb-4">Complete Your KYC in Minutes</h2>
          <p className="text-sm mb-6">
            Ensure your account's security and compliance by completing your KYC process today.
          </p>
          <p className="text-sm font-semibold">Trusted by Thousands</p>
          <p className="text-sm">Secure and streamlined identity verification.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
