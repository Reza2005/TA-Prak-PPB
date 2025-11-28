// src/pages/UploadMemePage.jsx

import React, { useState } from 'react';
import axios from 'axios'; // Menggunakan Axios (walaupun Supabase SDK bisa melakukannya)
import { supabase } from '../config/supabaseClient'; // Import klien Supabase

// Ganti dengan nama bucket Anda
const BUCKET_NAME = 'meme-bucket'; 

function UploadMemePage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setStatusMessage('❌ Harap pilih file gambar.');
      return;
    }

    setIsLoading(true);
    setStatusMessage('🚀 Mengunggah file dan menyimpan metadata...');
    
    // 1. Tentukan path unik untuk file di Storage
    const fileName = `${Date.now()}-${file.name.replace(/\s/g, '_')}`; // Pastikan nama file aman
    const filePath = `public/${fileName}`; // Path di dalam bucket

    try {
      // 2. Unggah file ke Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false // Jangan timpa jika nama sama
        });
        
      if (uploadError) throw uploadError;

      // 3. Ambil URL Publik dari file yang baru diunggah
      const { data: publicUrlData } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(filePath);

      const imageUrl = publicUrlData.publicUrl;
      
      // 4. Simpan metadata (termasuk URL) ke Supabase Database (Tabel 'memes')
      const { error: dbError } = await supabase
        .from('memes') // Nama tabel di Supabase
        .insert([
          { 
            title: title, 
            description: description, 
            image_url: imageUrl 
          },
        ]);

      if (dbError) throw dbError;

      setStatusMessage('✅ Sukses! Meme berhasil diunggah dan disimpan di database.');
      
      // Reset form
      setTitle('');
      setDescription('');
      setFile(null);
      document.getElementById('file-input').value = null; 

    } catch (error) {
      console.error('Error saat upload atau simpan data:', error);
      setStatusMessage(`❌ Gagal menyimpan meme: ${error.message || 'Error tidak diketahui'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-lg mx-auto bg-white shadow-xl rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Upload Meme Supabase</h2>
      
      {statusMessage && (
        <p className={`p-3 mb-4 rounded ${statusMessage.includes('Sukses') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {statusMessage}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Judul Meme</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Deskripsi (Opsional)</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="file-input" className="block text-sm font-medium text-gray-700">File Gambar (.jpg, .png, .gif)</label>
          <input
            id="file-input"
            type="file"
            accept="image/jpeg,image/png,image/gif"
            onChange={handleFileChange}
            required
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
          />
        </div>

        <button 
          type="submit" 
          disabled={isLoading || !file} 
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isLoading ? 'Mengunggah...' : 'Upload Meme via Supabase'}
        </button>
      </form>
    </div>
  );
}

export default UploadMemePage;