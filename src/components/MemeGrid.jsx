export default function MemeGrid({ memes }) {
  if (!memes || memes.length === 0) {
    return <p className="text-gray-500">No memes yet — add one!</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {memes.map((meme, i) => (
        <div
          key={meme.id || i}
          className="bg-white shadow rounded-xl overflow-hidden hover:scale-[1.02] transition-transform"
        >
          <img
            src={meme.image || meme.image_url || meme.imageUrl}
            alt={meme.title || "Meme"}
            className="w-full h-48 object-cover"
          />
          <div className="p-3">
            <p className="font-semibold text-gray-900 truncate">
              {meme.title || "Untitled"}
            </p>
            <p className="text-sm text-gray-500 truncate">
              {Array.isArray(meme.tags)
                ? meme.tags.join(", ")
                : meme.tags || ""}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
