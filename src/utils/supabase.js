import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://nuruzmoysmbbxsiieecf.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51cnV6bW95c21iYnhzaWllZWNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMxNjQ5OTMsImV4cCI6MjA0ODc0MDk5M30.vWcVDZC5LRzvEZWQm7wJvsEkgpsXWuiYWchqfJSkSxY";
const supabase = createClient(supabaseUrl, supabaseKey);

export const uploadToSupabase = async (file) => {
  const fileName = `uploads/${Date.now()}_${file.name}`;

  // Determine the MIME type of the file
  const contentType = file.type || "application/octet-stream"; // Default to binary stream if no type is found

  const { data, error } = await supabase.storage
    .from("chat")
    .upload(fileName, file, {
      upsert: false,
      cacheControl: "3600",
      contentType, // Set content type explicitly
    });

  if (error) {
    throw new Error("Error uploading file: " + error.message);
  }
  if (error) {
    console.error("Error details:", error); // Додатковий лог для всіх деталей помилки
    throw new Error("Error uploading file: " + error.message);
  }

  const urlData = supabase.storage.from("chat").getPublicUrl(fileName);

  return urlData?.data?.publicUrl; // Return the public URL of the uploaded file
};
