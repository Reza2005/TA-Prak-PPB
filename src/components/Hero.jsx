import React from "react";

export default function Hero({ setCurrentPage }) {
  return (
    <section className="pt-28 pb-12 max-w-6xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-8">
      <div className="w-full md:w-1/2">
        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
          Welcome to{" "}
          <span className="bg-blue-200 px-2 py-1 rounded-xl">Meme Archive</span>
        </h1>

        <p className="mt-4 text-gray-600 text-base md:text-lg">
          Archive your favorite memes — save, share, and organize your
          collection.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
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

      {/* Right side image collage */}
      <div className="w-full md:w-[45%] grid grid-cols-2 gap-3">
        <img
          src="https://i.imgflip.com/30zz5g.jpg"
          alt="meme-1"
          className="rounded-xl shadow object-cover h-28 w-full"
        />
        <img
          src="https://i.imgflip.com/1bij.jpg"
          alt="meme-2"
          className="rounded-xl shadow object-cover h-28 w-full"
        />
        <img
          src="https://i.imgflip.com/2fm6x.jpg"
          alt="meme-3"
          className="rounded-xl shadow col-span-2 h-40 object-cover w-full"
        />
      </div>
    </section>
  );
}
