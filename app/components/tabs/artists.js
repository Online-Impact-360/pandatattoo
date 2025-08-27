"use client";
import Slider from "react-slick";
import { usePopup } from "@/context/popupContext";
import { useEffect, useState } from "react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

export default function Artists({ isActive }) {
  const [contentfulData, setContentfulData] = useState(null);
  const [artistsList, setArtistsList] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [shuffledArtists, setShuffledArtists] = useState([]);
  const [totalArtists, setTotalArtists] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/contentful?content_type=artists");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        if (data.items.length > 0) {
          setContentfulData(data.items);
          const artistNames = data.items.map((item) => item.fields.artistName);
          setShuffledArtists(shuffleArray([...artistNames, ...artistNames]));
          setArtistsList(
            data.items.map((item, index) => ({
              id: index + 1,
              name: item.fields.artistName,
              slug: item.fields.artistName,
              image: item.fields.artistPhoto.fields.file.url,
            }))
          );
          setTotalArtists(data.items.length);
        }
      } catch (error) {
        console.error("Error fetching Contentful data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const shuffleArray = (array) =>
    array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

  const sliderSettings = (isReverse) => ({
    dots: false,
    arrows: false,
    infinite: true,
    speed: 15000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    rtl: isReverse,
    variableWidth: true,
    initialSlide: 0,
  });

  const { openPopup } = usePopup();

  const handleArtistClick = (name) => {
    if (name === "Panda Tattoo") {
      return;
      // openPopup({ artist: null });
    } else {
      const artist = artistsList.find((artist) => artist.name === name);
      if (artist) openPopup({ artist });
    }
  };

  if (!isMounted) {
    return (
      <section className="accordion relative bg-[#090D11] z-10 text-white pb-[150px] overflow-hidden">
        <div className="title">
          <h2 className="flex border-t-2 border-b-2 p-5">
            <span className="w-1/5 text-xs md:text-lg text-left">({totalArtists} ARTISTS)</span>
            <span className="w-4/5 text-right text-lg md:text-4xl font-bold">
              BROWSE OUR ARTIST ROSTER
            </span>
          </h2>
        </div>
        <div role="region" className="region overflow-hidden">
          <div className="h-24 flex items-center justify-center">
            <p>Loading artists...</p>
          </div>
        </div>
      </section>
    );
  }

  const rows = [];
  for (let i = 0; i < shuffledArtists.length; i += 3) {
    rows.push(shuffledArtists.slice(i, i + 3));
  }

  return (
    <section className="accordion relative bg-[#090D11] z-10 text-white pb-[150px] overflow-hidden">
      <div className="title">
        <h2 className="flex border-t-2 border-b-2 p-5">
          <span className="w-1/5 text-xs md:text-lg text-left">({totalArtists} ARTISTS)</span>
          <span className="w-4/5 text-right text-lg md:text-4xl font-bold">
            BROWSE OUR ARTIST ROSTER
          </span>
        </h2>
      </div>
      <div role="region" className="region overflow-hidden">
        {rows.map((row, rowIndex) => (
          <Slider key={rowIndex} {...sliderSettings(rowIndex % 2 !== 0)} className="my-1 sm:my-2 lg:my-8">
            {row.flatMap((artist, artistIndex) => [
              <div
                key={`${artist}-name-${rowIndex}-${artistIndex}`}
                className="artist-name m-2 text-white text-center text-[38px] xl:text-[54px] font-bold uppercase text-nowrap cursor-pointer inline-block"
                style={{ width: "auto", minWidth: "100px" }}
                onClick={() => handleArtistClick(artist)}
              >
                {artist}
              </div>,
              <div
                key={`${artist}-panda-${rowIndex}-${artistIndex}`}
                className="panda-tattoo m-2 text-gray-500 text-center text-[38px] xl:text-[54px] font-bold uppercase text-nowrap cursor-pointer inline-block"
                style={{ width: "auto", minWidth: "200px" }}
                onClick={() => handleArtistClick("Panda Tattoo")}
              >
                PANDA TATTOO
              </div>,
            ])}
          </Slider>
        ))}
      </div>
    </section>
  );
}