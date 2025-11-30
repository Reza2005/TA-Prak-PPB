import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MemeGalleryPage from "./pages/MemeGalleryPage";
import UploadMemePage from "./pages/UploadMemePage";
import EditMemePage from "./pages/EditMemePage";
import ArchivePage from "./pages/ArchivePage";
import AboutPage from "./pages/AboutPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [memeToEdit, setMemeToEdit] = useState(null);

  const handleEdit = (meme) => {
    setMemeToEdit(meme);
    setCurrentPage("edit");
  };

  const handleUpdateSuccess = () => {
    setMemeToEdit(null);
    setCurrentPage("gallery");
  };

  return (
    <div className="min-h-screen">
      <Navbar setCurrentPage={setCurrentPage} currentPage={currentPage} />

      <main className="pt-20">
        {currentPage === "home" && (
          <div>
            <Hero setCurrentPage={setCurrentPage} />
          </div>
        )}

        {currentPage === "gallery" && (
          <MemeGalleryPage
            setCurrentPage={setCurrentPage}
            onEdit={handleEdit}
          />
        )}

        {currentPage === "upload" && (
          <UploadMemePage setCurrentPage={setCurrentPage} />
        )}

        {currentPage === "edit" && memeToEdit && (
          <EditMemePage
            memeToEdit={memeToEdit}
            setCurrentPage={setCurrentPage}
            onUpdateSuccess={handleUpdateSuccess}
          />
        )}

        {currentPage === "archive" && (
          <ArchivePage setCurrentPage={setCurrentPage} />
        )}

        {currentPage === "about" && (
          <AboutPage setCurrentPage={setCurrentPage} />
        )}
      </main>
    </div>
  );
}
