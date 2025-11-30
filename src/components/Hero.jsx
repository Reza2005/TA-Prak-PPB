import React from "react";

export default function Hero({ setCurrentPage }) {
  return (
    <section className="pt-28 pb-12 max-w-6xl mx-auto px-6 flex flex-col items-center justify-center text-center gap-8">
      
      <div className="w-full md:w-3/4 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
          Welcome to{" "}
          <span className="bg-blue-200 px-2 py-1 rounded-xl">Meme Archive</span>
        </h1>

        <p className="mt-4 text-gray-600 text-base md:text-lg">
          Archive your favorite memes — save, share, and organize your
          collection.
        </p>

        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => setCurrentPage("gallery")}
            className="px-5 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
          >
            Browse Memes →
          </button>

          <button
            onClick={() => setCurrentPage("upload")}
            className="px-5 py-3 bg-white border rounded-xl shadow hover:shadow-md"
          >
            Add Meme
          </button>
        </div>
      </div>

    </section>
  );
}
