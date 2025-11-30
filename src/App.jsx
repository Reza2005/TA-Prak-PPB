import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MemeGalleryPage from "./pages/MemeGalleryPage";
import UploadMemePage from "./pages/UploadMemePage";
import EditMemePage from "./pages/EditMemePage";
import ArchivePage from "./pages/ArchivePage";
import AboutPage from "./pages/AboutPage";
import MemeDetailPage from "./pages/MemeDetailPage";
import BottomNav from "./components/BottomNav"; 

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [memeToEdit, setMemeToEdit] = useState(null);
  const [memeToView, setMemeToView] = useState(null);

  const handleEdit = (meme) => {
    setMemeToEdit(meme);
    setCurrentPage("edit");
  };

  const handleView = (memeId) => {
    setMemeToView(memeId);
    setCurrentPage("detail");
  };

  const handleUpdateSuccess = () => {
    setMemeToEdit(null);
    setCurrentPage("gallery");
  };

  return (
    <div className="min-h-screen">
      <Navbar setCurrentPage={setCurrentPage} currentPage={currentPage} />
      <main className="md:pt-20 pt-0 pb-16 md:pb-0">
        {currentPage === "home" && (
          <div>
            <Hero setCurrentPage={setCurrentPage} />
          </div>
        )}
        {currentPage === "gallery" && (
          <MemeGalleryPage
            setCurrentPage={setCurrentPage}
            onEdit={handleEdit}
            onView={handleView}
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
          <ArchivePage 
            setCurrentPage={setCurrentPage} 
            onView={handleView} 
          />
        )}
        {currentPage === "about" && (
          <AboutPage setCurrentPage={setCurrentPage} />
        )}
        {currentPage === "detail" && memeToView && (
          <MemeDetailPage memeId={memeToView} setCurrentPage={setCurrentPage} />
        )}
      </main>
      <BottomNav currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
}