const DashboardPage = () => {
    const users = [
      { id: 1, name: "John Doe", email: "john@example.com", status: "Pending" },
      { id: 2, name: "Jane Doe", email: "jane@example.com", status: "Approved" },
    ];
  
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <div className="bg-white shadow-md rounded-md p-6">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-100 p-4 rounded-md">
              <h2 className="text-xl font-semibold">Total Users</h2>
              <p className="text-2xl font-bold">50</p>
            </div>
            <div className="bg-green-100 p-4 rounded-md">
              <h2 className="text-xl font-semibold">Approved KYCs</h2>
              <p className="text-2xl font-bold">30</p>
            </div>
            <div className="bg-red-100 p-4 rounded-md">
              <h2 className="text-xl font-semibold">Rejected KYCs</h2>
              <p className="text-2xl font-bold">5</p>
            </div>
          </div>
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="bg-white">
                  <td className="border p-2">{user.name}</td>
                  <td className="border p-2">{user.email}</td>
                  <td className="border p-2">{user.status}</td>
                  <td className="border p-2">
                    <button className="bg-green-500 text-white p-1 rounded mr-2">Approve</button>
                    <button className="bg-red-500 text-white p-1 rounded">Reject</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default DashboardPage;
  