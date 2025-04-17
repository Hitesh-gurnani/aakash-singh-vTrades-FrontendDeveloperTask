import { Link, useLocation } from "react-router-dom";

function AuthToggle() {
  const { pathname } = useLocation();
  if (pathname === "/auth/signin") {
    return (
      <div className="text-center text-sm text-[var(--color-white-100)]">
        Don't have an account?{" "}
        <Link to="/auth/signup" className="text-[var(--color-primary-100)]">
          Sign up
        </Link>
      </div>
    );
  }
  return (
    <div className="text-center text-sm text-[var(--color-white-100)]">
      Already have an account?{" "}
      <Link to="/auth/signin" className="text-[var(--color-primary-100)]">
        Sign in
      </Link>
    </div>
  );
}

export default AuthToggle;
