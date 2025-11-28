import React, { useState } from 'react';
import { supabase } from '../config/supabaseClient';
import { GalleryHorizontal, Save } from 'lucide-react';

function EditMemePage({ memeToEdit, setCurrentPage, onUpdateSuccess }) {
  const [title, setTitle] = useState(memeToEdit.title || '');
  const [description, setDescription] = useState(memeToEdit.description || '');
  const [statusMessage, setStatusMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!title) {
      setStatusMessage('❌ Judul tidak boleh kosong.');
      return;
    }

    setIsLoading(true);
    setStatusMessage('💾 Menyimpan perubahan...');
    
    try {
      // Operasi UPDATE: Hanya update title dan description
      const { error } = await supabase
        .from('memes')
        .update({ 
          title: title, 
          description: description, 
        })
        .eq('id', memeToEdit.id); // PENTING: Filter baris berdasarkan ID

      if (error) throw error;

      setStatusMessage('✅ Sukses! Meme berhasil diperbarui.');
      
      // Panggil fungsi di App.jsx untuk refresh galeri
      onUpdateSuccess(); 
      
      // Kembali ke halaman galeri
      setTimeout(() => setCurrentPage('gallery'), 1500); 

    } catch (error) {
      console.error('Error saat update data:', error);
      setStatusMessage(`❌ Gagal memperbarui meme: ${error.message || 'Error tidak diketahui'}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="p-8 max-w-lg mx-auto bg-white shadow-xl rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Meme: {memeToEdit.title}</h2>
      
      <div className="mb-4 text-center">
        <img src={memeToEdit.image_url} alt="Meme to Edit" className="w-full max-h-48 object-contain rounded-md border" />
        <p className="text-xs text-gray-500 mt-2">Gambar tidak dapat diganti dari sini.</p>
      </div>

      {statusMessage && (
        <p className={`p-3 mb-4 rounded ${statusMessage.includes('Sukses') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {statusMessage}
        </p>
      )}

      <form onSubmit={handleUpdate} className="space-y-4">
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
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Deskripsi</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <button 
          type="submit" 
          disabled={isLoading} 
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 flex items-center justify-center"
        >
          <Save size={16} className="mr-2" /> {isLoading ? 'Menyimpan...' : 'Simpan Perubahan'}
        </button>
      </form>
      
      <button 
        onClick={() => {setCurrentPage('gallery'); onUpdateSuccess();}} // Kembali ke Galeri
        className="mt-4 w-full py-2 px-4 border rounded-md shadow-sm text-sm font-medium bg-gray-200 text-gray-800 hover:bg-gray-300 flex items-center justify-center"
      >
        <GalleryHorizontal size={16} className="mr-2" /> Batalkan & Kembali ke Galeri
      </button>
    </div>
  );
}

export default EditMemePage;