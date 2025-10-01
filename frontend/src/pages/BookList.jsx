import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import { useAuth } from '../contexts/AuthContext.jsx'; 
// Note: Assuming 'api' from axios setup is available in the component's scope.

const BookList = () => {
  const { category } = useParams();
  const location = useLocation();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const query = new URLSearchParams(location.search).get('q');
  
  // MOCK DATA: Includes at least one book for every B.Tech category
  const mockBooks = [
    // Core Engineering
    { id: 'AE1', title: 'Aerodynamics: Theories and Applications', author: 'J.D. Anderson', availability: 'Available', category: 'aeronautical-engineering' },
    { id: 'AE2', title: 'Spacecraft Systems Design', author: 'P. Fortescue', availability: 'Available', category: 'aerospace-engineering' },
    { id: 'AGR1', title: 'Fundamentals of Soil Science', author: 'H. D. Foth', availability: 'Available', category: 'agricultural-engineering' },
    { id: 'AI1', title: 'Designing Data-Intensive Apps', author: 'M. Kleppmann', availability: 'Available', category: 'artificial-intelligence-and-data-science' },
    { id: 'AUT1', title: 'Automotive Engineering Fundamentals', author: 'R. K. Rajput', availability: 'Borrowed', category: 'automobile-engineering' },
    { id: 'BCH1', title: 'Biochemical Engineering Principles', author: 'D. C. Blanchard', availability: 'Available', category: 'biochemical-engineering' },
    { id: 'BME1', title: 'Biomedical Instrumentation', author: 'R. S. Khandpur', availability: 'Available', category: 'biomedical-engineering' },
    { id: 'BT1', title: 'Introduction to Biotechnology', author: 'W. Thieman', availability: 'Borrowed', category: 'biotechnology-engineering' },
    { id: 'CE1', title: 'Ceramic Materials Science', author: 'M. W. Barsoum', availability: 'Available', category: 'ceramic-engineering' },
    { id: 'CHM1', title: 'Chemical Process Safety', author: 'D. Crowl', availability: 'Available', category: 'chemical-engineering' },
    { id: 'CIV1', title: 'Reinforced Concrete Design', author: 'A. Johnson', availability: 'Available', category: 'civil-engineering' },
    { id: 'CME1', title: 'Digital Logic and Computer Design', author: 'M. Morris Mano', availability: 'Available', category: 'computer-engineering' },
    { id: 'CSE1', title: 'Introduction to Algorithms', author: 'T.H. Cormen', availability: 'Available', category: 'computer-science-and-engineering' },
    { id: 'CSB1', title: 'IT Strategy and Management', author: 'R. D. Galliers', availability: 'Borrowed', category: 'computer-science-and-business-systems' },
    { id: 'CON1', title: 'Construction Project Management', author: 'J. M. Levy', availability: 'Available', category: 'construction-engineering' },
    { id: 'CYB1', title: 'Cybersecurity Principles', author: 'W. Stallings', availability: 'Borrowed', category: 'cyber-security-engineering' },
    { id: 'DS1', title: 'Data Science Handbook', author: 'O. B. K.', availability: 'Available', category: 'data-science-engineering' },
    { id: 'ECE1', title: 'Microprocessors and Interfacing', author: 'D. V. Hall', availability: 'Available', category: 'electrical-and-computer-engineering' },
    { id: 'EEE1', title: 'Power Electronics', author: 'M. H. Rashid', availability: 'Available', category: 'electrical-and-electronics-engineering' },
    { id: 'EIE1', title: 'Industrial Instrumentation', author: 'S. K. Singh', availability: 'Available', category: 'electrical-and-instrumentation-engineering' },
    { id: 'ELE1', title: 'Circuit Analysis Fundamentals', author: 'C. Alexander', availability: 'Available', category: 'electrical-engineering' },
    { id: 'ECOM1', title: 'Digital Signal Processing', author: 'J. G. Proakis', availability: 'Borrowed', category: 'electronics-and-communication-engineering' },
    { id: 'ENV1', title: 'Environmental Pollution Control', author: 'J. W. Eckenfelder', availability: 'Available', category: 'environmental-engineering' },
    { id: 'FASH1', title: 'Textile Science', author: 'E. P. G. G.', availability: 'Available', category: 'fashion-technology' },
    { id: 'FOOD1', title: 'Food Process Engineering', author: 'D. R. Heldman', availability: 'Available', category: 'food-technology' },
    { id: 'GEN1', title: 'Molecular Biology of the Gene', author: 'J. D. Watson', availability: 'Borrowed', category: 'genetic-engineering' },
    { id: 'IPE1', title: 'Operations Research', author: 'H. A. Taha', availability: 'Available', category: 'industrial-and-production-engineering' },
    { id: 'IE1', title: 'Introduction to Industrial Engineering', author: 'B. S. Blanchard', availability: 'Available', category: 'industrial-engineering' },
    { id: 'IT1', title: 'Network Security Essentials', author: 'W. Stallings', availability: 'Available', category: 'information-technology-engineering' },
    { id: 'INST1', title: 'Control Systems Engineering', author: 'N. S. Nise', availability: 'Available', category: 'instrumentation-engineering' },
    { id: 'LTHR1', title: 'Chemistry of Leather', author: 'K. S. R.', availability: 'Borrowed', category: 'leather-technology' },
    { id: 'ML1', title: 'Deep Learning with Python', author: 'F. Chollet', availability: 'Available', category: 'machine-learning-engineering' },
    { id: 'MAR1', title: 'Marine Diesel Engines', author: 'D. C. G.', availability: 'Available', category: 'marine-engineering' },
    { id: 'MAT1', title: 'Materials Science and Engineering', author: 'W. Callister', availability: 'Available', category: 'materials-engineering' },
    { id: 'MECH1', title: 'Elements of Thermodynamics', author: 'J. Smith', availability: 'Borrowed', category: 'mechanical-engineering' },
    { id: 'MECR1', title: 'Introduction to Mechatronics', author: 'D. G. Alciatore', availability: 'Available', category: 'mechatronics-engineering' },
    { id: 'MET1', title: 'Principles of Extractive Metallurgy', author: 'H. S. H.', availability: 'Available', category: 'metallurgical-engineering' },
    { id: 'MIN1', title: 'Surface Mining Technology', author: 'B. H. G.', availability: 'Available', category: 'mining-engineering' },
    { id: 'NAV1', title: 'Naval Architecture Design', author: 'E. C. Tupper', availability: 'Borrowed', category: 'naval-architecture-and-ocean-engineering' },
    { id: 'NUC1', title: 'Introduction to Nuclear Engineering', author: 'L. E. L.', availability: 'Available', category: 'nuclear-engineering' },
    { id: 'PET1', title: 'Petroleum Geology', author: 'P. North', availability: 'Borrowed', category: 'petroleum-engineering' },
    { id: 'PROD1', title: 'Manufacturing Process Analysis', author: 'S. N. P.', availability: 'Available', category: 'production-engineering' },
    { id: 'ROB1', title: 'Principles of Robotics', author: 'J.J. Craig', availability: 'Available', category: 'robotics-engineering' },
    { id: 'SW1', title: 'Software Engineering at Google', author: 'T. B. et al.', availability: 'Available', category: 'software-engineering' },
    { id: 'TEX1', title: 'Textile Manufacturing Processes', author: 'V. K. K.', availability: 'Borrowed', category: 'textile-engineering' },
    { id: 'TRAN1', title: 'Transportation Engineering', author: 'L. F. G.', availability: 'Available', category: 'transportation-engineering' },

    // --- GENERAL & ACADEMIC CATEGORIES ---
    { id: 'BUS1', title: 'The 7 Habits of Highly Effective People', author: 'S. Covey', availability: 'Available', category: 'business' },
    { id: 'LIT1', title: 'To Kill a Mockingbird', author: 'H. Lee', availability: 'Available', category: 'literature' },
    { id: 'NON1', title: 'A Short History of Nearly Everything', author: 'B. Bryson', availability: 'Borrowed', category: 'nonfiction' },
  ];

  useEffect(() => {
    setLoading(true);
    
    // --- MOCK DATA FILTERING LOGIC (Replace with Axios API Call) ---
    setTimeout(() => {
      let filteredBooks = mockBooks;
      
      // Filter by URL category (converted to lowercase hyphenated format)
      if (category) {
        filteredBooks = mockBooks.filter(book => 
          book.category === category
        );
      }
      
      // Filter by search query from Header
      if (query) {
        filteredBooks = filteredBooks.filter(book => 
          book.title.toLowerCase().includes(query.toLowerCase()) || 
          book.author.toLowerCase().includes(query.toLowerCase())
        );
      }
      
      setBooks(filteredBooks);
      setLoading(false);
    }, 500);
    // --- END MOCK DATA FILTERING ---

  }, [category, query]);
  const displayTitle = query 
    ? `Search Results for "${query}"` 
    : `${(category || 'All').split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Books`;

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-40">
            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="ml-3 text-lg text-gray-700 dark:text-gray-300">Loading book catalog...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-8 text-center">{displayTitle}</h1>
      {books.length === 0 ? (
        <p className="text-center text-xl text-red-500 dark:text-red-400">No books found matching this filter or category.</p>
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow-2xl">
          <table className="min-w-full">
            <thead className="bg-indigo-50 dark:bg-gray-700 border-b-4 border-indigo-400/50">
              <tr>
                <th className="px-6 py-4 text-left text-base font-extrabold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider">Title</th>
                <th className="px-6 py-4 text-left text-base font-extrabold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider">Author</th>
                <th className="px-6 py-4 text-left text-base font-extrabold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider">Availability</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {books.map((book) => (
                <tr 
                  key={book.id} 
                  className="hover:bg-indigo-50/50 dark:hover:bg-gray-700 transition-colors cursor-pointer transform hover:scale-[1.005]"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-900 dark:text-white">
                    <Link 
                      to={`/books/details/${book.id}`} 
                      className="text-indigo-600 dark:text-indigo-400 hover:underline hover:font-semibold transition-colors"
                    >
                      {book.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-600 dark:text-gray-300">{book.author}</td>
                  {/* Availability Badge */}
                  <td className="px-6 py-4 whitespace-nowrap text-base">
                    <span className={`px-3 py-1 inline-flex text-base leading-5 font-semibold rounded-full shadow-md ${
                      book.availability === 'Available' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-50' 
                        : 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-50'
                    }`}>
                      {book.availability}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
};

export default BookList;
