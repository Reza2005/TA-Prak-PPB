import React, { useState } from "react";

export default function Navbar({ setCurrentPage, currentPage }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const linkClass = (page) =>
    `text-sm font-medium px-2 py-1 rounded ${
      currentPage === page
        ? "text-blue-600 bg-blue-50"
        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
    }`;

  return (
    <nav className="w-full bg-white shadow-sm px-4 md:px-10 py-3 fixed top-0 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex-shrink-0" />
          <h1 className="text-lg md:text-xl font-semibold">
            Meme <span className="text-blue-500">Archive</span>
          </h1>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <button
            type="button"
            onClick={() => setCurrentPage("home")}
            className={linkClass("home")}
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => setCurrentPage("gallery")}
            className={linkClass("gallery")}
          >
            Gallery
          </button>
          <button
            type="button"
            onClick={() => setCurrentPage("archive")}
            className={linkClass("archive")}
          >
            Archive
          </button>
          <button
            type="button"
            onClick={() => setCurrentPage("about")}
            className={linkClass("about")}
          >
            Profile
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setCurrentPage("upload")}
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
          >
            + Add Meme
          </button>

          <button
            className="md:hidden p-2 rounded text-gray-700 hover:bg-gray-100"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  mobileOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${mobileOpen ? "block" : "hidden"} border-t`}>
        <div className="px-4 py-3 space-y-2 bg-white">
          <button
            className={linkClass("home")}
            onClick={() => {
              setCurrentPage("home");
              setMobileOpen(false);
            }}
          >
            Home
          </button>
          <button
            className={linkClass("gallery")}
            onClick={() => {
              setCurrentPage("gallery");
              setMobileOpen(false);
            }}
          >
            Gallery
          </button>
          <button
            className={linkClass("archive")}
            onClick={() => {
              setCurrentPage("archive");
              setMobileOpen(false);
            }}
          >
            Archive
          </button>
          <button
            className={linkClass("about")}
            onClick={() => {
              setCurrentPage("about");
              setMobileOpen(false);
            }}
          >
            Profile
          </button>
          <hr />
          <button
            className="w-full text-left px-3 py-2 rounded bg-blue-600 text-white"
            onClick={() => {
              setCurrentPage("upload");
              setMobileOpen(false);
            }}
          >
            + Add Meme
          </button>
        </div>
      </div>
    </nav>
  );
}
