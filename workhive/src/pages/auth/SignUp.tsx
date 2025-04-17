import React, { useState } from "react";
import Button from "../../atoms/Button";
import InputWithHeading from "../../atoms/InputWithHeading";
import HeadingDesc from "../../components/HeadingDesc";
import AuthToggle from "../../atoms/AuthToggle";
import api from "../../config/axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/api/signup", {
        email,
        password,
      });

      console.log("Signup successful", response.data);
      navigate("/auth/signin");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to sign up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <HeadingDesc
        heading="Sign Up"
        description="Manage your workspace seamlessly. Sign in to continue."
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <form onSubmit={handleSignUp} className="flex flex-col gap-8">
        <InputWithHeading
          heading="Email Address"
          inputType="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <InputWithHeading
          heading="Password"
          inputType="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <InputWithHeading
          heading="Confirm Password"
          inputType="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <Button
          buttonText={loading ? "Signing Up..." : "Sign Up"}
          className="hover:cursor-pointer"
          type="submit"
          disabled={loading}
        />
      </form>
      <AuthToggle />
    </div>
  );
}

export default SignUp;
