import React, { useState } from "react";
import Password from "../../components/Password";
import Navbar from "../../components/Navbar/Navbar";
import { validateEmail } from "../../utils/helper";
import { Link } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

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

    // Clear any previous error
    setError(null);

    // Implement signup functionality here
    console.log("Signing up with:", { name, email, password });
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

            <button type="submit" className="btn-primary mt-4">Create Account</button>

            <p className="text-sm text-center mt-4">
                already have an account ? {" "}
                <Link to='/login' className=' font-medium text-primary underline'> Login </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
