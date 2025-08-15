"use client";
import Map, { Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { usePopup } from "@/context/popupContext";
import { useEffect, useState } from "react";

export default function StoreInfo() {
  const { openPopup } = usePopup();
  const [storeData, setStoreData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mapUrl, setMapUrl] = useState("");

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        const res = await fetch("/api/contentful?content_type=storeInfo");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        if (!data.items || data.items.length === 0) {
          setError("No store data available");
          setStoreData({
            address: "7814 NE 4TH CT #101, MIAMI, FL 33138",
            hours: "OPEN EVERYDAY 11AM-10PM",
            latitude: 25.8471,
            longitude: -80.1884,
          });
        } else {
          const store = data.items[0].fields;
          setStoreData({
            address: store.address || "7814 NE 4TH CT #101, MIAMI, FL 33138",
            hours: store.hours || "OPEN EVERYDAY 11AM-10PM",
            latitude: store.location?.lat || 25.8471,
            longitude: store.location?.lon || -80.1884,
          });
        }
      } catch (error) {
        setError(error.message || "Failed to load store data");
        setStoreData({
          address: "7814 NE 4TH CT #101, MIAMI, FL 33138",
          hours: "OPEN EVERYDAY 11AM-10PM",
          latitude: 25.8471,
          longitude: -80.1884,
        });
      } finally {
        setLoading(false);
      }
    };

    const isIphone = /iPhone/i.test(navigator.userAgent);
    setMapUrl(
      isIphone
        ? `http://maps.apple.com/?q=${encodeURIComponent("7814 NE 4TH CT #101, MIAMI, FL 33138")}`
        : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("7814 NE 4TH CT #101, MIAMI, FL 33138")}`
    );

    fetchStoreData();
  }, []);

  useEffect(() => {
    if (storeData?.address) {
      const isIphone = /iPhone/i.test(navigator.userAgent);
      setMapUrl(
        isIphone
          ? `http://maps.apple.com/?q=${encodeURIComponent(storeData.address)}`
          : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(storeData.address)}`
      );
    }
  }, [storeData]);

  if (loading) return <p className="text-white text-center">Loading store info...</p>;

  return (
    <div className="relative mb-[-100px] md:flex p-10 lg:px-20 lg:pt-20 pb-[200px] lg:pb-[250px] bg-black rounded-tl-[50px] rounded-tr-[50px] shadow-2xl shadow-[0_25px_60px_15px_rgba(225,225,225,0.7)] transition-shadow duration-300 hover:shadow-[0px_0px_25px_rgba(255,255,255,0.3)]">
      <div className="w-full md:w-2/5">
        <div className="mb-10">
          <h2 className="mt-5 mb-5 text-4xl text-white font-bold">ADDRESS</h2>
          <div className="text-lg text-white font-bold">
            <p>{storeData.address}</p>
          </div>
        </div>
        <div className="mb-10">
          <h2 className="mb-5 text-4xl text-white font-bold">HOURS</h2>
          <div className="font-bold text-white">
            <p>{storeData.hours}</p>
          </div>
        </div>
        <div className="w-3/4 sm:w-2/4 md:w-2/3 mb-5">
          <button
            onClick={() => openPopup()}
            className="w-full p-3 bg-white text-black rounded-md font-bold"
          >
            BOOK NOW
          </button>
        </div>
      </div>
      <div className="block w-full md:w-3/5 bg-white rounded-[30px] overflow-hidden">
        <a href={mapUrl} target="_blank" rel="noopener noreferrer">
          <Map
            initialViewState={{
              latitude: storeData.latitude,
              longitude: storeData.longitude,
              zoom: 17,
              pitch: 60,
              bearing: 0,
            }}
            style={{ width: "100%", height: "400px" }}
            mapStyle="mapbox://styles/mapbox/dark-v11"
            mapboxAccessToken="pk.eyJ1IjoiZ29yZG9uYnl0ZSIsImEiOiJjbTd6bHJ4anIwbDZwMm5xMWgybzE2bHUxIn0.PqTTLarsZXSSgrzyMg4yaQ"
            attributionControl={false}
            terrain={{ source: "mapbox-dem", exaggeration: 1.5 }}
          >
            <Marker longitude={storeData.longitude} latitude={storeData.latitude} color="red" />
            <source
              id="mapbox-dem"
              type="raster-dem"
              url="mapbox://mapbox.mapbox-terrain-dem-v1"
              maxzoom={14}
            />
          </Map>
        </a>
      </div>
    </div>
  );
}