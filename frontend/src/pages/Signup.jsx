import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
// NOTE: Assuming 'api' (axios instance) is available globally for real API calls

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', studentId: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // --- MOCK SIGNUP LOGIC (Replace with your team's real API call later) ---
      // When integrating the backend, uncomment the lines below and use the correct endpoint:
      /*
      const response = await api.post('/signup', formData);
      setSuccess('Registration successful! Please login to continue.');
      */
      
      // Using mock validation for demonstration
      if (formData.name && formData.studentId && formData.email && formData.password) {
        setSuccess('Registration successful! Please login to continue.');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError('Please fill in all fields.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please check your network connection.');
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="max-w-lg w-full bg-white dark:bg-gray-800 p-12 md:p-16 rounded-3xl shadow-2xl 
                      border-t-8 border-indigo-600 dark:border-indigo-400 
                      transform transition-all duration-500 hover:shadow-indigo-500/30">
          <h1 className="text-5xl font-black text-center text-gray-900 dark:text-white mb-3 tracking-tighter">
            Student Register
          </h1>
          <p className="text-center text-indigo-600 dark:text-indigo-400 text-lg mb-8 font-medium">
            Create your Library Portal account
          </p>
          {error && <div className="bg-red-50 dark:bg-red-900 p-4 rounded-lg mb-4 text-red-700 dark:text-red-200 font-semibold border border-red-300">
            {error}
          </div>}
          {success && <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg mb-4 text-green-700 dark:text-green-200 font-semibold border border-green-300">
            {success}
          </div>}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {['Name', 'Student ID', 'Email', 'Password'].map((label, index) => {
              const fieldName = label.toLowerCase().replace(/\s/g, '');
              const inputType = label === 'Password' ? 'password' : (label === 'Email' ? 'email' : 'text');
              
              return (
                <div key={index}>
                  <label className="block text-lg text-gray-700 dark:text-gray-300 font-extrabold mb-2">{label}</label>
                  <input
                    type={inputType}
                    name={fieldName}
                    value={formData[fieldName]}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 
                               focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-indigo-400 
                               bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-lg transition-colors shadow-inner"
                  />
                </div>
              );
            })}
            <button
              type="submit"
              className="w-full py-4 mt-6 bg-indigo-600 text-white rounded-xl font-black text-xl 
                         hover:bg-indigo-700 transition-all transform hover:scale-[1.01] shadow-lg shadow-indigo-500/50"
            >
              Sign Up
            </button>
          </form>
          <p className="text-center mt-6 text-lg text-gray-600 dark:text-gray-400">
            Already have an account? 
            <Link to="/login" className="text-indigo-500 hover:text-indigo-400 hover:underline font-extrabold ml-2 transition-colors">
              Login here
            </Link>
          </p>
          
        </div>
      </div>
    </Layout>
  );
};

export default Signup;