"use client";
import { useParams } from "next/navigation";
import ArtistPortfolioClient from "./ArtistPortfolioClient";
import { useEffect, useState } from "react";

export default function ArtistPortfolioPage() {
  const params = useParams();
  const slug = params?.slug;
  const lowerCaseSlug = slug?.toLowerCase();

  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!lowerCaseSlug) return;

    const fetchData = async () => {
      try {
        const res = await fetch("/api/contentful?content_type=artists");
        if (!res.ok) throw new Error("Failed to fetch Contentful data");

        const data = await res.json();

        if (!data.items || data.items.length === 0) {
          throw new Error("No artist data found");
        }

        const matchedArtist = data.items.find(
          (item) => item.fields.artistName.toLowerCase().replace(/\s+/g, "-") === lowerCaseSlug
        );

        if (!matchedArtist) {
          throw new Error("Artist not found");
        }

        const formattedArtist = {
          name: matchedArtist.fields.artistName,
          image: matchedArtist.fields.artistPhoto?.fields.file.url
            ? `https:${matchedArtist.fields.artistPhoto.fields.file.url}`
            : "/default-artist.jpg",
          portfolioImages: matchedArtist.fields.portfolioImages?.map((img) =>
            img.fields.file.url ? `https:${img.fields.file.url}` : "/default-portfolio.jpg"
          ) || [],
        };

        setArtist(formattedArtist);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [lowerCaseSlug]);

  if (loading) return <p>Loading artist portfolio...</p>;
  if (error) return <p>{error}</p>;
  if (!artist) return <p>Artist not found.</p>;

  // Define the number of columns for layout
  const columns = 3;
  const rows = Math.ceil(artist.portfolioImages.length / columns);

  return <ArtistPortfolioClient artist={artist} columns={columns} rows={rows} />;
}