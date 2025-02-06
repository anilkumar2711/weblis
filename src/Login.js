import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      console.log(response.data);
      // Handle successful login
    } catch (error) {
      console.error('Login failed', error.response.data);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 ">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Hi, Welcome Back!</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        <hr className="h-px my-8 bg-gray-400 border-0 dark:bg-gray-900"></hr>
        
                  <div>
                  <button
                    className="w-full flex items-center justify-center bg-blue-600 text-white pl-1 py-2 rounded-lg hover:bg-blue-700"
                  >
                     <FaFacebookF className='mr-4'/>
                    <span>Signup With Facebook</span>
                  </button>
                  </div>
        
                  <div>
                  <button
                    className="w-full flex items-center justify-center  mt-4 pl-1 py-2 border rounded-lg"
                  >
                     <FcGoogle className='mr-10'/>
                    <span>Login With Google</span>
                  </button>
                  </div>
                 

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/signup')}
            className="text-blue-600 hover:underline"
          >
            Don't have an account? Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;