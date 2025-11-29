export default function MemeGrid({ memes }) {
    if (memes.length === 0)
      return <p className="text-gray-500">Belum ada meme. Tambahkan dulu!</p>;
  
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {memes.map((meme, i) => (
          <div key={i} className="bg-white shadow rounded-xl overflow-hidden">
            <img src={meme.image} className="w-full h-48 object-cover" />
            <div className="p-3">
              <p className="font-semibold">{meme.title}</p>
              <p className="text-sm text-gray-500">{meme.tags.join(", ")}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }  