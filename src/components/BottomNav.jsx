import React from 'react';

const BottomNav = ({ currentPage, setCurrentPage }) => {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white shadow-lg md:hidden z-10">
      <ul className="flex justify-around items-center h-16">
        <li className="flex-1">
          <button
            onClick={() => setCurrentPage('home')}
            className={`w-full h-full flex justify-center items-center text-sm font-medium ${
              currentPage === 'home' ? 'text-brand-600' : 'text-muted'
            }`}
          >
            Home
          </button>
        </li>
        <li className="flex-1">
          <button
            onClick={() => setCurrentPage('gallery')}
            className={`w-full h-full flex justify-center items-center text-sm font-medium ${
              currentPage === 'gallery' ? 'text-brand-600' : 'text-muted'
            }`}
          >
            Gallery
          </button>
        </li>
        <li className="flex-1">
          <button
            onClick={() => setCurrentPage('upload')}
            className={`w-full h-full flex justify-center items-center text-sm font-medium ${
              currentPage === 'upload' ? 'text-brand-600' : 'text-muted'
            }`}
          >
            Upload
          </button>
        </li>
        <li className="flex-1">
          <button
            onClick={() => setCurrentPage('archive')}
            className={`w-full h-full flex justify-center items-center text-sm font-medium ${
              currentPage === 'archive' ? 'text-brand-600' : 'text-muted'
            }`}
          >
            Archive
          </button>
        </li>
        <li className="flex-1">
          <button
            onClick={() => setCurrentPage('about')}
            className={`w-full h-full flex justify-center items-center text-sm font-medium ${
              currentPage === 'about' ? 'text-brand-600' : 'text-muted'
            }`}
          >
            About
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default BottomNav;