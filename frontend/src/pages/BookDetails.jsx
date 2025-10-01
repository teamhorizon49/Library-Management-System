import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
// NOTE: Assuming 'api' is available globally (defined in App.jsx scope)

const BookDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // MOCK DATA FOR DEMONSTRATION 
  const mockBookDetails = {
    // --- B.TECH BRANCHES ---
    'AE1': { id: 'AE1', title: 'Aerodynamics: Theories and Applications', author: 'J.D. Anderson', category: 'Aeronautical Engineering', description: 'Detailed analysis of airfoils, wings, and fluid dynamics in aircraft design.', availability: 'Available' },
    'AE2': { id: 'AE2', title: 'Spacecraft Systems Design', author: 'P. Fortescue', category: 'Aerospace Engineering', description: 'Designing, building, and operating systems in the space environment.', availability: 'Available' },
    'AGR1': { id: 'AGR1', title: 'Fundamentals of Soil Science', author: 'H. D. Foth', category: 'Agricultural Engineering', description: 'The basic science of soil formation, classification, and management for agriculture.', availability: 'Available' },
    'AI1': { id: 'AI1', title: 'Designing Data-Intensive Apps', author: 'M. Kleppmann', category: 'Artificial Intelligence and Data Science', description: 'Explores the complex world of modern data systems and architecture for AI applications.', availability: 'Available' },
    'AUT1': { id: 'AUT1', title: 'Automotive Engineering Fundamentals', author: 'R. K. Rajput', category: 'Automobile Engineering', description: 'Covers engine performance, vehicle dynamics, and chassis design principles.', availability: 'Borrowed' },
    'BCH1': { id: 'BCH1', title: 'Biochemical Engineering Principles', author: 'D. C. Blanchard', category: 'Biochemical Engineering', description: 'Applying engineering principles to biological systems and processes in industry.', availability: 'Available' },
    'BME1': { id: 'BME1', title: 'Biomedical Instrumentation', author: 'R. S. Khandpur', category: 'Biomedical Engineering', description: 'Measurement of physiological variables and medical equipment technology.', availability: 'Available' },
    'BT1': { id: 'BT1', title: 'Introduction to Biotechnology', author: 'W. Thieman', category: 'Biotechnology Engineering', description: 'A fundamental overview of genetic manipulation and bio-process development.', availability: 'Borrowed' },
    'CE1': { id: 'CE1', title: 'Ceramic Materials Science', author: 'M. W. Barsoum', category: 'Ceramic Engineering', description: 'Focuses on the structure and properties of non-metallic solid materials.', availability: 'Available' },
    'CHM1': { id: 'CHM1', title: 'Chemical Process Safety', author: 'D. Crowl', category: 'Chemical Engineering', description: 'Hazard identification and risk management in chemical processing plants.', availability: 'Available' },
    'CIV1': { id: 'CIV1', title: 'Reinforced Concrete Design', author: 'A. Johnson', category: 'Civil Engineering', description: 'Practical manual for designing concrete structures and foundations.', availability: 'Available' },
    'CME1': { id: 'CME1', title: 'Digital Logic and Computer Design', author: 'M. Morris Mano', category: 'Computer Engineering', description: 'Designing digital circuits and understanding the architecture of computers.', availability: 'Available' },
    'CSE1': { id: 'CSE1', title: 'Introduction to Algorithms', author: 'T.H. Cormen', category: 'Computer Science and Engineering', description: 'The fundamental text covering algorithms and data structures.', availability: 'Available' },
    'CSB1': { id: 'CSB1', title: 'IT Strategy and Management', author: 'R. D. Galliers', category: 'Computer Science and Business Systems', description: 'Aligning technology strategies with business goals and management principles.', availability: 'Borrowed' },
    'CON1': { id: 'CON1', title: 'Construction Project Management', author: 'J. M. Levy', category: 'Construction Engineering', description: 'Planning, scheduling, and controlling construction projects efficiently.', availability: 'Available' },
    'CYB1': { id: 'CYB1', title: 'Cybersecurity Principles', author: 'W. Stallings', category: 'Cyber Security Engineering', description: 'Foundational concepts in network security, cryptography, and defense strategies.', availability: 'Borrowed' },
    'DS1': { id: 'DS1', title: 'Data Science Handbook', author: 'O. B. K.', category: 'Data Science Engineering', description: 'A complete reference for data preparation, modeling, and visualization.', availability: 'Available' },
    'ECE1': { id: 'ECE1', title: 'Microprocessors and Interfacing', author: 'D. V. Hall', category: 'Electrical and Computer Engineering', description: 'Understanding hardware components and interfacing them with software.', availability: 'Available' },
    'EEE1': { id: 'EEE1', title: 'Power Electronics', author: 'M. H. Rashid', category: 'Electrical and Electronics Engineering', description: 'Control and conversion of electrical power using solid-state electronics.', availability: 'Available' },
    'EIE1': { id: 'EIE1', title: 'Industrial Instrumentation', author: 'S. K. Singh', category: 'Electrical and Instrumentation Engineering', description: 'Measuring and controlling process variables in industrial automation.', availability: 'Available' },
    'ELE1': { id: 'ELE1', title: 'Circuit Analysis Fundamentals', author: 'C. Alexander', category: 'Electrical Engineering', description: 'Comprehensive guide to solving DC and AC circuits.', availability: 'Available' },
    'ECOM1': { id: 'ECOM1', title: 'Digital Signal Processing', author: 'J. G. Proakis', category: 'Electronics and Communication Engineering', description: 'Theory and application of signal processing techniques in digital form.', availability: 'Borrowed' },
    'ENV1': { id: 'ENV1', title: 'Environmental Pollution Control', author: 'J. W. Eckenfelder', category: 'Environmental Engineering', description: 'Methods for managing and reducing air and water pollution.', availability: 'Available' },
    'FASH1': { id: 'FASH1', title: 'Textile Science', author: 'E. P. G. G.', category: 'Fashion Technology', description: 'The scientific principles behind fabric properties and manufacturing.', availability: 'Available' },
    'FOOD1': { id: 'FOOD1', title: 'Food Process Engineering', author: 'D. R. Heldman', category: 'Food Technology', description: 'Applying engineering principles to food processing and preservation.', availability: 'Available' },
    'GEN1': { id: 'GEN1', title: 'Molecular Biology of the Gene', author: 'J. D. Watson', category: 'Genetic Engineering', description: 'Covers DNA structure, gene expression, and genetic engineering techniques.', availability: 'Borrowed' },
    'IPE1': { id: 'IPE1', title: 'Operations Research', author: 'H. A. Taha', category: 'Industrial and Production Engineering', description: 'Mathematical models for decision-making and resource allocation.', availability: 'Available' },
    'IE1': { id: 'IE1', title: 'Introduction to Industrial Engineering', author: 'B. S. Blanchard', category: 'Industrial Engineering', description: 'Optimizing complex processes, systems, and organizations for efficiency.', availability: 'Available' },
    'IT1': { id: 'IT1', title: 'Network Security Essentials', author: 'W. Stallings', category: 'Information Technology Engineering', description: 'Covers essential topics in secure network communication and defense.', availability: 'Available' },
    'INST1': { id: 'INST1', title: 'Control Systems Engineering', author: 'N. S. Nise', category: 'Instrumentation Engineering', description: 'Design and analysis of feedback control systems and instrumentation.', availability: 'Available' },
    'LTHR1': { id: 'LTHR1', title: 'Chemistry of Leather', author: 'K. S. R.', category: 'Leather Technology', description: 'Chemical processes and engineering aspects of leather production.', availability: 'Borrowed' },
    'ML1': { id: 'ML1', title: 'Deep Learning with Python', author: 'F. Chollet', category: 'Machine Learning Engineering', description: 'Practical deep learning applications using Keras and TensorFlow.', availability: 'Available' },
    'MAR1': { id: 'MAR1', title: 'Marine Diesel Engines', author: 'D. C. G.', category: 'Marine Engineering', description: 'Operation, maintenance, and thermodynamics of marine propulsion systems.', availability: 'Available' },
    'MAT1': { id: 'MAT1', title: 'Materials Science and Engineering', author: 'W. Callister', category: 'Materials Engineering', description: 'Structure, properties, and processing of materials.', availability: 'Available' },
    'MECH1': { id: 'MECH1', title: 'Elements of Thermodynamics', author: 'J. Smith', category: 'Mechanical Engineering', description: 'A detailed look at energy, entropy, and heat transfer principles.', availability: 'Borrowed' },
    'MECR1': { id: 'MECR1', title: 'Introduction to Mechatronics', author: 'D. G. Alciatore', category: 'Mechatronics Engineering', description: 'Integration of mechanical, electrical, and computer engineering systems.', availability: 'Available' },
    'MET1': { id: 'MET1', title: 'Principles of Extractive Metallurgy', author: 'H. S. H.', category: 'Metallurgical Engineering', description: 'Extraction, refining, and alloying of metals.', availability: 'Available' },
    'MIN1': { id: 'MIN1', title: 'Surface Mining Technology', author: 'B. H. G.', category: 'Mining Engineering', description: 'Techniques and equipment used in surface mining operations.', availability: 'Available' },
    'NAV1': { id: 'NAV1', title: 'Naval Architecture Design', author: 'E. C. Tupper', category: 'Naval Architecture and Ocean Engineering', description: 'The science and design of ships, boats, and other marine structures.', availability: 'Borrowed' },
    'NUC1': { id: 'NUC1', title: 'Introduction to Nuclear Engineering', author: 'L. E. L.', category: 'Nuclear Engineering', description: 'Covers reactor theory, radiation, and nuclear power generation.', availability: 'Available' },
    'PET1': { id: 'PET1', title: 'Petroleum Geology', author: 'P. North', category: 'Petroleum Engineering', description: 'Exploration methods and geological principles of oil and gas reserves.', availability: 'Borrowed' },
    'PROD1': { id: 'PROD1', title: 'Manufacturing Process Analysis', author: 'S. N. P.', category: 'Production Engineering', description: 'Analyzing and optimizing manufacturing processes for efficiency.', availability: 'Available' },
    'ROB1': { id: 'ROB1', title: 'Principles of Robotics', author: 'J.J. Craig', category: 'Robotics Engineering', description: 'Covers robot kinematics, dynamics, and control systems.', availability: 'Available' },
    'SW1': { id: 'SW1', title: 'Software Engineering at Google', author: 'T. B. et al.', category: 'Software Engineering', description: 'Insights into Google\'s practices for writing, testing, and maintaining code.', availability: 'Available' },
    'TEX1': { id: 'TEX1', title: 'Textile Manufacturing Processes', author: 'V. K. K.', category: 'Textile Engineering', description: 'From fiber preparation to weaving and finishing of fabrics.', availability: 'Borrowed' },
    'TRAN1': { id: 'TRAN1', title: 'Transportation Engineering', author: 'L. F. G.', category: 'Transportation Engineering', description: 'Planning, design, operation, and maintenance of transport systems.', availability: 'Available' },

    // --- GENERAL & ACADEMIC CATEGORIES ---
    'BUS1': { id: 'BUS1', title: 'The 7 Habits of Highly Effective People', author: 'S. Covey', category: 'Business', description: 'A paradigm-shifting guide to personal and professional effectiveness.', availability: 'Available' },
    'LIT1': { id: 'LIT1', title: 'To Kill a Mockingbird', author: 'H. Lee', category: 'Literature', description: 'A profound exploration of justice and racial prejudice in the American South.', availability: 'Available' },
    'NON1': { id: 'NON1', title: 'A Short History of Nearly Everything', author: 'B. Bryson', category: 'Nonfiction', description: 'An accessible tour of science from the Big Bang to the rise of civilization.', availability: 'Borrowed' },
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setBook(mockBookDetails[id]);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleBorrow = () => {
    if (!user) {
      navigate('/login');
    } else {
      const uniqueToken = 'LIB-' + Math.random().toString(36).substr(2, 9).toUpperCase();
      alert(`Borrow successful! Your token is: ${uniqueToken}. You will be redirected to the dashboard.`);
      navigate('/dashboard');
    }
  };

  if (loading) {
    return <Layout>
        <div className="flex justify-center items-center h-40">
            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="ml-3 text-lg">Loading data...</p>
        </div></Layout>;
  }

  if (!book) {
    return <Layout><div className="text-center text-xl text-red-500">Book not found.</div></Layout>;
  }

  return (
    <Layout>
      <div className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-3xl shadow-2xl max-w-3xl mx-auto border-t-8 border-indigo-600 dark:border-indigo-400">
        
        {/* Title and Author */}
        <h1 className="text-4xl font-black mb-1 text-gray-900 dark:text-white tracking-tight">{book.title}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">by <span className="font-semibold text-indigo-600 dark:text-indigo-400">{book.author}</span></p>
        
        <div className="space-y-6">
            
            {/* Metadata (Category & Status) */}
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-3">
                <span className="text-lg font-medium text-gray-700 dark:text-gray-300">Category:</span>
                <span className="text-lg font-bold text-gray-900 dark:text-white">{book.category}</span>
            </div>

            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-3">
                <span className="text-lg font-medium text-gray-700 dark:text-gray-300">Availability Status:</span>
                <span className={`text-xl font-black ${
                    book.availability === 'Available' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}>
                    {book.availability}
                </span>
            </div>

            {/* Description */}
            <div>
                <h3 className="text-2xl font-extrabold mb-3 text-gray-900 dark:text-white">Summary</h3>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-inner">
                    {book.description}
                </p>
            </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4 mt-8">
          <button
            onClick={() => window.history.back()}
            className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-4 px-6 rounded-xl font-bold text-lg 
                       hover:bg-gray-300 dark:hover:bg-gray-600 transition-all transform hover:scale-[1.01] shadow-md"
          >
            Go Back
          </button>
          <button
            onClick={handleBorrow}
            disabled={book.availability !== 'Available'}
            className={`flex-1 py-4 px-6 rounded-xl font-black text-lg transition-all transform hover:scale-[1.01] shadow-lg ${
              book.availability === 'Available'
                ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-500/50'
                : 'bg-gray-400 text-gray-600 cursor-not-allowed shadow-none'
            }`}
          >
            Borrow Book
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default BookDetails;
