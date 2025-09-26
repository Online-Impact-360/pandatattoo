"use client";
import { gsap } from "gsap";
import { useRef } from "react";

export default function Menu() {
  const menuBtnRef = useRef(null);
  const menuItemRef = useRef(null);

  const menuItems = [
    { id: 1, name: "Home", url: "/" },
    { id: 2, name: "About", url: "/about" },
    { id: 3, name: "Artists", url: "/artists" },
    { id: 4, name: "Shop", url: "/" },
    { id: 5, name: "Blogs", url: "/blog" },
    { id: 6, name: "FAQ's", url: "/faqs" },
  ];

  const handleMenuShow = () => {
    gsap.timeline({ defaults: { ease: "power2.out", duration: 0.2 } })
      .to(menuBtnRef.current, { x: "-100%" })
      .to(menuItemRef.current, { x: "0" });
  };

  const handleMenuHidden = () => {
    gsap.timeline({ defaults: { ease: "power2.out", duration: 0.2 } })
      .to(menuItemRef.current, { x: "-100%" })
      .to(menuBtnRef.current, { x: "0" });
  };

  return (
    <div className="z-50">
      <div onMouseEnter={handleMenuShow} onMouseLeave={handleMenuHidden} className="relative flex rounded-md overflow-hidden">
        <button
          ref={menuBtnRef}
          type="button"
          className="absolute left-0 flex items-center gap-2 bg-black text-white py-3 px-6 text-sm md:text-lg rounded-md font-bold uppercase z-50 hover:text-[#ff4901]"
        >
          <span>Menu</span>
        </button>
        <div
          ref={menuItemRef}
          className="flex flex-col lg:flex-row items-center gap-6 bg-black text-white py-3 px-6 rounded-md -translate-x-full transition-transform"
        >
          {menuItems.map((item) => (
            <a
              key={item.id}
              href={item.url}
              className="font-bold text-sm md:text-lg uppercase hover:text-[#ff4901] transition duration-500 ease-out"
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}