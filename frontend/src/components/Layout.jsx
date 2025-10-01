import React from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

const Layout = ({ children }) => (
  <div className="flex flex-col min-h-screen 
    bg-gradient-to-br from-gray-50/50 via-white to-indigo-100/50 
    dark:from-gray-900 dark:to-gray-950 
    text-gray-900 dark:text-gray-100 transition-colors duration-300">
    <Header />
    <main className="flex-grow mt-24 container mx-auto px-4 py-8">
      {children}
    </main>
    <Footer />
  </div>
);

export default Layout;
