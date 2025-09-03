"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Banner({ header }) {
  const renderDots = () => {
    const dots = [];
    for (let i = 0; i < 12; i++) {
      const dotPositions = Array.from({ length: 5 }, (_, j) => i * 30 + j * 6);
      dotPositions.forEach((angle, index) => {
        const isNumber = index === 0;
        const size = isNumber ? "w-2.5 h-5" : "w-1 h-1";
        dots.push(
          <div
            key={`${i}-${index}`}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            style={{
              transform: `rotate(${angle}deg) translateY(-250px)`,
            }}
          >
            <div className={`${size} rounded-full bg-white`}></div>
          </div>
        );
      });
    }
    return dots;
  };

  return (
    <div className="relative z-0 rounded-b-[50px] shadow-2xl shadow-[0_25px_60px_15px_rgba(225,225,225,0.9)] transition-shadow duration-300 hover:shadow-[0_10px_20px_15px_rgba(255,255,255,0.3)]">
      <h1 className="relative transition-all duration-700 h-[60vh] md:h-[60vh] hover:md:h-[70vh] w-full overflow-hidden rounded-b-[50px]">
        {header.length <= 6 ? (
          <>
            <div className="absolute top-[30%] left-[-20%] font-bold text-white z-10 text-4xl md:text-4xl lg:text-6xl xl:text-9xl transform translate-x-1/2">
              <h2 className="uppercase text-white">{header}</h2>
            </div>
            <div className="absolute top-[30%] right-[-20%] font-bold z-10 text-4xl md:text-4xl lg:text-6xl xl:text-9xl transform -translate-x-1/2">
              <h2 className="uppercase text-white">{header}</h2>
            </div>
            <div className="absolute top-[30%] flex w-full justify-center text-center font-bold z-20 text-4xl md:text-4xl lg:text-6xl xl:text-9xl">
              <h2 className="uppercase text-white">{header}</h2>
            </div>
          </>
        ) : (
          <div className="absolute top-[30%] flex w-full justify-center text-center font-bold z-20 text-6xl xl:text-9xl">
            <h2 className="uppercase text-white">{header}</h2>
          </div>
        )}
        <div className="absolute inset-0 z-0">
          <Image src="/hero.jpg" alt="Hero Background" layout="fill" objectFit="cover" priority />
          <div
            className="absolute inset-0 z-10 pointer-events-none opacity-30"
            style={{
              backgroundImage: `
                radial-gradient(circle, white 10px, transparent 11px),
                radial-gradient(circle, white 10px, transparent 11px)
              `,
              backgroundSize: "50% 32%",
              backgroundPosition: "20% 50%, 83% 50%, 90% 80%",
            }}
          ></div>
        </div>
      </h1>
    </div>
  );
}