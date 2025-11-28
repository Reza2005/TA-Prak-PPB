import React, { useState, useEffect } from 'react';
import { supabase } from '../config/supabaseClient'; 
import { Upload, GalleryHorizontal, Trash2, Edit } from 'lucide-react'; 

// Sesuaikan dengan nama bucket yang Anda buat di Supabase Storage
const BUCKET_NAME = 'meme-bucket'; 

function MemeGalleryPage({ setCurrentPage, onEdit }) {
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
      // Operasi READ: Mengambil semua baris dari tabel 'memes'
      const { data, error } = await supabase
        .from('memes')
        .select('*')
        .order('created_at', { ascending: false }); // Ambil yang terbaru dulu

      if (error) throw error;
      
      setMemes(data);
    } catch (err) {
      console.error('Supabase Fetch Error:', err);
      setError('Gagal memuat meme. Cek konfigurasi Supabase dan koneksi Anda.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (memeId, imageUrl) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus meme ini secara permanen? Tindakan ini tidak dapat dibatalkan!")) {
        return;
    }
    
    // Tampilkan pesan loading sementara
    setMemes(memes.map(m => m.id === memeId ? { ...m, isDeleting: true } : m));

    try {
        // 1. Dapatkan path file dari URL
        // Contoh URL: .../storage/v1/object/public/meme-bucket/public/1700000000000-file.jpg
        const pathSegments = imageUrl.split(BUCKET_NAME + '/');
        const pathInStorage = pathSegments.length > 1 ? pathSegments[1] : null;

        if (!pathInStorage) throw new Error('URL gambar tidak valid untuk penghapusan storage.');

        // 2. Hapus file dari Supabase Storage
        const { error: storageError } = await supabase.storage
            .from(BUCKET_NAME)
            .remove([pathInStorage]);
        
        // Cek jika ada error storage, tapi tetap lanjutkan hapus data agar konsisten
        if (storageError) console.warn('Peringatan: Gagal menghapus file dari Storage, tapi akan mencoba menghapus data:', storageError.message);
        
        // 3. Hapus metadata dari Supabase Database
        const { error: dbError } = await supabase
            .from('memes')
            .delete()
            .eq('id', memeId); 

        if (dbError) throw dbError;

        // 4. Update state memes setelah sukses
        setMemes(memes.filter(m => m.id !== memeId));
        alert('✅ Meme berhasil dihapus!');

    } catch (err) {
        console.error('Error saat menghapus meme:', err);
        setError(`Gagal menghapus meme (ID: ${memeId}). Error: ${err.message}`);
        // Jika gagal, reset status deleting
        setMemes(memes.map(m => m.id === memeId ? { ...m, isDeleting: false } : m));
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
        <GalleryHorizontal className="inline-block mr-2 text-indigo-600" size={28} /> Koleksi Meme
      </h2>
      
      <div className="flex justify-center space-x-4 mb-8">
        <button 
          onClick={fetchMemes} 
          disabled={isLoading}
          className="py-2 px-4 border rounded-md shadow-sm text-sm font-medium bg-indigo-500 text-white hover:bg-indigo-600 disabled:opacity-50 transition duration-150"
        >
          {isLoading ? 'Memuat...' : 'Muat Ulang Galeri'}
        </button>
        <button 
          onClick={() => setCurrentPage('upload')} 
          className="py-2 px-4 border rounded-md shadow-sm text-sm font-medium bg-teal-500 text-white hover:bg-teal-600 transition duration-150"
        >
          <Upload size={16} className="inline-block mr-1" /> Upload Meme
        </button>
      </div>

      {error && <p className="text-red-600 text-center mb-4 border p-3 bg-red-50 rounded">{error}</p>}
      
      {memes.length === 0 && !isLoading && !error ? (
        <p className="text-center text-gray-500">Belum ada meme yang diunggah. Ayo unggah meme pertamamu!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {memes.map((meme) => (
            <div key={meme.id} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
              <div className="h-64 flex items-center justify-center bg-gray-100 p-2">
                <img 
                  src={meme.image_url} 
                  alt={meme.title} 
                  className="max-h-full max-w-full object-contain rounded-md" 
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/300?text=Gambar+Gagal+Dimuat" }}
                />
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-gray-900 truncate">{meme.title}</h3>
                <p className="text-xs text-gray-400 mt-2">ID: {meme.id} | {new Date(meme.created_at).toLocaleDateString()}</p>
                
                {/* Tombol Aksi */}
                <div className="mt-4 flex justify-end gap-2">
                    {/* Tombol Edit */}
                    <button 
                        onClick={() => onEdit(meme)} 
                        className="p-2 rounded-full bg-yellow-500 text-white hover:bg-yellow-600 transition shadow-md"
                        title="Edit Judul & Deskripsi"
                    >
                        <Edit size={16} />
                    </button>
                    {/* Tombol Delete */}
                    <button 
                        onClick={() => handleDelete(meme.id, meme.image_url)} 
                        disabled={meme.isDeleting}
                        className="p-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition shadow-md disabled:opacity-50"
                        title="Hapus Meme"
                    >
                        {meme.isDeleting ? '...' : <Trash2 size={16} />}
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MemeGalleryPage;