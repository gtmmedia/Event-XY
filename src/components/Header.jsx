import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold hover:text-blue-200">
          EventApp
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-blue-200">Home</Link>
          </li>
          <li>
            <Link to="/add-event" className="hover:text-blue-200">Add Event</Link>
          </li>
          {/* Add other links like About, Contact if needed */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;