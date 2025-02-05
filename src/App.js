import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';

function App() {
  return (
    <Router>
      <div className="flex justify-center space-x-4 p-4 bg-gray-200">
        <Link to="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
        <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
      </div>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
