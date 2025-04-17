import React, { useState } from "react";
import HeadingDesc from "../../components/HeadingDesc";
import Button from "../../atoms/Button";
import InputWithHeading from "../../atoms/InputWithHeading";
import api from "../../config/axios";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../../components/Modal/Modal";

function CreateNewPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;
  const otp = location.state?.otp;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !otp) {
      setError(
        "Missing required information. Please go through the password reset process again."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await api.post("/api/create-new-password", {
        email,
        otp,
        newPassword: password,
      });

      setShowSuccessModal(true);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update password");
      console.error("Password update error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    navigate("/auth/signin");
  };

  return (
    <div className="flex flex-col gap-8 max-w-[450px] mx-auto">
      <HeadingDesc
        heading="Create New Password"
        description="Choose a strong and secure password to keep your account safe. Make sure it's easy for you to remember, but hard for others to guess!"
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <InputWithHeading
          heading="Password"
          inputType="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <InputWithHeading
          heading="Re-enter your new password"
          inputType="password"
          placeholder="Enter your new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <Button
          buttonText={loading ? "Updating..." : "Update Password"}
          className=""
          type="submit"
          disabled={loading}
        />
      </form>

      <Modal
        isOpen={showSuccessModal}
        onClose={handleCloseModal}
        title="Password Created!"
        content="Your password has been successfully updated. You can now use your new password to log in."
        buttonText="Okay"
      />
    </div>
  );
}

export default CreateNewPassword;
