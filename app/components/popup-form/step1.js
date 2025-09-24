"use client";
import { useState } from "react";

export default function Step1({ formData, handleChange, disabled, artists, selectedArtist, setIsArtistPopupOpen, handleArtistSelect }) {
  const [selectedAge, setSelectedAge] = useState(formData.age || "");

  const handleSpanClick = (value) => {
    setSelectedAge(value);
    handleChange({ target: { name: "age", value } });
  };

  return (
    <div className="flex flex-col justify-between md:h-full">
      <div>
        <h2 className="text-black text-lg font-bold mb-0 text-center">STEP 1/4</h2>
        <h3 className="text-sm text-gray-500 mb-2 text-center">Personal Info</h3>
        <div className="md:space-y-4">
          <div>
            <div className="relative mb-[-10px] px-3 z-10">
              <span className="px-2 bg-white text-[11px] text-[#8c8c8c]">Full name*</span>
            </div>
            <div className="relative z-0">
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full p-2 px-4 border border-solid border-[#e8e6e6] rounded-md text-black text-sm ${
                  disabled ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={disabled}
                required
              />
            </div>
          </div>
          <div>
            <div className="relative mb-[-10px] px-3 z-10">
              <span className="px-2 bg-white text-[11px] text-[#8c8c8c]">Phone Number*</span>
            </div>
            <div className="relative z-0">
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={`w-full p-2 border border-solid border-[#e8e6e6] rounded-md text-black text-sm ${
                  disabled ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={disabled}
                required
              />
            </div>
          </div>
          <div>
            <div className="relative mb-[-10px] px-3 z-10">
              <span className="px-2 bg-white text-[11px] text-[#8c8c8c]">Email Address*</span>
            </div>
            <div className="relative z-0">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-2 border border-solid border-[#e8e6e6] rounded-md text-black text-sm ${
                  disabled ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={disabled}
                required
              />
            </div>
          </div>
          <div>
            <div className="relative mb-[-10px] px-3 z-10">
              <span className="px-2 bg-white text-[11px] text-[#8c8c8c]">Preferred Artist</span>
            </div>
            <div className="relative z-0">
              <input
                type="text"
                value={selectedArtist ? selectedArtist.name : ""}
                readOnly
                onClick={() => !disabled && setIsArtistPopupOpen(true)}
                placeholder="Select preferred artist (optional)"
                className={`w-full p-2 px-4 border border-solid border-[#e8e6e6] rounded-md text-black text-sm cursor-pointer ${
                  disabled ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={disabled}
              />
            </div>
          </div>
          <div className="flex align-center pt-2">
            <div className="mt-2">
              <label className="text-[#8c8c8c] text-[11px] mr-3">Age*</label>
            </div>
            <div className="w-full text-center">
              <label className="flex items-center">
                <input
                  className="hidden"
                  type="radio"
                  name="age"
                  value="under18"
                  checked={formData.age === "under18"}
                  onChange={handleChange}
                  disabled={disabled}
                  required
                />
                <span
                  onClick={() => handleSpanClick("under18")}
                  className={`w-full border border-solid border-[#e8e6e6] py-2 text-[14px] rounded-tl-md rounded-bl-md cursor-pointer ${
                    formData.age === "under18" ? "bg-[#ff4901] text-white" : "text-[#8c8c8c] hover:bg-gray-200"
                  }`}
                >
                  Under 18
                </span>
              </label>
            </div>
            <div className="w-full text-center">
              <label className="flex items-center">
                <input
                  className="hidden"
                  type="radio"
                  name="age"
                  value="over18"
                  checked={formData.age === "over18"}
                  onChange={handleChange}
                />
                <span
                  onClick={() => handleSpanClick("over18")}
                  className={`w-full border border-solid border-[#e8e6e6] py-2 text-[14px] rounded-tr-md rounded-br-md cursor-pointer ${
                    formData.age === "over18" ? "bg-[#ff4901] text-white" : "text-[#8c8c8c] hover:bg-gray-200"
                  }`}
                >
                  Over 18
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}