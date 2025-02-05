import React, { useState } from 'react';

function Login() {
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [loginMsg, setLoginMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    // Send login request to backend
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contact, password })
    });
    const data = await res.json();
    setLoginMsg(data.success ? 'Login successful!' : 'Login failed: ' + data.message);
    // In a real app, you might store a JWT and redirect the user upon successful login.
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg border border-gray-300 w-full max-w-sm">
        <h2 className="text-3xl font-logo text-center mb-6">Instagram</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-sm focus:outline-none focus:border-gray-400"
              placeholder="Email or Mobile Number"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-sm focus:outline-none focus:border-gray-400"
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-1 rounded-md hover:bg-blue-600 transition">
            Log in
          </button>
        </form>
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <button className="w-full text-blue-900 font-semibold py-1 rounded-md">
          Log in with Facebook
        </button>
        <p className="mt-4 text-center text-sm text-gray-600">Forgot password?</p>
        {loginMsg && <p className="mt-4 text-center text-sm text-green-600">{loginMsg}</p>}
      </div>
    </div>
  );
}

export default Login;