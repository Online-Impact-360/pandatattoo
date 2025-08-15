"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "./components/hero";
import Tabs from "./components/tabs/tabs";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    gsap.to(hero, {
      filter: "blur(10px)",
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "50% top",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div>
      <div
        ref={heroRef}
        className="fixed top-0 left-0 w-full h-full z-0"
      >
        <Hero />
      </div>
      <div className="relative mt-[100vh] z-10 mb-[-100px]">
        <Tabs />
      </div>
    </div>
  );
}