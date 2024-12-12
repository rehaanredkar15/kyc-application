import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { getAllUsers, updateKyc } from "../network/kyc-api";

const DashboardPage = () => {
  const [userName, setUserName] = useState("Admin"); 
  const [users, setUsers] = useState([]);
  const [kpiData, setKpiData] = useState({ totalUsers: 0, approvedKYCs: 0, rejectedKYCs: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      if (user.role !== "admin") {
        navigate("/");
      } else {
        setUserName(user?.name || "Admin");
      }
    } else {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        const { users } = response.data;
        setUsers(users.users);
        setKpiData({
          totalUsers: users.totalUsers,
          approvedKYCs: users.approvedKYCs,
          rejectedKYCs: users.rejectedKYCs,
        });
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const viewDocument = (documentLink) => {
    if (documentLink) {
      window.open(documentLink, "_blank");
    } else {
      alert("No document available.");
    }
  };
  const handleApprove = async (userId, userName, userEmail) => {
    try {
      await updateKyc(userId, { 
        status: "accepted", 
        name: userName, 
        email: userEmail 
      });
      alert(`${userName}'s KYC Approved successfully.`);
      refreshUsers();
    } catch (error) {
      console.error("Error approving KYC:", error);
      alert("Failed to approve KYC.");
    }
  };
  
  const handleReject = async (userId, userName, userEmail) => {
    try {
      await updateKyc(userId, { 
        status: "rejected", 
        name: userName, 
        email: userEmail 
      });
      alert(`${userName}'s KYC Rejected successfully.`);
      refreshUsers();
    } catch (error) {
      console.error("Error rejecting KYC:", error);
      alert("Failed to reject KYC.");
    }
  };

  const refreshUsers = async () => {
    try {
      const response = await getAllUsers();
      const { users } = response.data;
      setUsers(users.users);
      setKpiData({
        totalUsers: users.totalUsers,
        approvedKYCs: users.approvedKYCs,
        rejectedKYCs: users.rejectedKYCs,
      });
    } catch (error) {
      console.error("Error refreshing users:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
        <img
          src="https://img.freepik.com/premium-vector/kyc-compliance-identity-verification-illustration_211498-96.jpg"
          alt="Logo"
          className="h-12"
        />
        <div className="flex items-center space-x-4">
          <span className="text-gray-700 text-lg font-semibold">Hi, {userName}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 font-medium"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-100 p-4 rounded-md flex items-center space-x-4">
            <FaUser className="text-blue-500 text-3xl" />
            <div>
              <h2 className="text-sm font-semibold">Total Users</h2>
              <p className="text-lg font-bold">{kpiData.totalUsers}</p>
            </div>
          </div>
          <div className="bg-green-100 p-4 rounded-md flex items-center space-x-4">
            <FaCheckCircle className="text-green-500 text-3xl" />
            <div>
              <h2 className="text-sm font-semibold">Approved KYCs</h2>
              <p className="text-lg font-bold">{kpiData.approvedKYCs}</p>
            </div>
          </div>
          <div className="bg-red-100 p-4 rounded-md flex items-center space-x-4">
            <FaTimesCircle className="text-red-500 text-3xl" />
            <div>
              <h2 className="text-sm font-semibold">Rejected KYCs</h2>
              <p className="text-lg font-bold">{kpiData.rejectedKYCs}</p>
            </div>
          </div>
        </div>

       
        <div className="bg-white shadow-md rounded-md p-6">
          <h2 className="text-xl font-bold mb-4">User Details</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="border p-3">Name</th>
                <th className="border p-3">Email</th>
                <th className="border p-3">Status</th>
                <th className="border p-3">View Document</th>
                <th className="border p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="bg-white hover:bg-gray-100">
                  <td className="border p-3">{user.name}</td>
                  <td className="border p-3">{user.email}</td>
                  <td className="border p-3">
                    {user.kycDetails.status === "accepted" ? (
                      <span className="text-green-600 font-semibold">Approved</span>
                    ) : user.kycDetails.status === "rejected" ? (
                      <span className="text-red-600 font-semibold">Rejected</span>
                    ) : (
                      <span className="text-yellow-600 font-semibold">Pending</span>
                    )}
                  </td>
                  <td className="border p-3">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      onClick={() => viewDocument(user.kycDetails.documentLink)}
                    >
                      View Document
                    </button>
                  </td>
                  <td className="border p-3">
                    {user.kycDetails.status === "pending" ? (
                      <div className="space-x-2">
                        <button
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                          onClick={() => handleApprove(user._id, user.name, user.email)}
                        >
                          Approve
                        </button>
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                          onClick={() => handleReject(user._id, user.name, user.email)}
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-500">{user.kycDetails.status}</span>
                    )}
                  </td>
                
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;