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
            <div className="flex items-center justify-between gap-2">
              <p className="font-semibold text-gray-900 truncate">
                {meme.title || "Untitled"}
              </p>
              {meme.category && (
                <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-700">
                  {meme.category}
                </span>
              )}
            </div>

            <p className="text-sm text-gray-500 truncate mt-1">
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
