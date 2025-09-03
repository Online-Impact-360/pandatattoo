"use client";
import Banner from "../components/banner";
import React, { useEffect, useState } from "react";

export default function ArtistsPage() {
  const [artists, setArtists] = useState([]);
  const [shuffledArtists, setShuffledArtists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/contentful?content_type=artists");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();

        if (data.items.length > 0) {
          const formattedArtists = data.items.map((item) => ({
            id: item.sys.id,
            name: item.fields.artistName,
            slug: item.fields.artistName.toLowerCase().replace(/\s+/g, "-"),
            image: item.fields.artistPhoto?.fields?.file?.url
              ? `${item.fields.artistPhoto.fields.file.url}`
              : "/default-artist.jpg",
          }));

          setArtists(formattedArtists);
          setShuffledArtists([...formattedArtists].sort(() => Math.random() - 0.5));
        }
      } catch (error) {
        // Error handling is minimal to avoid console clutter in production
      }
    };

    fetchData();
  }, []);

  return (
    <section>
      {/* Header */}
      <Banner header="Artists" />
      <h2 className="flex border-b-2 p-5">
        <span className="w-1/5 text-left text-xs md:text-xl text-white">
          ({artists.length} ARTISTS)
        </span>
        <span className="w-4/5 text-right text-lg md:text-4xl font-bold text-white">
          BROWSE OUR ARTIST ROSTER
        </span>
      </h2>

      {/* Artist Grid */}
      <div className="grid gap-14 mt-10 pt-0 pb-20 p-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {shuffledArtists.map((artist) => (
          <div
            key={artist.id}
            className="card relative group overflow-hidden rounded-[40px] shadow-lg bg-gray-800 text-center"
          >
            {/* Artist Link */}
            <a href={`/artists/${artist.slug}`} className="block group">
              {/* Artist Image */}
              <img
                src={artist.image}
                alt={artist.name}
                className="w-[100%] h-[400px] md:h-[600px] object-cover m-auto transition-transform duration-700 group-hover:scale-125"
              />
              {/* Artist Name */}
              <h3 className="absolute p-10 bottom-0 w-full bg-opacity-60 text-white text-center py-2 uppercase font-extrabold text-2xl lg:text-lg xl:text-xl">
                <span className="hidden xl:inline">Artist •</span> {artist.name}
              </h3>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}