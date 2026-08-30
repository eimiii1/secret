"use client";
import { useState, useEffect } from "react";

const noteColors = ["#fff0f5", "#f0f7ff", "#f5fff0", "#fff8e1", "#fdf4ff", "#fff0f3"];
const pinColors = ["#fb7185", "#60a5fa", "#4ade80", "#fbbf24", "#c084fc", "#f472b6"];

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  return (
    <div className="min-h-screen px-4 md:px-6 py-8 md:py-12" style={{ background: "#fff8e1" }}>
      <div className="max-w-4xl mx-auto">

        <div className="flex items-end justify-between mb-8 md:mb-12">
          <div className="flex items-end gap-3">
            <h1 className="text-4xl md:text-6xl font-black text-black leading-none" style={{ fontFamily: "serif" }}>
              NOTES
            </h1>
            <span className="text-yellow-400 text-2xl md:text-4xl mb-1">✦</span>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowForm(!showForm)}
              className="text-xs font-bold uppercase tracking-widest border-2 border-black px-3 py-2 hover:bg-black hover:text-white transition-colors"
            >
              {showForm ? "cancel" : "+ add note"}
            </button>
            <a href="/home" className="text-xs font-bold uppercase tracking-widest border-2 border-black px-3 py-2 hover:bg-black hover:text-white transition-colors">
              ← back
            </a>
          </div>
        </div>

        {showForm && (
          <div
            className="relative mb-10 p-6 flex flex-col gap-4"
            style={{
              background: "white",
              border: "2px solid black",
              boxShadow: "4px 4px 0px black",
            }}
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-2 border-black" style={{ background: "#fb7185" }} />
            <input
              type="text"
              placeholder="title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-transparent border-b-2 border-black outline-none text-sm font-bold uppercase tracking-widest placeholder:text-gray-300 py-1"
            />
            <textarea
              placeholder="write something..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={4}
              className="bg-transparent outline-none text-sm text-gray-600 leading-relaxed resize-none placeholder:text-gray-300"
              style={{
                backgroundImage: "repeating-linear-gradient(transparent, transparent 27px, rgba(0,0,0,0.06) 27px, rgba(0,0,0,0.06) 28px)",
              }}
            />
            <button
              className="self-end text-xs font-bold uppercase tracking-widest bg-black text-white px-4 py-2 hover:bg-rose-400 transition-colors"
            >
              save note
            </button>
          </div>
        )}

        {notes.length === 0 ? (
          <p className="text-center text-xs font-bold uppercase tracking-widest text-gray-300 mt-20">
            no notes yet
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {notes.map((note, i) => (
              <div
                key={note.id}
                className="relative p-6 flex flex-col gap-3 group"
                style={{
                  background: noteColors[i % noteColors.length],
                  border: "2px solid black",
                  boxShadow: "4px 4px 0px black",
                  transform: i % 2 === 0 ? "rotate(-1deg)" : "rotate(1deg)",
                }}
              >
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-2 border-black"
                  style={{ background: pinColors[i % pinColors.length] }}
                />
                <button
                  className="absolute top-2 right-2 bg-black text-white text-xs font-black px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ✕
                </button>
                <p className="text-xs font-black uppercase tracking-widest text-black">{note.title}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{note.body}</p>
                <p className="text-xs text-gray-400 mt-auto">
                  {new Date(note.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
