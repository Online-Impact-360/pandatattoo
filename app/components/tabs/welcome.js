"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import "../../globals.css";

gsap.registerPlugin(ScrollTrigger);

export default function Welcome({ isActive }) {
  const [contentfulData, setContentfulData] = useState(null);
  const sectionRef = useRef(null);
  const wordsRef = useRef(null);
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/contentful?content_type=welcome");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        if (data.items.length > 0) setContentfulData(data.items[0].fields);
      } catch (error) {
        console.error("Error fetching Contentful data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const words = wordsRef.current;
    const container = containerRef.current;
    const content = contentRef.current;
    const mm = gsap.matchMedia();

    gsap.set(container, { y: 0 });

    gsap.fromTo(
      section,
      { height: "50vh" },
      {
        height: "100vh",
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 20%",
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      words,
      { y: "100%" },
      {
        y: "-100%",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          scrub: true,
        },
      }
    );

    mm.add("(min-width: 1024px)", () => {
      gsap.to(container, {
        y: "30%",
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 50%",
          end: "top top",
          scrub: 1,
        },
      });
    });

    mm.add("(max-width: 1023px)", () => {
      gsap.to(container, {
        y: "100%",
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 50%",
          end: "top top",
          scrub: 1,
        },
      });
    });

    ScrollTrigger.create({
      trigger: section,
      start: "top top+=10px",
      end: "bottom bottom",
      pin: container,
      pinSpacing: false,
      anticipatePin: 1,
    });

    gsap.fromTo(
      content,
      { opacity: 0 },
      {
        opacity: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: section,
          start: "top 40%",
          end: "top 10%",
          scrub: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative accordion rounded-md transparent overflow-hidden bg-[#090D11] shadow-2xl shadow-[0_25px_60px_15px_rgba(225,225,225,0.9)] rounded-tr-[50px] rounded-tl-[50px]"
      style={{ position: "relative", minHeight: "50vh" }}
    >
      <div className="title hidden">
        <h2 className="flex border-t-2 border-b-2 p-5">
          <span className="w-1/5 text-left"></span>
          <span className="w-4/5 text-right text-4xl font-bold">WELCOME</span>
        </h2>
      </div>
      <div role="region" className="region h-[100%] relative overflow-hidden text text-center">
        <div className="flex flex-col pt-0 p-10 lg:p-20">
          <div
            ref={wordsRef}
            className="absolute inset-0 z-[1] pl-2 pr-2 md:pl-20 md:pr-20 flex flex-col justify-between text-white opacity-10 pointer-events-none"
            style={{ height: "200%", top: "0" }}
          >
            <div className="flex justify-between py-10 px-1 md:px-4 text-sm text-center">
              <span className="w-full floating-animation text-xs lg:text-lg px-2">
                WE KNOW BODY ART
              </span>
              <span className="w-full floating-animation text-xs lg:text-lg px-2">
                TIMELESS INK & ARTISTRY
              </span>
              <span className="w-full floating-animation text-xs lg:text-lg px-2">
                MIAMI, FLORIDA | © 2024
              </span>
            </div>
          </div>
          <div
            ref={containerRef}
            className="absolute w-full flex flex-col items-center"
            style={{ left: "50%", transform: "translateX(-50%)" }}
          >
            <div ref={contentRef} className="w-full flex flex-col items-center">
              <div className="mt-0 stack text-white text-4xl md:text-8xl font-bold" style={{ "--stacks": "3" }}>
                {[...Array(3)].map((_, i) => (
                  <span
                    className="text-4xl md:text-8xl"
                    key={i}
                    style={{ "--index": `${i}` }}
                    dangerouslySetInnerHTML={{
                      __html: contentfulData?.title?.content?.map((para) => para.content[0].value).join("<br>"),
                    }}
                  />
                ))}
              </div>
              {contentfulData?.image?.fields?.file?.url ? (
                <div className="relative text-center">
                  <img
                    className="m-auto mt-12 mb-10 px-20 md:p-0"
                    src={`https:${contentfulData.image.fields.file.url}`}
                    alt="Logo"
                  />
                </div>
              ) : (
                <div className="relative text-center">
                  <img className="m-auto mt-12 mb-10 px-20 md:p-0" src="/logo.png" alt="Logo" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}