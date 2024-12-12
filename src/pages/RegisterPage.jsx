import { useNavigate } from "react-router-dom";

const RegistrationPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-gray-50 px-8">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">Create an account</h1>
          <p className="text-gray-500 mb-6">Sign up to start your KYC process and access exclusive services.</p>
          <div className="flex items-center justify-between mb-4">
            <span className="h-px w-full bg-gray-300"></span>
            <span className="h-px w-full bg-gray-300"></span>
          </div>
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Create a password"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <button
              type="button"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition duration-300"
              onClick={() => navigate("/dashboard")}
            >
              Sign up
            </button>
          </form>
          <p className="text-center text-gray-500 text-sm mt-4">
            Already have an account?{' '}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => navigate("/login")}
            >
              Log in here
            </span>
          </p>
        </div>
      </div>

      {/* Right Section */}
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

export default RegistrationPage;
