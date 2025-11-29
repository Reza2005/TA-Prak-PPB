import { useState } from "react";

export default function AddMemeModal({ close, add }) {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = () => {
    if (!image) return alert("Gambar harus diisi!");

    add({
      title,
      tags: tags.split(",").map((t) => t.trim()),
      image,
    });

    close();
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-96 animate-fadeIn">
        <h2 className="text-xl font-bold mb-4">Tambah Meme</h2>

        <input
          type="text"
          placeholder="Judul Meme"
          className="input"
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Tags (pisahkan dengan koma)"
          className="input mt-3"
          onChange={(e) => setTags(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          className="mt-3"
          onChange={handleImage}
        />

        <div className="flex justify-end mt-5 gap-3">
          <button onClick={close}>Batal</button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Tambah
          </button>
        </div>
      </div>
    </div>
  );
}
