import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';

const StudentDashboard = () => {
  const { user, isAuthReady, token, logout } = useAuth();
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data for demonstration 
  const mockBorrowedBooks = [
    { id: '101', title: 'Power Electronics', borrowDate: '2025-09-10', returnDate: '2025-09-30', token: 'LIB-J9A6Z8' },
    { id: '102', title: 'Introduction to Algorithms', borrowDate: '2025-09-05', returnDate: '2025-10-05', token: 'LIB-K3B5R1' },
    { id: '103', title: 'The Great Gatsby', borrowDate: '2025-09-15', returnDate: '2025-10-15', token: 'LIB-T7C2Z9' },
  ];

  useEffect(() => {
    if (isAuthReady && user) {
      setLoading(true);
      // --- Replace with authenticated API Call later for backend---
      setTimeout(() => {
        setBorrowedBooks(mockBorrowedBooks);
        setLoading(false);
      }, 500);
      // --- End Mock ---
    }
  }, [user, isAuthReady, token]);

  if (!user) {
    return <Layout><div className="text-center text-xl text-red-500">Authentication Required.</div></Layout>;
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-black mb-10 text-center text-gray-900 dark:text-white tracking-tight">
          Welcome, {user.name.split(' ')[0]}!
        </h1>
        
        {/* Profile Card */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl mb-12 border-l-4 border-indigo-600 dark:border-indigo-400">
          <h2 className="text-3xl font-extrabold mb-4 text-indigo-600 dark:text-indigo-400">My Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-3">
            <p className="text-lg text-gray-700 dark:text-gray-300"><strong>Name:</strong> {user.name}</p>
            <p className="text-lg text-gray-700 dark:text-gray-300"><strong>Student ID:</strong> {user.studentId}</p>
            <p className="text-lg text-gray-700 dark:text-gray-300"><strong>Email:</strong> {user.email}</p>
          </div>
        </div>

        {/* Borrowed Books Table */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl">
          <h2 className="text-3xl font-extrabold mb-6 text-gray-900 dark:text-white">Your Borrowed Books</h2>
          {loading ? (
            <div className="text-center text-lg">Loading borrowed books...</div>
          ) : borrowedBooks.length === 0 ? (
            <p className="text-center text-xl text-gray-500 dark:text-gray-400">You currently have no books checked out.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-indigo-50 dark:bg-gray-700 border-b-4 border-indigo-400/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-base font-extrabold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider">Book Title</th>
                    <th className="px-6 py-4 text-left text-base font-extrabold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider">Borrowed On</th>
                    <th className="px-6 py-4 text-left text-base font-extrabold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider">Due Date</th>
                    <th className="px-6 py-4 text-left text-base font-extrabold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider">Unique Token</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {borrowedBooks.map(book => (
                    <tr key={book.id} className="hover:bg-indigo-50/50 dark:hover:bg-gray-700 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-900 dark:text-white">{book.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-600 dark:text-gray-300">{book.borrowDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-lg text-red-600 dark:text-red-400 font-semibold">{book.returnDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-lg font-mono text-indigo-600 dark:text-indigo-400">{book.token}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default StudentDashboard;
