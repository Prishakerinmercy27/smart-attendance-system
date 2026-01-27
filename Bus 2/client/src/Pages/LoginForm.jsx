import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "student",
  });
const navigate=useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8100/api/auth/login", formData);
      localStorage.setItem('user',JSON.stringify(response.data)) // Update with your backend login endpoint
      console.log("Login successful:", response.data);
      const role=response.data.role
        console.log(role)
        if(role==="driver")
        {
        navigate("/DriverHome")
        }
        else 
        {
          navigate("/home")
        }
      // Handle successful login (e.g., redirect to another page or store token)
    } catch (error) {
      console.error("Error during login:", error);
      // Handle login error (e.g., display an error message)
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100"
    style={{
      backgroundImage: 'url("https://www.dtss.us/blog/wp-content/uploads/2020/11/AdobeStock_122704176.jpeg")',
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>
      <form
        className="bg-black bg-opacity-70 p-6 rounded-lg shadow-lg w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Login</h2>

        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-white text-sm font-bold mb-2">
            Role
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="student">Student</option>
            <option value="driver">Driver</option>
            <option value="parent">Parent</option>
            <option value="staff">Staff</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Login
        </button>
        <p className="w-full text-center text-white mt-4">New member? <a className="text-red-500" href="/register">Signup</a></p>
      </form>
    </div>
  );
};

export default LoginForm;
