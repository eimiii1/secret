"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const hearts = ["🤍", "🩷", "💗", "🤍", "🩷", "💗", "🤍", "🩷", "💗", "🤍", "🩷", "💗"];

function FloatingHeart({ emoji, style }) {
  return (
    <span className="absolute animate-bounce pointer-events-none select-none" style={style}>
      {emoji}
    </span>
  );
}

function Navbar() {
  const sections = ["gallery", "notes", "letters"];
  return (
    <nav className="sticky top-0 z-50 w-full border-b-2 border-black" style={{ background: "#fff0f5" }}>
      <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
        <span className="font-black text-sm md:text-lg tracking-tight text-black" style={{ fontFamily: "serif" }}>
          for nigga
        </span>
        <div className="flex gap-4 md:gap-6">
          {sections.map((section) => (
            <a
              key={section}
              href={"#" + section}
              className="text-xs font-bold uppercase tracking-widest text-black hover:text-rose-500 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {section}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  const [heartPositions, setHeartPositions] = useState([]);
  useEffect(() => {
    setHeartPositions(
      hearts.map(() => ({
        left: Math.random() * 90 + "%",
        top: Math.random() * 90 + "%",
        fontSize: Math.random() * 20 + 10 + "px",
        animationDelay: Math.random() * 2 + "s",
        animationDuration: Math.random() * 2 + 1 + "s",
        opacity: Math.random() * 0.5 + 0.2,
      }))
    );
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden flex items-center" style={{ background: "#fff0f5" }}>
      {heartPositions.map((style, i) => (
        <FloatingHeart key={i} emoji={hearts[i]} style={style} />
      ))}
      <div className="relative z-10 max-w-5xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-20">
        <div className="flex flex-col gap-4 text-center md:text-left items-center md:items-start">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-rose-400">nigga yarn?</p>
          <h1 className="text-6xl md:text-8xl font-black leading-none text-black" style={{ fontFamily: "serif" }}>
            HI,<br />
            <span className="text-rose-400">MAHAL</span>
          </h1>
          <p className="text-sm text-gray-500 max-w-xs leading-relaxed mt-2">
            sana basahin mo to nigga
          </p>
          <div
            className="mt-4 w-full bg-black text-white text-xs font-bold uppercase tracking-widest py-2 overflow-hidden whitespace-nowrap"
            style={{ transform: "rotate(-1deg)" }}
          >
            <span className="inline-block animate-marquee">
              nagngangawngaw yan lods solid high protein parang makahiya android pa grabe &nbsp;&nbsp;&nbsp; nagngangawngaw yan lods solid high protein parang makahiya android pa grabe &nbsp;&nbsp;&nbsp;
            </span>
          </div>
        </div>

        <div className="flex justify-center items-center relative">
          <div
            className="relative w-56 h-64 md:w-72 md:h-80"
            style={{
              border: "3px solid black",
              background: "white",
              padding: "10px 10px 40px 10px",
              boxShadow: "6px 6px 0px black",
              transform: "rotate(2deg)",
            }}
          >
            <div className="w-full h-full relative">
              <img src="/meandmybaby.jpg" alt="us" className="w-full h-full object-cover" />
            </div>
            <p className="absolute bottom-2 left-0 right-0 text-center text-xs font-bold text-gray-400 uppercase tracking-widest">
              nigga
            </p>
          </div>
          <div
            className="absolute -top-4 -right-2 md:-right-4 bg-rose-400 text-white text-xs font-black px-3 py-1 rounded-full border-2 border-black"
            style={{ transform: "rotate(12deg)" }}
          >
            you're loved!
          </div>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    const fetchImages = async () => {
      const res = await fetch("/api/gallery");
      const data = await res.json();
      setPhotos(data.photos);
    };
    fetchImages();
  }, []);

  const rotations = [-2, 1.5, -1, 2.5, -1.5, 1];
  return (
    <section id="gallery" className="px-4 md:px-6 py-16 md:py-24" style={{ background: "#fdf4ff" }}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-end justify-between mb-8 md:mb-12">
          <div className="flex items-end gap-4">
            <h2 className="text-4xl md:text-6xl font-black text-black leading-none" style={{ fontFamily: "serif" }}>
              GALLERY
            </h2>
            <span className="text-rose-400 text-2xl md:text-4xl mb-1">✦</span>
          </div>
          <a href="/gallery" className="text-xs font-bold uppercase tracking-widest border-2 border-black px-3 py-2 hover:bg-black hover:text-white transition-colors">
            see all →
          </a>
        </div>
        {photos.length === 0 ? (
          <p className="text-center text-xs font-bold uppercase tracking-widest text-gray-300 mt-20">no photos yet</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {photos.slice(0, 6).map((photo, i) => (
              <div
                key={i}
                className="flex flex-col items-center"
                style={{ transform: "rotate(" + rotations[i] + "deg)" }}
              >
                <div style={{ background: "white", border: "2px solid black", padding: "8px 8px 28px 8px", boxShadow: "4px 4px 0px black" }}>
                  <div className="aspect-square overflow-hidden" style={{ minWidth: 100, minHeight: 100 }}>
                    <img src={photo.url} alt="photo" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

const noteColors = ["#fff0f5", "#f0f7ff", "#f5fff0"];
const noteBorders = ["#fb7185", "#60a5fa", "#4ade80"];

function Notes() {
  const placeholders = [
    { title: "Note 1", body: "soasde..." },
    { title: "Note 2", body: "asd..." },
    { title: "Note 3", body: "asd.." },
  ];
  return (
    <section id="notes" className="px-4 md:px-6 py-16 md:py-24" style={{ background: "#fff8e1" }}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-end justify-between mb-8 md:mb-12">
          <div className="flex items-end gap-4">
            <h2 className="text-4xl md:text-6xl font-black text-black leading-none" style={{ fontFamily: "serif" }}>
              NOTES
            </h2>
            <span className="text-yellow-400 text-2xl md:text-4xl mb-1">✦</span>
          </div>
          <a href="/notes" className="text-xs font-bold uppercase tracking-widest border-2 border-black px-3 py-2 hover:bg-black hover:text-white transition-colors">
            see all →
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {placeholders.map((note, i) => (
            <div
              key={i}
              className="relative p-6 flex flex-col gap-3"
              style={{
                background: noteColors[i],
                border: "2px solid black",
                boxShadow: "4px 4px 0px black",
                transform: i % 2 === 0 ? "rotate(-1deg)" : "rotate(1deg)",
              }}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-2 border-black" style={{ background: noteBorders[i] }} />
              <p className="text-xs font-black uppercase tracking-widest text-black">{note.title}</p>
              <p className="text-sm text-gray-600 leading-relaxed">{note.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const letterBgs = ["#fff0f5", "#fdf4ff", "#fff0f3"];

function Letters() {
  const letters = [
    {
      greeting: "",
      body: "I know this is beri beri beri random but I'd just like you to know that I love you so much.",
      closing: "nigga",
      seal: "",
    },
  ];
  return (
    <section id="letters" className="px-4 md:px-6 py-16 md:py-24" style={{ background: "#e8f5e9" }}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-end justify-between mb-8 md:mb-12">
          <div className="flex items-end gap-4">
            <h2 className="text-4xl md:text-6xl font-black text-black leading-none" style={{ fontFamily: "serif" }}>
              LETTERS
            </h2>
            <span className="text-green-400 text-2xl md:text-4xl mb-1">✦</span>
          </div>
          <a href="/letters" className="text-xs font-bold uppercase tracking-widest border-2 border-black px-3 py-2 hover:bg-black hover:text-white transition-colors">
            see all →
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {letters.map((letter, i) => (
            <div
              key={i}
              className="relative p-8 flex flex-col gap-4"
              style={{
                background: letterBgs[i],
                border: "2px solid black",
                boxShadow: "4px 4px 0px black",
                backgroundImage: "repeating-linear-gradient(transparent, transparent 27px, rgba(0,0,0,0.06) 27px, rgba(0,0,0,0.06) 28px)",
                transform: i % 2 === 0 ? "rotate(-0.5deg)" : "rotate(0.5deg)",
              }}
            >
              <p className="text-xs font-black uppercase tracking-widest text-gray-400">{letter.greeting}</p>
              <p className="text-sm text-gray-600 leading-7 flex-1">{letter.body}</p>
              <div className="flex items-center justify-between mt-4 border-t border-black/10 pt-4">
                <span className="text-2xl">{letter.seal}</span>
                <p className="text-xs text-gray-400 font-bold">{letter.closing}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <div className="relative">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 12s linear infinite;
        }
      `}</style>
      <Navbar />
      <Hero />
      <Gallery />
      <Notes />
      <Letters />
    </div>
  );
}