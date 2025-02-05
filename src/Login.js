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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700">Email or Mobile Number</label>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
            Login
          </button>
        </form>
        {loginMsg && <p className="mt-4 text-center text-green-600">{loginMsg}</p>}
      </div>
    </div>
  );
}

export default Login;
