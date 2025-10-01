import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
// NOTE: Assuming 'api' (axios instance) is available in the component's scope.

const Login = () => {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // --- MOCK LOGIN LOGIC (Replace with real API call later) ---
      if (studentId === 'student123' && password === 'password123') {
        const mockUser = { name: 'Snigdha', studentId: 'student123', email: 'snigdha@example.com' };
        const mockToken = 'mock_jwt_token_for_student_123';
        login(mockUser, mockToken);
        navigate('/dashboard');
      } else {
        setError('Invalid Student ID or password.');
      }
    } catch (err) {
      // This will catch real network errors if you connect the API
      setError('Login failed. Please check your network connection or credentials.');
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="max-w-lg w-full bg-white dark:bg-gray-800 p-12 md:p-16 rounded-3xl shadow-2xl 
                      border-t-8 border-indigo-600 dark:border-indigo-400 
                      transform transition-all duration-500 hover:shadow-indigo-500/30">
          <h1 className="text-5xl font-black text-center text-gray-900 dark:text-white mb-3 tracking-tighter">
            Student Login
          </h1>
          <p className="text-center text-indigo-600 dark:text-indigo-400 text-lg mb-10 font-medium">
            Access your Library Portal Dashboard
          </p>
          {error && <div className="bg-red-50 dark:bg-red-900 p-4 rounded-lg mb-6 text-red-700 dark:text-red-200 font-semibold border border-red-300 transition-opacity duration-300">
            {error}
          </div>}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xl text-gray-700 dark:text-gray-300 font-extrabold mb-2">Student ID</label>
              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                required
                className="w-full px-5 py-4 rounded-xl border-2 border-gray-300 dark:border-gray-600 
                           focus:outline-none focus:ring-4 focus:ring-indigo-500/50 dark:focus:ring-indigo-400/50 
                           bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-xl transition-colors shadow-inner"
              />
            </div>
            <div>
              <label className="block text-xl text-gray-700 dark:text-gray-300 font-extrabold mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-5 py-4 rounded-xl border-2 border-gray-300 dark:border-gray-600 
                           focus:outline-none focus:ring-4 focus:ring-indigo-500/50 dark:focus:ring-indigo-400/50 
                           bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-xl transition-colors shadow-inner"
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 mt-8 bg-indigo-600 text-white rounded-xl font-black text-xl 
                         hover:bg-indigo-700 transition-all transform hover:scale-[1.01] shadow-lg shadow-indigo-500/50"
            >
              Log In
            </button>
          </form>
          <p className="text-center mt-8 text-lg text-gray-600 dark:text-gray-400">
            New student? 
            <Link to="/signup" className="text-indigo-500 hover:text-indigo-400 hover:underline font-extrabold ml-2 transition-colors">
              Sign Up here
            </Link>
          </p>
          
        </div>
      </div>
    </Layout>
  );
};

export default Login;
