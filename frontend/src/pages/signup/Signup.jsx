import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import Password from "../../components/Password";
import Navbar from "../../components/Navbar/Navbar";
import { validateEmail } from "../../utils/helper";
import { Link } from "react-router-dom";
import axiosInstance from "../../utils/axiosinstance"; 

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Invalid email.");
      return;
    }
    if (!name) {
      setError("Please enter your name.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setError(null);

    try {
      const response = await axiosInstance.post('/create-account', {
        fullName: name,
        email: email,
        password: password,
      });

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate('/dashboard');
      } else if (response.data && response.data.message) {
        setError(response.data.message);
      } else {
        setError('Signup failed. Please try again.');
      }
    } catch (error) {
      console.error("Signup Error:", error);  // Add debug logs
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center mt-28">
        <div className="w-full max-w-md">
          <form onSubmit={handleSignup}>
            <h4 className="text-lg font-semibold">Sign up</h4>

            <input
              type="text"
              placeholder="Name"
              className="input-box mb-4"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="input-box mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-xs pb-2">{error}</p>}

            <button type="submit" className="btn-primary mt-4">
              Create Account
            </button>

            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <Link to='/login' className=' font-medium text-primary underline'>
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
