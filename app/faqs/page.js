"use client";
import After from "../components/faqs/after";
import Before from "../components/faqs/before";
import Banner from "../components/banner";
import Piercings from "../components/faqs/piercings";
import React, { useState } from "react";
import StoreInfo from "../components/storeInfo";

export default function Faqs() {
  const [openSection, setOpenSection] = useState(null);
  const closeAllSections = true;

  const handleToggle = (section) => {
    setOpenSection(closeAllSections && openSection === section ? null : section);
  };

  return (
    <div>
      <Banner header="FAQ'S" />
      <h2 className="flex border-b-2 p-5">
        <span className="w-full px-5 lg:px-20 text-left text-white font-bold text-md md:text-4xl xl:text-6xl">
          FREQUENTLY ASKED QUESTIONS
        </span>
      </h2>
      <div>
        <After
          isOpen={openSection === "after"}
          onToggle={() => handleToggle("after")}
        />
        <Before
          isOpen={openSection === "before"}
          onToggle={() => handleToggle("before")}
        />
        <Piercings
          isOpen={openSection === "piercings"}
          onToggle={() => handleToggle("piercings")}
        />
      </div>
      <StoreInfo />
    </div>
  );
}