"use client";
import Banner from "../components/banner";
import Expect from "../components/faqs/artist/expect";
import Help from "../components/faqs/artist/help";
import StoreInfo from "../components/storeInfo";
import Work from "../components/faqs/artist/work";

export default function NewArtists() {
  return (
    <div>
      <Banner header="New Artists" />
      <h2 className="flex border-b-2 p-5 mb-20">
        <span className="w-full px-20 text-left text-6xl font-bold">
          NEW ARTISTS FAQ'S
        </span>
      </h2>
      <div>
        <Expect />
        <Help />
        <Work />
      </div>
      <StoreInfo />
    </div>
  );
}