import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/auth/register", {
        username,
        email,
        password,
      });
      alert("Registration successful");
      navigate("/");
    } catch (error) {
      alert("Error registering user");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-4 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Register</h1>
        <form
          className="flex flex-col border-2 border-sky-400 rounded-xl p-6 bg-white shadow-lg"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label className="text-lg text-gray-500 mb-2 block">Username</label>
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              className="border-2 border-gray-300 px-4 py-2 w-full rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-lg text-gray-500 mb-2 block">Email</label>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 border-gray-300 px-4 py-2 w-full rounded-md"
              required
            />
          </div>
          <div className="mb-6">
            <label className="text-lg text-gray-500 mb-2 block">Password</label>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 border-gray-300 px-4 py-2 w-full rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="p-2 bg-sky-500 rounded-md text-white font-bold hover:bg-sky-600 transition duration-200"
          >
            Register
          </button>
        </form>
        <p className="text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-sky-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
