"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

const tattooStyles = [
  { id: "anime-manga", name: "Anime/Manga", image: "/booking/7.jpeg" },
  { id: "realism", name: "Large/Full Sleeve Realism", image: "/booking/6.jpeg" },
  { id: "micro-realism", name: "Micro Realism", image: "/booking/2.jpeg" },
  { id: "fine-line-script", name: "Fine Line Script", image: "/booking/8.jpeg" },
  { id: "ornamental", name: "Ornamental", image: "/booking/5.jpeg" },
  { id: "color-realism", name: "Color Realism", image: "/booking/4.jpeg" }, //
  { id: "illustrative", name: "Illustrative", image: "/booking/9.jpeg" }, //
  { id: "minimal-fine-line", name: "Minimal/Fine Line", image: "/booking/3.jpeg" }, //
  { id: "floral", name: "Floral", image: "/booking/1.jpeg" } //
];

export default function Step0({ formData, handleChange, disabled }) {
  const [selectedStyles, setSelectedStyles] = useState(formData.selectedTattooStyles || []);
  const [somethingDifferent, setSomethingDifferent] = useState(formData.somethingDifferent || false);

  useEffect(() => {
    // Update formData when selectedStyles changes
    handleChange({ target: { name: "selectedTattooStyles", value: selectedStyles } });
  }, [selectedStyles]);

  useEffect(() => {
    // Update formData when somethingDifferent changes
    handleChange({ target: { name: "somethingDifferent", value: somethingDifferent } });
  }, [somethingDifferent]);

  const handleStyleToggle = (styleId) => {
    setSelectedStyles(prev =>
      prev.includes(styleId)
        ? prev.filter(id => id !== styleId)
        : [...prev, styleId]
    );
  };

  const handleSomethingDifferentToggle = () => {
    setSomethingDifferent(prev => !prev);
  };

  return (
    <div className="flex flex-col justify-between md:h-full">
      <div>
        <h2 className="text-black text-lg font-bold mb-0 text-center">STEP 0/4</h2>
        <h3 className="text-sm text-gray-500 mb-4 text-center">Tattoo Style Selection</h3>

        <div className="text-center mb-6">
          <h4 className="text-black text-md font-semibold uppercase">SELECT ALL THAT APPLY</h4>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-6">
          {tattooStyles.map((style) => (
            <div
              key={style.id}
              className={`relative border-2 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${
                selectedStyles.includes(style.id)
                  ? 'border-[#ff4901] ring-2 ring-[#ff4901] ring-opacity-50'
                  : 'border-gray-300 hover:border-gray-400'
              } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => !disabled && handleStyleToggle(style.id)}
            >
              <div className="aspect-[4/3] relative">
                <Image
                  src={style.image}
                  alt={style.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-200" />
                <div className="absolute top-2 right-2">
                  <input
                    type="checkbox"
                    checked={selectedStyles.includes(style.id)}
                    onChange={() => {}} // Handled by onClick
                    className="w-4 h-4 text-[#ff4901] bg-gray-100 border-gray-300 rounded focus:ring-[#ff4901] focus:ring-2"
                    disabled={disabled}
                  />
                </div>
              </div>
              <div className="p-2 bg-white">
                <p className="text-xs text-center text-black font-medium">{style.name}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={somethingDifferent}
              onChange={handleSomethingDifferentToggle}
              className="w-4 h-4 text-[#ff4901] bg-gray-100 border-gray-300 rounded focus:ring-[#ff4901] focus:ring-2 mr-3"
              disabled={disabled}
            />
            <span className={`text-sm ${disabled ? 'text-gray-400' : 'text-black'}`}>
              Something different (if none above apply)
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}