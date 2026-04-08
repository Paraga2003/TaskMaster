
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import GoogleCallback from './pages/GoogleCallback';

const PrivateRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Routes>
      <Route path="/auth/callback" element={<GoogleCallback />} />
      <Route path="/login"                    element={<Login />} />
      <Route path="/signup"                   element={<Signup />} />
      <Route path="/forgot-password"          element={<ForgotPassword />} />
      <Route path="/reset-password/:token"    element={<ResetPassword />} />

      <Route path="/dashboard" element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      }/>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;