import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../components/context/AuthContext";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const { createUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const validatePassword = (pw) => {
    const hasUppercase = /[A-Z]/.test(pw);
    const hasLowercase = /[a-z]/.test(pw);
    const minLength = pw.length >= 6;
    return hasUppercase && hasLowercase && minLength;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!createUser) {
      setError("Registration service not available!");
      return;
    }

    if (!validatePassword(password)) {
      setError(
        "Password must contain an uppercase letter, lowercase letter, and at least 6 characters."
      );
      toast.error("Password requirements not met!");
      return;
    }

    try {
      await createUser(email, password, name, photoURL);
      toast.success("Registered successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    if (!signInWithGoogle) {
      setError("Google login not available!");
      toast.error("Google login not available!");
      return;
    }

    try {
      await signInWithGoogle();
      toast.success("Logged in with Google!");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
      setError(err.message);
    }
  };

  return (
    <div className="hero my-10 flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold mb-6">Register now!</h1>

      <div className="card bg-base-100 w-full max-w-[400px] shadow-2xl">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Full Name"
              className="input input-bordered w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Photo URL"
              className="input input-bordered w-full"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="input input-bordered w-full pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>

            {error && <p className="text-red-500 text-sm -mt-2">{error}</p>}

            <button type="submit" className="btn btn-neutral w-full mt-2">
              Register
            </button>
          </form>

          <div className="divider">OR</div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="btn bg-white text-black border w-full flex items-center justify-center gap-2"
          >
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Register with Google
          </button>

          <p className="mt-4 text-center">
            Already have an account?{" "}
            <Link to="/login" className="link link-hover ml-1">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
