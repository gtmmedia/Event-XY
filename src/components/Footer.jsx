import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-700 text-white text-center p-4 mt-auto">
      <div className="container mx-auto">
        © {currentYear} EventApp. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;