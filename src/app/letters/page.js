"use client";
import { useState, useEffect } from "react";

const letterBgs = ["#fff0f5", "#fdf4ff", "#fff0f3", "#e8f5e9", "#fff8e1", "#f0f7ff"];

export default function LettersPage() {
  const [letters, setLetters] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [body, setBody] = useState("");
  const [senderName, setSenderName] = useState("");
  const [songUrl, setSongUrl] = useState("");

  useEffect(() => {
    const fetchLetters = async () => {
      const res = await fetch("/api/letters");
      const data = await res.json();
      setLetters(data.letters);
    };
    fetchLetters();
  }, []);

  const handleSubmit = async () => {
    const res = await fetch("/api/letters", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body, sender_name: senderName, song_url: songUrl }),
    });
    if (res.ok) {
      const refreshed = await fetch("/api/letters");
      const refreshedData = await refreshed.json();
      setLetters(refreshedData.letters);
      setBody("");
      setSenderName("");
      setSongUrl("");
      setShowForm(false);
    }
  };

  return (
    <div className="min-h-screen px-4 md:px-6 py-8 md:py-12" style={{ background: "#e8f5e9" }}>
      <div className="max-w-4xl mx-auto">

        <div className="flex items-start md:items-end justify-between mb-8 md:mb-12 flex-col md:flex-row gap-4 md:gap-0">
  <div className="flex items-end gap-3">
    <h1 className="text-4xl md:text-6xl font-black text-black leading-none" style={{ fontFamily: "serif" }}>
      LETTERS
    </h1>
    <span className="text-green-400 text-2xl md:text-4xl mb-1">✦</span>
  </div>
  <div className="flex gap-3">
    <button
      onClick={() => setShowForm(!showForm)}
      className="text-xs font-bold uppercase tracking-widest border-2 border-black px-3 py-2 hover:bg-black hover:text-white transition-colors"
    >
      {showForm ? "cancel" : "+ write letter"}
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
              backgroundColor: "white",
              border: "2px solid black",
              boxShadow: "4px 4px 0px black",
              backgroundImage: "repeating-linear-gradient(transparent, transparent 27px, rgba(0,0,0,0.06) 27px, rgba(0,0,0,0.06) 28px)",
            }}
          >
            <input
              type="text"
              placeholder="your name..."
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              className="bg-transparent border-b-2 border-black outline-none text-sm font-bold uppercase tracking-widest placeholder:text-gray-300 py-1"
            />
            <textarea
              placeholder="write your letter..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={6}
              className="bg-transparent outline-none text-sm text-gray-600 leading-relaxed resize-none placeholder:text-gray-300"
            />
            <input
              type="text"
              placeholder="spotify track url..."
              value={songUrl}
              onChange={(e) => setSongUrl(e.target.value)}
              className="bg-transparent border-b-2 border-black outline-none text-sm placeholder:text-gray-300 py-1"
            />
            <button
              onClick={handleSubmit}
              className="self-end text-xs font-bold uppercase tracking-widest bg-black text-white px-4 py-2 hover:bg-rose-400 transition-colors"
            >
              send letter
            </button>
          </div>
        )}

        {letters.length === 0 ? (
          <p className="text-center text-xs font-bold uppercase tracking-widest text-gray-300 mt-20">
            no letters yet
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {letters.map((letter, i) => (
              <a
                key={letter.id}
                href={"/letters/" + letter.id}
                className="relative p-8 flex flex-col gap-4 group"
                style={{
                  backgroundColor: letterBgs[i % letterBgs.length],
                  border: "2px solid black",
                  boxShadow: "4px 4px 0px black",
                  backgroundImage: "repeating-linear-gradient(transparent, transparent 27px, rgba(0,0,0,0.06) 27px, rgba(0,0,0,0.06) 28px)",
                  transform: i % 2 === 0 ? "rotate(-0.5deg)" : "rotate(0.5deg)",
                  textDecoration: "none",
                }}
              >
                <p className="text-sm text-gray-600 leading-7 flex-1 line-clamp-4">{letter.body}</p>
                <div className="flex items-center justify-between mt-4 border-t border-black/10 pt-4">
                  <p className="text-xs text-gray-400 font-bold">— {letter.sender_name}</p>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}