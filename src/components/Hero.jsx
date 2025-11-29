export default function Hero({ openModal }) {
    return (
      <section className="pt-32 pb-20 max-w-6xl mx-auto px-6 flex justify-between items-center">
        <div className="w-1/2">
          <h1 className="text-5xl font-extrabold leading-tight">
            Selamat datang di{" "}
            <span className="bg-blue-200 px-2 py-1 rounded-xl">
              Meme Archive
            </span>
          </h1>
  
          <p className="mt-4 text-gray-600 text-lg">
            Archive Your Own Memes!
          </p>
  
          <div className="mt-6 flex gap-4">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow">
              Jelajahi Meme →
            </button>
  
            <button 
              className="px-6 py-3 bg-white border rounded-xl shadow"
              onClick={openModal}
            >
              Tambah Meme
            </button>
          </div>
        </div>
  
        {/* Right side image collage */}
        <div className="w-[45%] grid grid-cols-2 gap-4">
          <img src="https://i.imgflip.com/30zz5g.jpg" className="rounded-xl shadow" />
          <img src="https://i.imgflip.com/1bij.jpg" className="rounded-xl shadow" />
          <img src="https://i.imgflip.com/2fm6x.jpg" className="rounded-xl shadow col-span-2 h-40 object-cover" />
        </div>
      </section>
    );
  }  