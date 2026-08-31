"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

function SpotifyEmbed({ url }) {
  const trackId = url?.split("/track/")[1]?.split("?")[0];
  if (!trackId) return null;
  return (
    <iframe
      src={"https://open.spotify.com/embed/track/" + trackId}
      width="100%"
      height="80"
      frameBorder="0"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    />
  );
}

export default function Page() {
  const { id } = useParams();
  const [letter, setLetter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLetter = async () => {
      const res = await fetch("/api/letters/" + id);
      const data = await res.json();
      setLetter(data.data);
      setLoading(false);
    };
    fetchLetter();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#e8f5e9" }}>
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400">opening letter.</p>
      </div>
    );

  if (!letter)
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#e8f5e9" }}>
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400">letter not found.</p>
      </div>
    );

  return (
    <div className="min-h-screen px-4 md:px-6 py-8 md:py-12 flex flex-col items-center justify-center" style={{ background: "#e8f5e9" }}>
      <div className="w-full max-w-lg">
        <div className="flex items-end justify-between mb-8">
          <a href="/letters" className="text-xs font-bold uppercase tracking-widest border-2 border-black px-3 py-2 hover:bg-black hover:text-white transition-colors">
            ← back
          </a>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
            {new Date(letter.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>
        </div>

        <div
          className="relative p-8 md:p-12 flex flex-col gap-6"
          style={{
            backgroundColor: "#fff0f5",
            border: "2px solid black",
            boxShadow: "6px 6px 0px black",
            backgroundImage: "repeating-linear-gradient(transparent, transparent 31px, rgba(0,0,0,0.06) 31px, rgba(0,0,0,0.06) 32px)",
          }}
        >
          <div className="absolute top-0 bottom-0 left-16 w-px" style={{ background: "rgba(251,113,133,0.3)" }} />
          <div className="pl-6 flex flex-col gap-6">
            <p className="text-gray-600 leading-8 text-sm whitespace-pre-wrap">{letter.body}</p>
            <div className="border-t border-black/10 pt-6 flex flex-col gap-4">
              {letter.song_url && (
                <div className="flex flex-col gap-2">
                  <SpotifyEmbed url={letter.song_url} />
                </div>
              )}
              <p className="text-sm text-gray-400 font-bold text-right">— {letter.sender_name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}