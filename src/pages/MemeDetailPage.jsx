// src/pages/MemeDetailPage.jsx
import { useEffect, useState } from "react";
import { supabase } from "../config/supabaseClient";
import Navbar from "../components/Navbar";

export default function MemeDetailPage({ memeId, setCurrentPage }) {
  const [meme, setMeme] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMeme() {
      const { data, error } = await supabase
        .from("memes")
        .select("*")
        .eq("id", memeId)
        .single();

      if (error) {
        console.error("Error fetching meme:", error);
      } else {
        setMeme(data);
      }
      setLoading(false);
    }

    if (memeId) fetchMeme();
  }, [memeId]);

  if (loading) {
    return (
      <>
        <Navbar setCurrentPage={setCurrentPage} currentPage="detail" />
        <div className="pt-20 text-center">Loading meme...</div>
      </>
    );
  }

  if (!meme) {
    return (
      <>
        <Navbar setCurrentPage={setCurrentPage} currentPage="detail" />
        <div className="pt-20 text-center text-red-500">Meme not found</div>
      </>
    );
  }

  // Helper to ensure we always work with an array
  const tagsArray = Array.isArray(meme.tags) 
    ? meme.tags 
    : (meme.tags ? meme.tags.split(",") : []);

  return (
    <>
      <Navbar setCurrentPage={setCurrentPage} currentPage="detail" />

      <div className="pt-20 max-w-4xl mx-auto px-4 pb-12">
        <button
          onClick={() => setCurrentPage("archive")}
          className="mb-6 text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
        >
          &larr; Back to Archive
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="w-full bg-black flex justify-center">
             <img
              src={meme.image || meme.image_url}
              alt={meme.title}
              className="max-w-full max-h-[80vh] object-contain"
            />
          </div>

          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              {meme.title || "Untitled Meme"}
            </h1>

            {meme.description && (
              <p className="text-gray-700 text-lg mb-4">{meme.description}</p>
            )}

            <div className="flex flex-wrap gap-3 text-sm text-gray-600">
              {meme.category && (
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  {meme.category}
                </span>
              )}
              
              {/* FIXED SECTION: Uses tagsArray safe check */}
              {tagsArray.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tagsArray.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-gray-100 px-3 py-1 rounded-full"
                    >
                      #{tag.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <p className="text-sm text-gray-500 mt-6">
              Uploaded on {new Date(meme.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}