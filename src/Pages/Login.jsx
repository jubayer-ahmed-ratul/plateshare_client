import React, { useState, useContext } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { AuthContext } from "../components/context/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Get redirect path after login, default "/"
  const from = location.state?.from || "/";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields!");
      return;
    }

    signInUser(email, password)
      .then(() => {
        toast.success("Logged in successfully!");
        setEmail("");
        setPassword("");
        navigate(from, { replace: true }); // redirect to original target
      })
      .catch((err) => {
        toast.error(err.message || "Login failed. Try again.");
      });
  };

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then(() => {
        toast.success("Logged in with Google!");
        navigate(from, { replace: true }); // redirect to original target
      })
      .catch((err) => toast.error(err.message || "Google login failed."));
  };

  return (
    <div className="hero my-10 flex flex-col items-center justify-center">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-10 text-center text-green-900 mt-5">Login now!</h1>

      <div className="card bg-base-100 w-full max-w-[400px] shadow-2xl">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <label className="label">Email</label>
            <input
              type="email"
              className="auth-input input w-full"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label className="label">Password</label>
            <input
              type="password"
              className="auth-input input w-full"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit" className="auth-button btn btn-primary mt-4 w-full">
              Login
            </button>

            {/* Demo Credential Button */}
            <button
              type="button"
              onClick={() => {
                setEmail("ratul@gmail.com");
                setPassword("rAtul12#");
                toast.info("Demo credentials filled! Click Login to continue.");
              }}
              className="btn btn-outline btn-secondary mt-2 w-full"
            >
              🎯 Use Demo Credentials
            </button>

            <div className="divider">OR</div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="google-auth-btn btn bg-white text-black border-[#e5e5e5] w-full flex items-center justify-center gap-2"
            >
              {/* Google logo SVG */}
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
              Login with Google
            </button>

            <p className="mt-4 text-center">
              Don’t have an account?{" "}
              <Link to="/register" className="link link-hover ml-1">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
