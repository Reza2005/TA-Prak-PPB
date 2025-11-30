// src/api/memes.js
import { supabase } from "../config/supabaseClient";

const BUCKET_NAME = "meme-bucket";

/**
 * Fetch memes ordered by created_at desc
 */
export async function fetchMemes() {
  const { data, error } = await supabase
    .from("memes")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

/**
 * Uploads an image file to storage and returns a public URL
 */
export async function uploadImage(file) {
  const fileName = `${Date.now()}-${file.name.replace(/\s/g, "_")}`;
  const filePath = `public/${fileName}`;

  try {
    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file);

    if (uploadError) {
      // Provide a clearer message when bucket is missing or inaccessible
      const msg = uploadError.message || String(uploadError);
      if (/bucket|not found|404/i.test(msg)) {
        throw new Error(
          `Storage upload failed: ${msg}. The storage bucket '${BUCKET_NAME}' may not exist or is not accessible. Create the bucket in Supabase dashboard or check permissions.`
        );
      }
      throw uploadError;
    }

    const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);
    return data.publicUrl;
  } catch (err) {
    // Re-throw with more context when possible
    console.error("uploadImage error:", err);
    if (err.message && err.message.includes("bucket")) {
      throw err;
    }
    throw new Error(`Failed to upload image: ${err.message || err}`);
  }
}

export async function createMeme({ title, description, image_url, category, tags }) {
  const { data, error } = await supabase
    .from("memes")
    .insert([{ title, description, image_url, category, tags }]);

  if (error) throw error;
  return data;
}

export async function updateMeme(id, updates) {
  const { data, error } = await supabase
    .from("memes")
    .update(updates)
    .eq("id", id);

  if (error) throw error;
  return data;
}

export async function deleteMeme(id, imageUrl) {
  // Attempt to remove file from storage if possible
  try {
    const pathSegments = imageUrl ? imageUrl.split(`${BUCKET_NAME}/`) : null;
    const pathInStorage =
      pathSegments && pathSegments.length > 1 ? pathSegments[1] : null;

    if (pathInStorage) {
      const { error: storageError } = await supabase.storage
        .from(BUCKET_NAME)
        .remove([pathInStorage]);
      if (storageError)
        console.warn(
          "Failed to remove file from storage",
          storageError.message
        );
    }
  } catch (err) {
    console.warn("Warning while removing storage file", err);
  }

  const { data, error } = await supabase.from("memes").delete().eq("id", id);
  if (error) throw error;
  return data;
}

export { BUCKET_NAME };
