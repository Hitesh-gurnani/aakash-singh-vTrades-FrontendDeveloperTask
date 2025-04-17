import React, { useState } from "react";
import Button from "../../atoms/Button";
import InputWithHeading from "../../atoms/InputWithHeading";
import HeadingDesc from "../../components/HeadingDesc";
import api from "../../config/axios";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await api.post("/api/forgot-password", { email });
      setSuccess("OTP has been sent to your email address");

      setTimeout(() => {
        navigate("/auth/enter-otp", { state: { email } });
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to send OTP");
      console.error("Forgot password error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <HeadingDesc
        heading="Forgot Your Password?"
        description="Don't worry! Enter your email address, and we'll send you an OTP to reset it."
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}
      {success && <div className="text-green-500 text-sm">{success}</div>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <InputWithHeading
          heading="Email Address"
          inputType="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-8"
          required
        />
        <Button
          buttonText={loading ? "Submitting..." : "Submit"}
          className=""
          type="submit"
          disabled={loading}
        />
      </form>
    </div>
  );
}

export default ForgotPassword;
