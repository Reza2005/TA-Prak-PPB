export default function Navbar({ openModal }) {
    return (
      <nav className="w-full bg-white shadow-sm px-10 py-4 flex justify-between items-center fixed top-0 z-20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-lg"></div>
          <h1 className="text-xl font-semibold">
            Meme <span className="text-blue-500">Archive</span>
          </h1>
        </div>
  
        <div className="flex gap-8 text-gray-700 font-medium">
          <a href="#">Beranda</a>
          <a href="#">Meme</a>
          <a href="#">Kategori</a>
          <a href="#">Profile</a>
        </div>
  
        <button
          onClick={openModal}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
        >
          + Tambah Meme
        </button>
      </nav>
    );
  }  