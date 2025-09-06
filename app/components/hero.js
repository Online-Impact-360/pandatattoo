"use client";
import Image from "next/image";
import Parallax from "parallax-js";
import ActionButtons from "./actionButtons";
import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const [currentTime, setCurrentTime] = useState("");
  const [studioStatus, setStudioStatus] = useState("CLOSED");
  const [isOpen, setIsOpen] = useState(false);

  const sceneRef1 = useRef(null);
  const sceneRef2 = useRef(null);
  const sceneRef3 = useRef(null);
  const sceneRef4 = useRef(null);

  const isStudioClosedManually = false;

  useEffect(() => {
    const updateCurrentTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 || 12;

      setCurrentTime(`${formattedHours}:${minutes} ${ampm}`);
      setStudioStatus(isStudioClosedManually || hours < 11 || hours >= 21 ? "CLOSED" : "OPEN");
      setIsOpen(!isStudioClosedManually && hours >= 11 && hours < 21);
    };

    updateCurrentTime();
    const interval = setInterval(updateCurrentTime, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const parallaxElements = [sceneRef1, sceneRef2, sceneRef3, sceneRef4];
    const instances = parallaxElements.map((ref) =>
      ref.current
        ? new Parallax(ref.current, {
            relativeInput: true,
            hoverOnly: false,
            clipRelativeInput: true,
          })
        : null
    );

    return () => instances.forEach((instance) => instance?.destroy());
  }, []);

  return (
    <div className="hero relative z-0">
      <h1 className="hidden" >Panda Tattoo – Miami’s Premier Fine Line & Realism Studio</h1>
      <div className="hero-container relative h-screen w-full">
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
        
        {/* Action Buttons in Center */}
        <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-auto">
          <ActionButtons variant="home" />
        </div>
        
        <div
          ref={sceneRef1}
          className="absolute bottom-20 md:bottom-14 left-0 md:left-20 z-20 px-4 py-4 text-white text-sm md:text-lg text-left"
        >
          <div data-depth="0.2">© {new Date().getFullYear()} | MIAMI, FL</div>
        </div>
        <div
          ref={sceneRef2}
          className="absolute bottom-20 md:bottom-14 right-0 md:right-20 z-20 px-4 py-4 text-white text-sm md:text-lg text-right"
        >
          <div className="text-center" data-depth="0.2">
            7814 NE 4TH CT #101,<br /> MIAMI, FL 33138
          </div>
        </div>
        <div
          ref={sceneRef3}
          className="absolute w-full top-[80%] lg:top-[60%] text-left z-20 text-white text-xl md:text-4xl font-bold -translate-y-1/2 overflow-hidden"
        >
          <div data-depth="0.2" className="ml-[10%] lg:ml-[20%]">
            {currentTime}
          </div>
        </div>
        <div
          ref={sceneRef4}
          className="absolute w-full top-[80%] lg:top-[60%] text-right z-20 text-white text-xl md:text-4xl font-bold -translate-y-1/2 overflow-hidden"
        >
          <div data-depth="0.2" className="mr-[10%] lg:mr-[20%]">
            STUDIO: <span className={isOpen ? "text-green-500" : "text-red-500"}>{studioStatus}</span>
          </div>
        </div>
      </div>
    </div>
  );
}