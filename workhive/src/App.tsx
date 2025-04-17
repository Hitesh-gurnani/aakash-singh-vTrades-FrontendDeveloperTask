import "./App.css";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import ForgotPassword from "./pages/auth/ForgotPassword";
import EnterOtp from "./pages/auth/EnterOtp";
import CreateNewPassword from "./pages/auth/CreateNewPassword";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Button from "./atoms/Button";
import Dashboard from "./pages/dashboard";

// Protected route wrapper component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem("auth_token") !== null;

  if (!isAuthenticated) {
    return <Navigate to="/auth/signin" replace />;
  }

  return children;
};

function App() {
  const navigate = useNavigate();
  return (
    <>
      <Routes>
        <Route
          index
          element={
            <div className="min-h-screen flex justify-center items-center">
              <Button
                className="max-w-[450px] mx-auto flex justify-center items-center hover:cursor-pointer"
                buttonText="Visit Workhive Login"
                onClick={() => {
                  navigate("/auth/signin");
                }}
              />
            </div>
          }
        />
        <Route path="auth" element={<AuthLayout />}>
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="enter-otp" element={<EnterOtp />} />
          <Route path="create-new-password" element={<CreateNewPassword />} />
        </Route>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
