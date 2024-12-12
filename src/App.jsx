import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import KYCFormPage from "./pages/KYCFormPage";
import DashboardPage from "./pages/DashboardPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const ProtectedRoute = ({ children, allowNonAdmin }) => {
    const user = JSON.parse(localStorage.getItem("user"));
  
    if (!user) {
      return <Navigate to="/" replace />;
    }
  
    if (allowNonAdmin) {
      return children;
    }
      if (user.role !== "admin") {
      return <Navigate to="/kyc" replace />; 
    }
      return children;
  };
  return (
    <>
     <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          <Route 
            path="/kyc" 
            element={
              <ProtectedRoute allowNonAdmin={true}>
                <KYCFormPage />
              </ProtectedRoute>
            }
          />

          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute allowNonAdmin={false}>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
