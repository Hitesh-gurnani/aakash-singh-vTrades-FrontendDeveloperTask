import { useState, useRef, KeyboardEvent, ChangeEvent, FormEvent } from "react";
import Button from "../../atoms/Button";
import HeadingDesc from "../../components/HeadingDesc";
import api from "../../config/axios";
import { useLocation, useNavigate } from "react-router-dom";

function EnterOtp() {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";

  if (inputRefs.current.length !== 6) {
    inputRefs.current = Array(6).fill(null);
  }

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendOtp = async () => {
    if (!email) {
      setError(
        "Email address is missing. Please go back to the forgot password page."
      );
      return;
    }

    try {
      await api.post("/api/forgot-password", { email });
      setError("");
      alert("New OTP has been sent to your email address");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to resend OTP");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      await api.post("/api/enter-otp", {
        email,
        otp: otpString,
      });

      navigate("/auth/create-new-password", {
        state: { email, otp: otpString },
      });
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid OTP");
      console.error("OTP verification error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeEmail = () => {
    navigate("/auth/forgot-password");
  };

  return (
    <div className="flex flex-col gap-8">
      <HeadingDesc
        heading="Enter OTP"
        description={`Enter the OTP that we have sent to your email address ${
          email || "your email"
        }.`}
      />

      <span
        className="text-[var(--color-primary-100)] text-base font-normal cursor-pointer"
        onClick={handleChangeEmail}
      >
        Change Email Address
      </span>

      {error && <div className="text-red-500 text-sm">{error}</div>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <div className="flex justify-between gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              value={digit}
              ref={(el: any) => (inputRefs.current[index] = el)}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChange(index, e.target.value)
              }
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                handleKeyDown(index, e)
              }
              placeholder="0"
              className="w-12 h-12 text-center text-lg border border-[var(--color-primary-400)] rounded-[10px] bg-[var(--color-primary-300)] text-white focus:border-[var(--color-primary-100)] focus:outline-none placeholder:text-[rgba(133, 137, 139, 0.5)] placeholder:opacity-50"
              maxLength={1}
              required
            />
          ))}
        </div>

        <span
          className="text-[var(--color-primary-100)] text-sm font-normal cursor-pointer"
          onClick={handleResendOtp}
        >
          Resend OTP
        </span>
        <Button
          buttonText={loading ? "Verifying..." : "Continue"}
          className=""
          type="submit"
          disabled={loading}
        />
      </form>
    </div>
  );
}

export default EnterOtp;
