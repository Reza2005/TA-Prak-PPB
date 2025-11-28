// src/pages/MemeGalleryPage.jsx

import React, { useState, useEffect } from 'react';
import { supabase } from '../config/supabaseClient'; // Import klien Supabase
import { RefreshCw } from 'lucide-react'; // Gunakan icon dari dependency yang ada

function MemeGalleryPage() {
  const [memes, setMemes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMemes();
  }, []);

  const fetchMemes = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Mengambil semua data dari tabel 'memes', urutkan berdasarkan created_at terbaru
      const { data, error } = await supabase
        .from('memes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setMemes(data);
    } catch (err) {
      console.error('Supabase Fetch Error:', err);
      setError('Gagal memuat meme dari Supabase. Cek konfigurasi dan koneksi Anda.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">Koleksi Meme Supabase</h2>
      
      <button 
        onClick={fetchMemes} 
        disabled={isLoading}
        className="flex items-center mx-auto mb-8 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 transition duration-150"
      >
        <RefreshCw size={16} className={`mr-2 ${isLoading ? 'animate-spin' : ''}`} />
        {isLoading ? 'Memuat...' : 'Muat Ulang Galeri'}
      </button>

      {error && <p className="text-red-600 text-center mb-4">{error}</p>}
      
      {memes.length === 0 && !isLoading && !error ? (
        <p className="text-center text-gray-500">Belum ada meme yang diunggah. Silakan unggah meme baru!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {memes.map((meme) => (
            <div key={meme.id} className="bg-white rounded-xl shadow-lg overflow-hidden transition transform hover:scale-[1.02]">
              <div className="h-64 flex items-center justify-center bg-gray-100">
                <img 
                  src={meme.image_url} 
                  alt={meme.title} 
                  className="max-h-full max-w-full object-contain" 
                  onError={(e) => { 
                    e.target.onerror = null; 
                    e.target.src = "https://via.placeholder.com/300?text=Gambar+Gagal+Dimuat"; 
                    e.target.className = "w-full h-full object-cover"; // Gaya fallback
                  }}
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-900 truncate">{meme.title}</h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{meme.description}</p>
                <p className="text-xs text-gray-400 mt-2">Diunggah: {new Date(meme.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MemeGalleryPage;