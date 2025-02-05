import React, { useState } from 'react';

function Signup() {
  const [fullName, setFullName] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    // Send signup details to backend
    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, contact, password })
    });
    const data = await res.json();
    setMessage(data.message);
    // If an OTP was sent (for mobile), show the OTP verification field
    if (data.otpSent) {
      setOtpSent(true);
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    // Verify the OTP entered by the user
    const res = await fetch('/api/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contact, otp })
    });
    const data = await res.json();
    setVerificationStatus(
      data.success ? 'OTP verified! You can now log in.' : 'OTP verification failed.'
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Create an Account
        </h2>
        <form onSubmit={handleSignup}>
          <div className="mb-5">
            <label className="block text-gray-700 mb-1" htmlFor="fullName">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="John Doe"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block text-gray-700 mb-1" htmlFor="contact">
              Email or Mobile Number
            </label>
            <input
              id="contact"
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="example@mail.com or 1234567890"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block text-gray-700 mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your secure password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Sign Up
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-green-600 font-medium">{message}</p>
        )}
        {otpSent && (
          <form onSubmit={handleOtpVerification} className="mt-6">
            <div className="mb-4">
              <label className="block text-gray-700 mb-1" htmlFor="otp">
                Enter OTP
              </label>
              <input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter the OTP"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
            >
              Verify OTP
            </button>
          </form>
        )}
        {verificationStatus && (
          <p className="mt-4 text-center text-blue-600 font-medium">
            {verificationStatus}
          </p>
        )}
      </div>
    </div>
  );
}

export default Signup;
