import React, { useState } from "react";
import Button from "../../atoms/Button";
import InputWithHeading from "../../atoms/InputWithHeading";
import HeadingDesc from "../../components/HeadingDesc";
import AuthToggle from "../../atoms/AuthToggle";
import { Link, useNavigate } from "react-router-dom";
import api from "../../config/axios";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const isValidConfig = firebaseConfig.apiKey && firebaseConfig.projectId;
const app = isValidConfig ? initializeApp(firebaseConfig) : null;
const auth = app ? getAuth(app) : null;
const googleProvider = new GoogleAuthProvider();

function SignIn() {
  console.log("🔥 Firebase config:", {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/api/signin", {
        email,
        password,
      });
      console.log(response.data, "response.data");
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem("auth_token", response.data.token);
      localStorage.setItem("auth_token", response.data.token);

      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid email or password");
      console.error("Signin error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);

    if (!auth) {
      setError("Firebase authentication is not configured properly");
      setLoading(false);
      return;
    }

    try {
      const result = await signInWithPopup(auth, googleProvider);

      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.idToken;
      const user = result.user;

      const response = await api.post("/api/google-signin", {
        token: token,
        email: user.email,
      });

      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem("auth_token", response.data.token);
      localStorage.setItem("auth_token", response.data.token);

      navigate("/dashboard");
    } catch (err: any) {
      console.error("Google Sign-in error:", err);
      setError(err.message || "Google sign in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <HeadingDesc
        heading="Sign In"
        description="Manage your workspace seamlessly. Sign in to continue."
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <form onSubmit={handleSignIn} className="flex flex-col gap-8">
        <InputWithHeading
          heading="Email Address"
          inputType="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="flex flex-col gap-3">
          <InputWithHeading
            heading="Password"
            inputType="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm text-[var(--color-white-100)]">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </span>
            <Link
              to="/auth/forgot-password"
              className="text-[var(--color-primary-100)] text-xs"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
        <Button
          buttonText={loading ? "Signing In..." : "Sign In"}
          className=""
          type="submit"
          disabled={loading}
        />
      </form>

      <div className="flex items-center">
        <div className="flex-grow h-px bg-gray-600"></div>
        <span className="px-4 text-gray-500 text-sm">or</span>
        <div className="flex-grow h-px bg-gray-600"></div>
      </div>

      <div className="flex flex-col gap-4">
        <Button
          buttonText="Sign in with Google"
          className="bg-[var(--color-primary-400)] flex gap-2 items-center justify-center"
          onClick={handleGoogleSignIn}
          disabled={loading}
        />
        <Button
          buttonText="Sign in with Microsoft"
          className="bg-[var(--color-primary-400)] flex gap-2 items-center justify-center"
        />
      </div>
      <AuthToggle />
    </div>
  );
}

export default SignIn;
