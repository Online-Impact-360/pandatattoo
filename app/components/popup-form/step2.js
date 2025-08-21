"use client";
import FemaleBackSVG from "./FemaleBackSVG";
import FemaleFrontSVG from "./FemaleFrontSVG";
import MaleBackSVG from "./MaleBackSVG";
import MaleFrontSVG from "./MaleFrontSVG";
import { useEffect, useState } from "react";

export default function Step2({ formData, handleChange, handleFileChange, onImageViewChange, onBodyPositionUpdate, disabled }) {
  const [selectedGender, setSelectedGender] = useState(formData.gender || "");
  const [selectedSize, setSelectedSize] = useState(formData.size || "");
  const [selectedColor, setSelectedColor] = useState(formData.color || "");

  useEffect(() => {
    setSelectedGender(formData.gender || "");
  }, [formData.gender]);

  const handleSpanClick = (name, value) => {
    if (disabled) return;
    
    switch (name) {
      case "gender":
        setSelectedGender(value);
        break;
      case "size":
        setSelectedSize(value);
        break;
      case "color":
        setSelectedColor(value);
        break;
    }
    handleChange({ target: { name, value } });
  };

  const getImagePrefix = () => (formData.gender === "Male" ? "m-" : "f-");

  const handlePositionClick = (position) => {
    handleChange({ target: { name: "selectedPosition", value: position } });
    handleChange({ target: { name: "isImageView", value: true } });
    onImageViewChange(true);
  };

  const handlePathClick = (className, isRemoval) => {
    if (disabled) return;

    const currentPositions = formData.bodyPositionImage ? formData.bodyPositionImage.split(",").map((item) => item.trim()) : [];
    const updatedPositions = isRemoval
      ? currentPositions.filter((pos) => pos !== className)
      : [...new Set([...currentPositions, className])];
    const updatedValue = updatedPositions.join(",");
    handleChange({ target: { name: "bodyPositionImage", value: updatedValue } });
    if (onBodyPositionUpdate) onBodyPositionUpdate(className, isRemoval);
  };

  return (
    <div className="flex flex-col justify-between md:h-full">
      {formData.isImageView ? (
        <div className="flex flex-col h-full">
          <div className="flex-1 flex items-center justify-center p-4">
            {formData.gender === "Male" ? (
              formData.selectedPosition === "front" ? (
                <MaleFrontSVG formData={formData} onPathClick={handlePathClick} className="max-w-full max-h-[400px] object-contain" />
              ) : (
                <MaleBackSVG formData={formData} onPathClick={handlePathClick} className="max-w-full max-h-[400px] object-contain" />
              )
            ) : (
              formData.selectedPosition === "front" ? (
                <FemaleFrontSVG formData={formData} onPathClick={handlePathClick} className="max-w-full max-h-[400px] object-contain" />
              ) : (
                <FemaleBackSVG formData={formData} onPathClick={handlePathClick} className="max-w-full max-h-[400px] object-contain" />
              )
            )}
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-black text-lg font-bold mb-0 text-center">STEP 2/3</h2>
          <h3 className="text-sm text-gray-500 mb-2 text-center">Tattoo Idea</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-full text-center">
                <label className="flex items-center">
                  <input
                    className="hidden"
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={formData.gender === "Male"}
                    onChange={handleChange}
                    disabled={disabled}
                  />
                  <span
                    onClick={() => handleSpanClick("gender", "Male")}
                    className={`w-full border border-solid border-[#e8e6e6] py-2 text-[14px] rounded-tl-md rounded-bl-md cursor-pointer ${
                      formData.gender === "Male" ? "bg-[#ff4901] text-white" : "text-[#8c8c8c] hover:bg-gray-200"
                    }`}
                  >
                    Male
                  </span>
                </label>
              </div>
              <div className="w-full text-center">
                <label className="flex items-center">
                  <input
                    className="hidden"
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={formData.gender === "Female"}
                    onChange={handleChange}
                  />
                  <span
                    onClick={() => handleSpanClick("gender", "Female")}
                    className={`w-full border border-solid border-[#e8e6e6] py-2 text-[14px] rounded-tr-md rounded-br-md cursor-pointer ${
                      formData.gender === "Female" ? "bg-[#ff4901] text-white" : "text-[#8c8c8c] hover:bg-gray-200"
                    }`}
                  >
                    Female
                  </span>
                </label>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-full">
                <label className="px-2 bg-white text-[11px] text-[#8c8c8c]">Body Position*</label>
              </div>
              <div className="flex w-[300px]">
                <div className="w-full">
                  <div
                    htmlFor="bodyPositionImage"
                    className="w-full h-full text-[10px] text-[#8c8c8c] p-2 text-center cursor-pointer"
                    onClick={() => handlePositionClick("front")}
                  >
                    <img src={`/model/${getImagePrefix()}modela.png`} alt="Front" className="block h-[50px] m-auto" />
                    <span className="block">(Front)</span>
                  </div>
                </div>
                <div className="w-full">
                  <div
                    htmlFor="bodyPositionImageBack"
                    className="w-full h-full text-[10px] text-[#8c8c8c] p-2 text-center cursor-pointer"
                    onClick={() => handlePositionClick("back")}
                  >
                    <img src={`/model/${getImagePrefix()}modelb.png`} alt="Back" className="block h-[50px] m-auto" />
                    <span className="block">(Back)</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-full text-center">
                <label className="flex items-center">
                  <input
                    className="hidden"
                    type="radio"
                    name="size"
                    value="Small"
                    checked={formData.size === "Small"}
                    onChange={handleChange}
                  />
                  <span
                    onClick={() => handleSpanClick("size", "Small")}
                    className={`w-full border border-solid border-[#e8e6e6] py-2 text-[14px] rounded-tl-md rounded-bl-md cursor-pointer ${
                      formData.size === "Small" ? "bg-[#ff4901] text-white" : "text-[#8c8c8c] hover:bg-gray-200"
                    }`}
                  >
                    Small
                    <span className="block text-[10px] mt-[-5px]">(6 in)</span>
                  </span>
                </label>
              </div>
              <div className="w-full text-center">
                <label className="flex items-center">
                  <input
                    className="hidden"
                    type="radio"
                    name="size"
                    value="Medium"
                    checked={formData.size === "Medium"}
                    onChange={handleChange}
                  />
                  <span
                    onClick={() => handleSpanClick("size", "Medium")}
                    className={`w-full border border-solid border-[#e8e6e6] py-2 text-[14px] cursor-pointer ${
                      formData.size === "Medium" ? "bg-[#ff4901] text-white" : "text-[#8c8c8c] hover:bg-gray-200"
                    }`}
                  >
                    Medium
                    <span className="block text-[10px] mt-[-5px]">(6-8 in)</span>
                  </span>
                </label>
              </div>
              <div className="w-full text-center">
                <label className="flex items-center">
                  <input
                    className="hidden"
                    type="radio"
                    name="size"
                    value="Large"
                    checked={formData.size === "Large"}
                    onChange={handleChange}
                  />
                  <span
                    onClick={() => handleSpanClick("size", "Large")}
                    className={`w-full border border-solid border-[#e8e6e6] py-2 text-[14px] rounded-tr-md rounded-br-md cursor-pointer ${
                      formData.size === "Large" ? "bg-[#ff4901] text-white" : "text-[#8c8c8c] hover:bg-gray-200"
                    }`}
                  >
                    Large
                    <span className="block text-[10px] mt-[-5px]">(8 in)</span>
                  </span>
                </label>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-full text-center">
                <label className="flex items-center">
                  <input
                    className="hidden"
                    type="radio"
                    name="color"
                    value="Black/White"
                    checked={formData.color === "Black/White"}
                    onChange={handleChange}
                  />
                  <span
                    onClick={() => handleSpanClick("color", "Black/White")}
                    className={`w-full border border-solid border-[#e8e6e6] py-2 text-[14px] rounded-tl-md rounded-bl-md cursor-pointer ${
                      formData.color === "Black/White" ? "bg-[#ff4901] text-white" : "text-[#8c8c8c] hover:bg-gray-200"
                    }`}
                  >
                    Black/White
                  </span>
                </label>
              </div>
              <div className="w-full text-center">
                <label className="flex items-center">
                  <input
                    className="hidden"
                    type="radio"
                    name="color"
                    value="Color"
                    checked={formData.color === "Color"}
                    onChange={handleChange}
                  />
                  <span
                    onClick={() => handleSpanClick("color", "Color")}
                    className={`w-full border border-solid border-[#e8e6e6] py-2 text-[14px] rounded-tr-md rounded-br-md cursor-pointer ${
                      formData.color === "Color" ? "bg-[#ff4901] text-white" : "text-[#8c8c8c] hover:bg-gray-200"
                    }`}
                  >
                    Color
                  </span>
                </label>
              </div>
            </div>
            <div>
              <div className="relative mb-[-10px] px-3 z-10">
                <label className="px-2 bg-white text-[11px] text-[#8c8c8c]">Describe your tattoo*</label>
              </div>
              <div>
                <textarea
                  name="tattooDescription"
                  value={formData.tattooDescription}
                  onChange={handleChange}
                  className="w-full p-2 border border-solid border-[#e8e6e6] rounded text-black text-sm"
                  rows="3"
                  required
                />
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-[90px] text-left">
                <label className="px-2 bg-white text-[11px] text-[#8c8c8c]">Upload Image</label>
              </div>
              <div>
                <input
                  type="file"
                  name="tattooImage"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="w-full text-[12px] text-[#8c8c8c]"
                />
                <span className="text-sm text-gray-500 hidden">
                  {formData.tattooImage ? formData.tattooImage.name : "No file chosen"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}