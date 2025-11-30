import React, { useState, useEffect } from "react";
import { uploadImage, createMeme } from "../api/memes";
import { Upload } from "lucide-react";

const BUCKET_NAME = "meme-bucket";
const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 MB

function UploadMemePage({ setCurrentPage }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [statusMessage, setStatusMessage] = useState({ text: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);

  const displayMessage = (text, type = "info") => {
    setStatusMessage({ text, type });
    if (type !== "error") {
      setTimeout(() => setStatusMessage({ text: "", type: "" }), 4000);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // Validate mime-type (must be image/*)
    if (!selectedFile.type.startsWith("image/")) {
      displayMessage(
        "File type not supported. Please choose an image.",
        "error"
      );
      setFile(null);
      e.target.value = null;
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      displayMessage(
        `File is too large. Maximum ${MAX_FILE_SIZE / 1024 / 1024}MB.`,
        "error"
      );
      setFile(null);
      e.target.value = null; // Reset input file
      return;
    }

    // Revoke previous preview if present
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }

    const objUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objUrl);
    setFile(selectedFile);
    setStatusMessage({ text: "", type: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      displayMessage("❌ Please choose an image file to upload.", "error");
      return;
    }

    setIsLoading(true);
    displayMessage("🚀 Uploading file to Supabase Storage...", "info");

    const fileName = `${Date.now()}-${file.name.replace(/\s/g, "_")}`;
    const filePath = `public/${fileName}`;

    try {
      // Upload file and get public url
      const imageUrl = await uploadImage(file);

      // Save metadata
      displayMessage("💾 Saving metadata to Supabase Database...", "info");
      await createMeme({
        title: title || "Untitled Meme",
        description,
        image_url: imageUrl,
        category: category || null,
        tags: tags ? tags.split(",").map((t) => t.trim()) : [],
      });

      displayMessage("✅ Success! Meme uploaded and saved.", "success");

      // Reset form
      setTitle("");
      setDescription("");
      setFile(null);
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }
      document.getElementById("file-input").value = null;

      setTimeout(() => setCurrentPage("gallery"), 1500);
    } catch (error) {
      console.error("Error saat upload atau simpan data:", error);
      displayMessage(
        `❌ Failed: ${error.message || "Check your Supabase connection"}`,
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const messageClasses = {
    info: "bg-blue-100 text-blue-700 border-blue-400",
    success: "bg-green-100 text-green-700 border-green-400",
    error: "bg-red-100 text-red-700 border-red-400",
  };

  return (
    <div className="p-8 max-w-lg mx-auto cream-theme rounded-xl mt-8 card-accent">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Upload New Meme
      </h2>

      {statusMessage.text && (
        <p
          className={`p-4 mb-4 rounded-lg border text-sm font-medium ${
            messageClasses[statusMessage.type]
          }`}
        >
          {statusMessage.text}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-semibold text-gray-700"
          >
            Meme Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-semibold text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 h-24"
          />
        </div>

        <div>
          <label
            htmlFor="tags"
            className="block text-sm font-semibold text-gray-700"
          >
            Tags (comma separated)
          </label>
          <input
            id="tags"
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3"
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-semibold text-gray-700"
          >
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3"
          >
            <option value="">-- None --</option>
            <option value="Funny">Funny</option>
            <option value="Dank">Dank</option>
            <option value="Wholesome">Wholesome</option>
            <option value="Political">Political</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="file-input"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Choose Image File
          </label>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
          />
          {file && (
            <p className="text-xs text-gray-500 mt-1">
              Selected file: {file.name} ({(file.size / 1024 / 1024).toFixed(2)}{" "}
              MB)
            </p>
          )}

          {previewUrl && (
            <div className="mt-3">
              <img
                src={previewUrl}
                alt="preview"
                className="w-full max-h-48 object-contain rounded-md border"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading || !file || statusMessage.type === "error"}
          className="w-full py-3 px-4 border border-transparent rounded-lg shadow-lg text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 flex items-center justify-center transition duration-150"
        >
          <Upload
            size={20}
            className={`mr-2 ${isLoading ? "animate-bounce" : ""}`}
          />
          {isLoading ? "Uploading..." : "Upload Meme"}
        </button>
      </form>

      <button
        onClick={() => setCurrentPage("gallery")}
        className="mt-4 w-full py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200"
      >
        Back to Gallery
      </button>
    </div>
  );
}

export default UploadMemePage;
