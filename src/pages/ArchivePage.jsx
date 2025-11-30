import React, { useEffect, useState } from "react";
import { fetchMemes } from "../api/memes";
import MemeGrid from "../components/MemeGrid";

export default function ArchivePage({ setCurrentPage }) {
  const [allMemes, setAllMemes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchMemes()
      .then((data) => {
        if (!mounted) return;
        const memes = data || [];
        setAllMemes(memes);

        const cats = Array.from(
          new Set(
            memes.map((m) => (m.category ? String(m.category) : "General"))
          )
        ).sort();
        setCategories(["All", ...cats]);
      })
      .catch((err) => {
        console.error("Failed to fetch memes for archive:", err);
        setError(err.message || String(err));
      })
      .finally(() => setLoading(false));

    return () => {
      mounted = false;
    };
  }, []);

  const filtered =
    selectedCategory === "All"
      ? allMemes
      : allMemes.filter((m) => (m.category || "General") === selectedCategory);

  return (
    <div className="p-8 max-w-6xl mx-auto cream-theme">
      <h2 className="text-3xl font-bold mb-4">Archive</h2>

      <p className="mb-6 text-gray-600">
        Browse memes by category. Select a category to filter the gallery.
      </p>

      {loading && <p className="text-sm text-gray-500">Loading...</p>}
      {error && <p className="text-sm text-red-600">Error: {error}</p>}

      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded-full text-sm border ${
              selectedCategory === cat
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow card-accent">
        <MemeGrid memes={filtered} />
      </div>

      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={() => setCurrentPage("gallery")}
          className="inline-block px-4 py-2 btn-secondary rounded-lg border hover:bg-gray-50"
        >
          Kembali ke Galeri
        </button>
        <div className="text-sm text-gray-500 self-center">
          Showing {filtered.length} memes
        </div>
      </div>
    </div>
  );
}
