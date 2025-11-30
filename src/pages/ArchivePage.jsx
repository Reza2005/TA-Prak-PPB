import React from "react";

export default function ArchivePage({ setCurrentPage }) {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Archive</h2>
      <p className="mb-6 text-gray-600">
        Halaman arsip untuk menyimpan kategori atau meme lama. Anda dapat
        menambahkan filter kategori, pagination, atau tampilan timeline di sini.
      </p>

      <div className="space-y-4">
        <div className="p-4 bg-white rounded-lg shadow">
          Contoh kategori: Dank, Wholesome, Political, Classic
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          Tambahkan filter dan tampilan berdasarkan tanggal di sini.
        </div>
      </div>

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
