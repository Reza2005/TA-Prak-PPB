import { useEffect, useState } from "react";
import { supabase } from "../config/supabaseClient";
import { updateMeme } from "../api/memes"; // Import the update function
import Navbar from "../components/Navbar";

// Define your 5+ emojis here
const REACTION_EMOJIS = ["🔥", "😂", "❤️", "👍", "🤯"];

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

  const handleReaction = async (emoji) => {
    if (!meme) return;

    // 1. Get current reactions or empty object if none exist
    const currentReactions = meme.reactions || {};
    
    // 2. Increment the count for the clicked emoji
    const newCount = (currentReactions[emoji] || 0) + 1;
    
    // 3. Create the new updated object
    const updatedReactions = {
      ...currentReactions,
      [emoji]: newCount,
    };

    // 4. Optimistically update UI (instant feedback)
    setMeme({ ...meme, reactions: updatedReactions });

    // 5. Save to Supabase
    try {
      await updateMeme(meme.id, { reactions: updatedReactions });
    } catch (error) {
      console.error("Failed to save reaction:", error);
      // Optional: Revert state if error occurs
    }
  };

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

  // Helper to ensure we always work with an array for tags
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

            {/* --- NEW: REACTION SECTION --- */}
            <div className="border-t border-b border-gray-100 py-4 my-6">
              <p className="text-sm text-gray-500 mb-3 text-center uppercase tracking-wide font-semibold">
                React to this Meme
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {REACTION_EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => handleReaction(emoji)}
                    className="group flex flex-col items-center justify-center bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-200 rounded-xl p-3 min-w-[70px] transition-all active:scale-95"
                  >
                    <span className="text-3xl mb-1 group-hover:scale-110 transition-transform">
                      {emoji}
                    </span>
                    <span className="text-sm font-bold text-gray-600 group-hover:text-blue-600">
                      {meme.reactions?.[emoji] || 0}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            {/* ----------------------------- */}

            <div className="flex flex-wrap gap-3 text-sm text-gray-600">
              {meme.category && (
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  {meme.category}
                </span>
              )}
              
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