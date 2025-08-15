"use client";
import Artists from "./artists";
import Welcome from "./welcome";

export default function Tabs() {
  return (
    <div className="master-container relative z-10 rounded-tr-[50px] rounded-tl-[50px]">
      <Welcome />
      <Artists />
    </div>
  );
}