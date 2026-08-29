"use client";
import { useState, useRef, useEffect } from "react";

export default function GalleryPage() {
  const [photos, setPhotos] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchImages = async () => {
      const res = await fetch("/api/gallery");
      const data = await res.json();
      setPhotos(data.photos);
    };
    fetchImages();
  }, []);

  const handleFiles = async (files) => {
    setUploading(true);
    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("uploaded_by", 2);
      const res = await fetch("/api/gallery", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) {
        setPhotos((prev) => [{ url: data.url, id: Date.now(), created_at: new Date() }, ...prev]);
      }
    }
    setUploading(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDelete = async (id) => {
    await fetch("/api/gallery/" + id, { method: "DELETE" });
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen px-4 md:px-6 py-8 md:py-12" style={{ background: "#fdf4ff" }}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-end justify-between mb-8 md:mb-12">
          <div className="flex items-end gap-3">
            <h1 className="text-4xl md:text-6xl font-black text-black leading-none" style={{ fontFamily: "serif" }}>
              GALLERY
            </h1>
            <span className="text-rose-400 text-2xl md:text-4xl mb-1">✦</span>
          </div>
          <a href="/home" className="text-xs font-bold uppercase tracking-widest text-black border-2 border-black px-3 py-2 hover:bg-black hover:text-white transition-colors">
            ← back
          </a>
        </div>

        <div
          className="w-full border-2 border-dashed border-black mb-8 md:mb-10 flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors"
          style={{
            minHeight: 120,
            background: dragging ? "#ffe4e6" : "white",
            boxShadow: "4px 4px 0px black",
          }}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current.click()}
        >
          <span className="text-2xl md:text-3xl">📷</span>
          <p className="text-xs font-bold uppercase tracking-widest text-black text-center px-4">
            {uploading ? "uploading..." : dragging ? "drop it!" : "drag & drop or click to upload"}
          </p>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>

        {photos.length === 0 ? (
          <p className="text-center text-xs font-bold uppercase tracking-widest text-gray-300 mt-20">
            no photos yet
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {photos.map((photo, i) => (
              <div
                key={photo.id}
                className="relative group flex flex-col"
                style={{
                  background: "white",
                  border: "2px solid black",
                  padding: "6px 6px 28px 6px",
                  boxShadow: "4px 4px 0px black",
                  transform: i % 2 === 0 ? "rotate(-1.5deg)" : "rotate(1.5deg)",
                }}
              >
                <div className="w-full aspect-square overflow-hidden">
                  <img src={photo.url} alt="photo" className="w-full h-full object-cover" />
                </div>
                <button
                  onClick={() => handleDelete(photo.id)}
                  className="absolute top-2 right-2 bg-black text-white text-xs font-black px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ✕
                </button>
                <span className="absolute bottom-1 left-0 right-0 text-center text-xs text-gray-400 font-bold">
                  {new Date(photo.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}