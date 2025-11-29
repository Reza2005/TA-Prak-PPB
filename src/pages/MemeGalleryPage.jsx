import React, { useState, useEffect } from 'react';
import { supabase } from '../config/supabaseClient'; 
// Tambahkan Loader2 untuk indikator loading yang lebih baik
import { Upload, GalleryHorizontal, Trash2, Edit, Loader2, RefreshCw } from 'lucide-react'; 

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
      const { data, error } = await supabase
        .from('memes')
        .select('*')
        .order('created_at', { ascending: false }); 

      if (error) throw error;
      
      setMemes(data.map(meme => ({ ...meme, isDeleting: false }))); // Inisialisasi status deleting
    } catch (err) {
      console.error('Supabase Fetch Error:', err);
      setError('Gagal memuat meme. Cek konfigurasi Supabase dan koneksi Anda.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (memeId, imageUrl) => {
    // Pengganti window.confirm
    if (!window.confirm("Apakah Anda yakin ingin menghapus meme ini secara permanen?")) {
        return;
    }
    
    // Set status isDeleting untuk item spesifik
    setMemes(memes.map(m => m.id === memeId ? { ...m, isDeleting: true } : m));

    try {
        const pathSegments = imageUrl.split(BUCKET_NAME + '/');
        const pathInStorage = pathSegments.length > 1 ? pathSegments[1] : null;

        if (!pathInStorage) console.warn('Peringatan: URL gambar tidak valid.');

        // 1. Hapus file dari Supabase Storage (hanya jika path valid)
        if (pathInStorage) {
            const { error: storageError } = await supabase.storage
                .from(BUCKET_NAME)
                .remove([pathInStorage]);
            
            if (storageError) console.warn('Peringatan: Gagal menghapus file dari Storage:', storageError.message);
        }
        
        // 2. Hapus metadata dari Supabase Database
        const { error: dbError } = await supabase
            .from('memes')
            .delete()
            .eq('id', memeId); 

        if (dbError) throw dbError;

        // 3. Update state memes setelah sukses
        setMemes(memes.filter(m => m.id !== memeId));
        alert('✅ Meme berhasil dihapus!');

    } catch (err) {
        console.error('Error saat menghapus meme:', err);
        setError(`Gagal menghapus meme (ID: ${memeId}). Error: ${err.message}`);
        // Reset status deleting jika gagal
        setMemes(memes.map(m => m.id === memeId ? { ...m, isDeleting: false } : m));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50"> {/* Background abu-abu muda */}
        {/* Header/Navbar Tetap (Sticky) */}
        <header className="bg-white shadow-md sticky top-0 z-20">
            <div className="p-4 max-w-4xl mx-auto flex justify-between items-center">
                <h2 className="text-2xl font-extrabold text-gray-900 flex items-center">
                    <GalleryHorizontal className="mr-2 text-indigo-600" size={24} /> Koleksi Meme
                </h2>
                <div className="flex space-x-3">
                    {/* Tombol Muat Ulang */}
                    <button 
                        onClick={fetchMemes} 
                        disabled={isLoading}
                        className="py-2 px-3 border rounded-lg shadow-sm text-sm font-medium bg-indigo-500 text-white hover:bg-indigo-600 disabled:opacity-50 transition duration-150 flex items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        {isLoading ? <Loader2 size={16} className="mr-1 animate-spin" /> : <RefreshCw size={16} className="mr-1" />} 
                        <span className='hidden sm:inline'>Muat Ulang</span>
                    </button>
                    {/* Tombol Upload */}
                    <button 
                        onClick={() => setCurrentPage('upload')} 
                        className="py-2 px-3 border rounded-lg shadow-sm text-sm font-medium bg-teal-500 text-white hover:bg-teal-600 transition duration-150 flex items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                    >
                        <Upload size={16} className="mr-1" /> Upload Meme
                    </button>
                </div>
            </div>
        </header>
        
        {/* Main Content */}
        <div className="p-8 max-w-4xl mx-auto">
            {error && <p className="text-red-600 text-center mb-6 border p-3 bg-red-100 rounded-lg shadow-sm">{error}</p>}
            
            {memes.length === 0 && !isLoading && !error ? (
                <p className="text-center text-gray-500 p-6 border-2 border-dashed rounded-xl bg-white shadow-md">Belum ada meme yang diunggah. Ayo unggah meme pertamamu! 🖼️</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> {/* Jarak antar kartu lebih besar */}
                    {memes.map((meme) => (
                        <div 
                            key={meme.id} 
                            // Efek Hover: naik sedikit (scale), bayangan lebih kuat, dan transisi halus
                            className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col relative group transition-all duration-300 ease-in-out transform hover:scale-[1.03] hover:shadow-2xl hover:border-indigo-400 border border-transparent"
                        >
                            
                            {/* Overlay Penghapusan */}
                            {meme.isDeleting && (
                                <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center text-white z-10 transition duration-300 rounded-xl">
                                    <Loader2 size={32} className="animate-spin mb-2" />
                                    <p className="font-semibold">Menghapus...</p>
                                </div>
                            )}

                            {/* Kontainer Gambar */}
                            <div className="h-56 flex items-center justify-center bg-gray-100 p-4"> {/* Padding lebih baik */}
                                <img 
                                    src={meme.image_url} 
                                    alt={meme.title} 
                                    className="max-h-full max-w-full object-contain rounded-lg" 
                                    onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/300x200?text=Gambar+Gagal+Dimuat" }}
                                />
                            </div>
                            
                            {/* Detail Konten */}
                            <div className="p-4 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-1">{meme.title}</h3> 
                                <p className="text-sm text-gray-600 line-clamp-2 min-h-[2.5rem]">{meme.description || 'Tidak ada deskripsi.'}</p>
                                
                                {/* Metadata ID dan Tanggal */}
                                <p className="text-xs text-gray-400 mt-3 border-t pt-2">
                                    ID: {meme.id} | Dibuat: {new Date(meme.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })}
                                </p>
                                
                                {/* Tombol Aksi */}
                                <div className="mt-4 flex justify-end gap-3">
                                    {/* Tombol Edit */}
                                    <button 
                                        onClick={() => onEdit(meme)} 
                                        className="p-3 rounded-full bg-yellow-500 text-white hover:bg-yellow-600 transition shadow-md hover:shadow-lg disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                                        title="Edit Judul & Deskripsi"
                                        disabled={meme.isDeleting}
                                    >
                                        <Edit size={16} />
                                    </button>
                                    {/* Tombol Delete */}
                                    <button 
                                        onClick={() => handleDelete(meme.id, meme.image_url)} 
                                        disabled={meme.isDeleting}
                                        className="p-3 rounded-full bg-red-600 text-white hover:bg-red-700 transition shadow-md hover:shadow-lg disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
                                        title="Hapus Meme"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
  );
}

export default MemeGalleryPage;