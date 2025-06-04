import { Navigate } from "react-router-dom";

const ProtectedAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const adminAuth = localStorage.getItem('adminAuth');
  
  if (!adminAuth) {
    return <Navigate to="/admin/login" replace />;
  }
  
  try {
    const authData = JSON.parse(adminAuth);
    if (!authData.isAuthenticated) {
      return <Navigate to="/admin/login" replace />;
    }
  } catch {
    localStorage.removeItem('adminAuth');
    return <Navigate to="/admin/login" replace />;
  }
  
  return <>{children}</>;
};
export default ProtectedAdminRoute;