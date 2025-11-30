import React from "react";

export default function AboutPage({ setCurrentPage }) {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">About Meme Archive</h2>
      <p className="text-gray-600 mb-4">
        Meme Archive adalah Progressive Web App sederhana untuk mengunggah,
        menyimpan, dan mengelola koleksi meme menggunakan Supabase sebagai
        backend (Storage + Database).
      </p>

      <ul className="list-disc list-inside text-gray-700">
        <li>Unggah gambar ke Supabase Storage</li>
        <li>Simpan metadata (judul, deskripsi) di tabel `memes`</li>
        <li>Kelola, edit, dan hapus meme langsung dari antarmuka</li>
      </ul>

      <button
        type="button"
        onClick={() => setCurrentPage("gallery")}
        className="mt-6 inline-block px-4 py-2 bg-gray-100 text-gray-800 rounded-lg border hover:bg-gray-200"
      >
        Kembali ke Galeri
      </button>
    </div>
  );
}
