import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

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
  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/google', {
        token: credentialResponse.credential,
      });
      console.log('Google Login Success:', response.data);
      navigate('/'); // Redirect to home or dashboard after successful login
    } catch (error) {
      console.error('Google Login Failed:', error.response.data);
    }
  };

  const handleGoogleLoginFailure = () => {
    console.error('Google Login Failed');
  };
  return (
    <div className="flex h-screen" style={{ backgroundImage: "url('')" }}>
      <div className="w-1/2 hidden md:block">
        <img 
          src="https://img.freepik.com/free-vector/business-logo_23-2147503133.jpg?t=st=1738898296~exp=1738901896~hmac=2bac051b338811aa716312095334dd74599ad0b2ef5b7df57dabbf12f7882395&w=740" 
          alt="Login Background" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-200">
      {/* style={{background:"URL('')"}} */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md" >
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
                    className="w-full flex items-center justify-center bg-blue-600 text-white mb-4 pl-1 py-2 rounded-lg hover:bg-blue-700"
                  >
                     <FaFacebookF className='mr-4'/>
                    <span>Signup With Facebook</span>
                  </button>
                  </div>
        
                  <div>
          <GoogleOAuthProvider clientId="334970627820-r857almbuk5rjvjocem5pj1odothipt0.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginFailure}
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  className="w-full flex items-center justify-center mt-4 pl-1 py-2 border rounded-lg"
                >
                  <FcGoogle className='mr-10' />
                  <span>Login With Google</span>
                </button>
              )}
            />
          </GoogleOAuthProvider>
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
    </div>
  );
};

export default Login;