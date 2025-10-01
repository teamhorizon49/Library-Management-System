import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout.jsx';

const Homepage = () => {
  const categories = [
    // --- B.TECH BRANCHES (Alphabetically Sorted) ---
    { name: 'Aeronautical Engineering', description: 'Design, construction, and maintenance of aircraft.' },
    { name: 'Aerospace Engineering', description: 'Aircraft and spacecraft design, aerodynamics, and propulsion.' },
    { name: 'Agricultural Engineering', description: 'Technology solutions for food production and land use.' },
    { name: 'Artificial Intelligence and Data Science', description: 'Machine learning, deep learning models, and predictive analytics.' },
    { name: 'Automobile Engineering', description: 'Vehicle design, engine performance, and transportation systems.' },
    { name: 'Biochemical Engineering', description: 'Applying engineering principles to biological systems and processes.' },
    { name: 'Biomedical Engineering', description: 'Medical device development, biological systems, and clinical engineering.' },
    { name: 'Biotechnology Engineering', description: 'Genetic engineering, bio-process development, and molecular biology.' },
    { name: 'Ceramic Engineering', description: 'Materials science focused on non-metallic solids.' },
    { name: 'Chemical Engineering', description: 'Process design, materials conversion, and industrial production.' },
    { name: 'Civil Engineering', description: 'Structural design, construction, and materials science.' },
    { name: 'Computer Engineering', description: 'Hardware-software integration and embedded systems.' },
    { name: 'Computer Science and Engineering', description: 'Algorithms, data structures, and fundamental computing concepts.' },
    { name: 'Computer Science and Business Systems', description: 'Intersection of technology and business process management.' },
    { name: 'Construction Engineering', description: 'Planning, design, and management of infrastructure projects.' },
    { name: 'Cyber Security Engineering', description: 'Network protection, ethical hacking, and risk management.' },
    { name: 'Data Science Engineering', description: 'Big data processing, visualization, and statistical analysis.' },
    { name: 'Electrical and Computer Engineering', description: 'Combines electrical engineering and computer systems design.' },
    { name: 'Electrical and Electronics Engineering', description: 'Hybrid topics covering power systems and electronics.' },
    { name: 'Electrical and Instrumentation Engineering', description: 'Measurement, control, and automation of processes.' },
    { name: 'Electrical Engineering', description: 'Circuits, power systems, and electromagnetics.' },
    { name: 'Electronics and Communication Engineering', description: 'Digital signal processing, microprocessors, and wireless communication.' },
    { name: 'Environmental Engineering', description: 'Solutions for water quality, pollution control, and sustainability.' },
    { name: 'Fashion Technology', description: 'Application of science and technology in the apparel industry.' },
    { name: 'Food Technology', description: 'Food processing, preservation, and quality control.' },
    { name: 'Genetic Engineering', description: 'Manipulation of an organism\'s genes.' },
    { name: 'Industrial and Production Engineering', description: 'Optimization of complex processes, systems, and organizations.' },
    { name: 'Industrial Engineering', description: 'Improving efficiency in manufacturing and service systems.' },
    { name: 'Information Technology Engineering', description: 'Information systems, network security, and database management.' },
    { name: 'Instrumentation Engineering', description: 'Design and function of measuring and control instruments.' },
    { name: 'Leather Technology', description: 'Chemical processes and engineering aspects of leather production.' },
    { name: 'Machine Learning Engineering', description: 'Statistical models, neural networks, and AI implementation.' },
    { name: 'Marine Engineering', description: 'Ship machinery operation and maintenance.' },
    { name: 'Materials Engineering', description: 'Development and testing of new materials.' },
    { name: 'Mechanical Engineering', description: 'Thermodynamics, robotics, and fluid mechanics.' },
    { name: 'Mechatronics Engineering', description: 'Synergy of mechanical, electrical, and computer engineering.' },
    { name: 'Metallurgical Engineering', description: 'Extraction, processing, and application of metals.' },
    { name: 'Mining Engineering', description: 'Extraction of minerals from the earth.' },
    { name: 'Naval Architecture and Ocean Engineering', description: 'Design of ships, boats, and other marine structures.' },
    { name: 'Nuclear Engineering', description: 'Application of nuclear fission and fusion processes.' },
    { name: 'Petroleum Engineering', description: 'Exploration, production, and transportation of crude oil and gas.' },
    { name: 'Production Engineering', description: 'Manufacturing methods, automation, and industrial systems.' },
    { name: 'Robotics Engineering', description: 'Design, construction, and operation of robots.' },
    { name: 'Software Engineering', description: 'Development methodologies, software architecture, and testing.' },
    { name: 'Textile Engineering', description: 'Manufacturing and processing of fibers and fabrics.' },
    { name: 'Transportation Engineering', description: 'Planning, design, operation, and maintenance of transport systems.' },

    // --- GENERAL & ACADEMIC CATEGORIES (Your Existing, Sorted Alphabetically) ---
    { name: 'Business', description: 'Books on finance, marketing, management, and entrepreneurship.' },
    { name: 'Literature', description: 'Classic novels, modern fiction, poetry, and literary criticism.' },
    { name: 'Nonfiction', description: 'Biographies, history, science, and general knowledge books.' },
  ];

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 tracking-tighter text-gray-900 dark:text-white">
          Discover Books by Category
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">
          Explore our vast collection and find your next great read.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 md:gap-8">
        {categories.map((category) => (
          <Link
            key={category.name}
            to={`/books/${category.name.toLowerCase().replace(/\s/g, '-')}`}
            className="group flex flex-col items-center justify-center text-center w-full py-12 px-10 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-xl hover:shadow-2xl 
              transform hover:scale-[1.02] transition-all duration-300 border-2 border-transparent hover:border-indigo-500"
          >
            <span className="text-5xl text-indigo-600 dark:text-indigo-400">📖</span>
            <h2 className="text-xl md:text-2xl font-extrabold mt-4 text-gray-900 dark:text-white">{category.name}</h2>
            <p className="text-base text-gray-600 dark:text-gray-400 mt-2 hidden sm:block">{category.description}</p>
          </Link>
        ))}
      </div>
    </Layout>
  );
};
export default Homepage;
