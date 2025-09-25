"use client";
import Image from "next/image";

export default function Banner({ header, height = "60vh" }) {
  return (
    <div className="relative z-0 rounded-b-[50px] shadow-2xl shadow-[0_25px_60px_15px_rgba(225,225,225,0.9)] transition-shadow duration-300 hover:shadow-[0_10px_20px_15px_rgba(255,255,255,0.3)]">
      <h1 className="relative transition-all duration-700 w-full overflow-hidden rounded-b-[50px]" style={{ height }}>
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
        </div>
      </h1>
    </div>
  );
}
