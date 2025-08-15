"use client";
import Banner from "../../components/banner";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePopup } from "@/context/popupContext";

export default function ArtistPortfolioClient({ artist, columns, rows }) {
  const { openPopup } = usePopup();

  // Handle opening the popup with the artist data
  const handleOpenPopup = () => {
    openPopup({ artist });
  };

  return (
    <div>
      <Banner header={artist.name} />
      <section className="mb-20">
        <div className="flex border-b-2 p-5 text-[#AEB4B2]">
          <div className="flex w-3/5">
            <div className="flex flex-col justify-center w-full">
              <span className="block text-xs md:text-sm w-full text-left text-white align-top text-nowrap">
                ( ARTIST )
              </span>
              <span className="block text-md md:text-xl lg:text-4xl w-full xl:text-6xl xl:pl-5 xl:w-4/5 text-left text-white font-bold uppercase">
                {artist.name}
              </span>
            </div>
            <div className="flex-col justify-center w-full hidden sm:flex xl:p-5 text-xs md:text-sm lg:text-lg">
              <p className="font-bold uppercase text-white">( PORTFOLIO )</p>
              <p className="text-white">2018-CURRENT</p>
            </div>
            <div className="flex flex-col justify-center text-xs md:text-sm lg:text-lg w-full xl:p-5">
              <Link
                href={`https://instagram.com/${artist.name.toLowerCase()}`}
                className="block underline text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                INSTAGRAM
              </Link>
            </div>
          </div>
          <div className="relative flex w-2/5 py-[6px] px-6 sm:px-12 lg:px-20 items-center text-center">
            <button
              onClick={handleOpenPopup}
              className="relative w-full text-nowrap text-sm md:text-lg lg:text-3xl xl:text-5xl m-auto py-2 xl:py-5 transition-transform duration-500 bg-[#FF4901] hover:bg-[#ff6701] text-white font-bold rounded-md"
            >
              BOOK · NOW
            </button>
          </div>
        </div>
        {/* Portfolio Images Grid */}
        <div className="relative grid grid-flow-row grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-16 p-10 lg:p-16">
          {/* Background Lines */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <div
                key={`vertical-${colIndex}`}
                className="absolute top-0 bottom-0 w-[2px] bg-gray-300"
                style={{
                  left: `${(colIndex + 0.5) * (100 / columns)}%`,
                }}
              ></div>
            ))}
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <div
                key={`horizontal-${rowIndex}`}
                className="absolute left-0 right-0 h-[2px] bg-gray-300"
                style={{
                  top: `${(rowIndex + 0.5) * (100 / rows)}%`,
                }}
              ></div>
            ))}
            {Array.from({ length: rows - 1 }).map((_, rowIndex) =>
              Array.from({ length: columns - 1 }).map((_, colIndex) => (
                <div
                  key={`dot-${rowIndex}-${colIndex}`}
                  className="absolute w-5 h-5 bg-gray-300 rounded-full"
                  style={{
                    top: `${(rowIndex + 1) * (100 / rows) - 0.6}%`,
                    left: `${(colIndex + 1) * (100 / columns)}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                ></div>
              ))
            )}
          </div>
          {artist.portfolioImages.map((image, index) => {
            const imageUrl = image.startsWith("//") ? `https:${image}` : image;
            return (
              <div
                key={index}
                className="card relative overflow-hidden shadow-lg bg-gray-800 rounded-[5%] sm:rounded-[10%] text-center group cursor-pointer"
              >
                <Image
                  src={imageUrl}
                  alt={`Tattoo Portfolio Image #${index + 1}`}
                  width={600}
                  height={600}
                  className="w-[100%] h-[400px] md:h-[600px] object-cover m-auto transition-transform duration-700 group-hover:scale-125"
                  onError={(e) => {
                    e.target.src = "/fallback-image.jpg";
                  }}
                />
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}