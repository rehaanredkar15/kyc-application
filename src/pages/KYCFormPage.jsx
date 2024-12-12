const KYCFormPage = () => {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-md shadow-md w-full max-w-lg">
          <h2 className="text-2xl font-bold text-center mb-4">Submit Your KYC</h2>
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input type="text" className="w-full p-2 border rounded-md" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" className="w-full p-2 border rounded-md" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Upload ID</label>
              <input type="file" className="w-full p-2 border rounded-md" />
            </div>
            <button className="w-full bg-blue-600 text-white p-2 rounded-md">Submit</button>
          </form>
        </div>
      </div>
    );
  };
  
  export default KYCFormPage;
  