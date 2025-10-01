import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext.jsx';
import { ThemeProvider, useTheme } from './contexts/ThemeContext.jsx';
import Layout from './components/Layout.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import Homepage from './pages/Homepage.jsx';
import BookList from './pages/BookList.jsx';
import BookDetails from './pages/BookDetails.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import StudentDashboard from './pages/StudentDashboard.jsx';
function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/books/:category" element={<BookList />} />
            <Route path="/books/search" element={<BookList />} />
            <Route path="/books/details/:id" element={<BookDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<PrivateRoute><StudentDashboard /></PrivateRoute>} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
