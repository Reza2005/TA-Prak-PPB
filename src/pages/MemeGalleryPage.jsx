import React, { useState, useEffect } from "react";
import { fetchMemes as apiFetchMemes, deleteMeme } from "../api/memes";
// Tambahkan Loader2 untuk indikator loading yang lebih baik
import {
  Upload,
  GalleryHorizontal,
  Trash2,
  Edit,
  Loader2,
  RefreshCw,
} from "lucide-react";

const BUCKET_NAME = "meme-bucket";

function MemeGalleryPage({ setCurrentPage, onEdit }) {
  const [memes, setMemes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadMemes();
  }, []);

  const loadMemes = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await apiFetchMemes();
      setMemes(data.map((meme) => ({ ...meme, isDeleting: false })));
    } catch (err) {
      console.error("Supabase Fetch Error:", err);
      setError(
        "Failed to load memes. Check your Supabase configuration and connection."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (memeId, imageUrl) => {
    if (
      !window.confirm("Are you sure you want to permanently delete this meme?")
    )
      return;

    setMemes((prev) =>
      prev.map((m) => (m.id === memeId ? { ...m, isDeleting: true } : m))
    );

    try {
      await deleteMeme(memeId, imageUrl);
      setMemes((prev) => prev.filter((m) => m.id !== memeId));
      alert("✅ Meme successfully deleted!");
    } catch (err) {
      console.error("Error saat menghapus meme:", err);
      setError(`Failed to delete meme (ID: ${memeId}). Error: ${err.message}`);
      setMemes((prev) =>
        prev.map((m) => (m.id === memeId ? { ...m, isDeleting: false } : m))
      );
    }
  };

  return (
    <div className="min-h-screen cream-theme">
      {" "}
      {/* Background abu-abu muda */}
      {/* Header/Navbar Tetap (Sticky) */}
      <header className="header-gradient sticky top-0 z-20">
        <div className="p-4 max-w-4xl mx-auto flex justify-between items-center">
          <h2 className="text-2xl font-extrabold text-white flex items-center">
            <GalleryHorizontal className="mr-2 text-white" size={24} /> Meme Collection
          </h2>
          <div className="flex space-x-3">
            {/* Tombol Muat Ulang */}
            <button
              onClick={loadMemes}
              disabled={isLoading}
              className="py-2 px-3 border rounded-lg shadow-sm text-sm font-medium bg-indigo-500 text-white hover:bg-indigo-600 disabled:opacity-50 transition duration-150 flex items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 btn-primary"
            >
              {isLoading ? (
                <Loader2 size={16} className="mr-1 animate-spin" />
              ) : (
                <RefreshCw size={16} className="mr-1" />
              )}
              <span className="hidden sm:inline">Refresh</span>
            </button>
            {/* Tombol Upload */}
            <button
              onClick={() => setCurrentPage("upload")}
              className="py-2 px-3 border rounded-lg shadow-sm text-sm font-medium bg-teal-500 text-white hover:bg-teal-600 transition duration-150 flex items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 btn-accent"
            >
              <Upload size={16} className="mr-1" /> Upload Meme
            </button>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <div className="p-8 max-w-4xl mx-auto">
        {error && (
          <p className="text-red-600 text-center mb-6 border p-3 bg-red-100 rounded-lg shadow-sm">
            {error}
          </p>
        )}

        {memes.length === 0 && !isLoading && !error ? (
          <p className="text-center text-gray-500 p-6 border-2 border-dashed rounded-xl bg-white shadow-md">
            No memes uploaded yet. Upload your first meme! 🖼️
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {" "}
            {/* Jarak antar kartu lebih besar */}
            {memes.map((meme) => (
              <div
                key={meme.id}
                // Efek Hover: naik sedikit (scale), bayangan lebih kuat, dan transisi halus
                className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col relative group transition-all duration-300 ease-in-out transform hover:scale-[1.03] hover:shadow-2xl hover:border-indigo-400 border border-transparent card-accent"
              >
                {/* Overlay Penghapusan */}
                {meme.isDeleting && (
                  <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center text-white z-10 transition duration-300 rounded-xl">
                    <Loader2 size={32} className="animate-spin mb-2" />
                    <p className="font-semibold">Deleting...</p>
                  </div>
                )}

                {/* Kontainer Gambar */}
                <div className="h-56 flex items-center justify-center bg-gray-100 p-4">
                  {" "}
                  {/* Padding lebih baik */}
                  <img
                    src={meme.image_url}
                    alt={meme.title}
                    className="max-h-full max-w-full object-contain rounded-lg"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://via.placeholder.com/300x200?text=Image+Failed+to+Load";
                    }}
                  />
                </div>

                {/* Detail Konten */}
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-1">
                    {meme.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2 min-h-[2.5rem]">
                    {meme.description || "No description."}
                  </p>

                  {/* Metadata ID dan Tanggal */}
                  <p className="text-xs text-gray-400 mt-3 border-t pt-2">
                    ID: {meme.id} | Created:{" "}
                    {new Date(meme.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>

                  {/* Tombol Aksi */}
                  <div className="mt-4 flex justify-end gap-3">
                    {/* Tombol Edit */}
                    <button
                      onClick={() => onEdit(meme)}
                      className="p-3 rounded-full bg-yellow-500 text-white hover:bg-yellow-600 transition shadow-md hover:shadow-lg disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                      title="Edit title & description"
                      disabled={meme.isDeleting}
                    >
                      <Edit size={16} />
                    </button>
                    {/* Tombol Delete */}
                    <button
                      onClick={() => handleDelete(meme.id, meme.image_url)}
                      disabled={meme.isDeleting}
                      className="p-3 rounded-full bg-red-600 text-white hover:bg-red-700 transition shadow-md hover:shadow-lg disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
                      title="Delete Meme"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MemeGalleryPage;
