"use client";
import DatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

export default function Step3({ formData, handleChange, handleDateSelect, setFormData }) {
  const [selectedLocation, setSelectedLocation] = useState(formData.location || "");
  const [selectedScheduleType, setSelectedScheduleType] = useState(formData.scheduleType || "");

  // Handle click on the span to trigger radio button selection
  const handleSpanClick = (name, value) => {
    switch (name) {
      case "location":
        setSelectedLocation(value);
        break;
      case "scheduleType":
        setSelectedScheduleType(value);
        break;
    }
    handleChange({ target: { name, value } });
  };

  return (
    <div className="flex flex-col justify-between md:h-full">
      <div>
        <h2 className="text-black text-lg font-bold mb-0 text-center">STEP 3/3</h2>
        <h3 className="text-sm text-gray-500 mb-2 text-center">Scheduling</h3>
        <div className="space-y-4">
          <div>
            <div className="relative mb-[-10px] px-3 z-10">
              <label className="px-2 bg-white text-[11px] text-[#8c8c8c]">Select Available Dates*</label>
            </div>
            <div>
              <input
                type="text"
                value={formData.schedule.map((date) => date.toLocaleDateString()).join(", ")}
                readOnly
                placeholder="Selected dates will appear here"
                className="hidden w-full p-2 border border-solid border-[#e8e6e6] rounded mt-2"
                required={formData.schedule.length === 0}
              />
              <div className="w-full">
                <div className="calendar-container">
                  <div className="calendar-wrapper">
                    <DatePicker
                      selected={null}
                      onChange={handleDateSelect}
                      inline
                      highlightDates={formData.schedule}
                      minDate={new Date()}
                      className="w-full"
                      dayClassName={(date) =>
                        formData.schedule.some((selectedDate) => selectedDate.toDateString() === date.toDateString())
                          ? "bg-[#ff4901] text-white"
                          : undefined
                      }
                    />
                  </div>
                </div>
              </div>
              {formData.schedule.length > 0 && (
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, schedule: [] })}
                  className="mt-2 text-sm text-[#ff4901] hover:text-[#f46932]"
                >
                  Clear Dates
                </button>
              )}
            </div>
          </div>
          <div className="flex">
            <div className="w-full text-center">
              <label className="flex items-center">
                <input
                  className="hidden"
                  type="radio"
                  name="location"
                  value="Live Miami"
                  checked={formData.location === "Live Miami"}
                  onChange={handleChange}
                  required
                />
                <span
                  onClick={() => handleSpanClick("location", "Live Miami")}
                  className={`w-full border border-solid border-[#e8e6e6] py-2 text-[14px] rounded-tl-md rounded-bl-md cursor-pointer ${
                    formData.location === "Live Miami" ? "bg-[#ff4901] text-white" : "text-[#8c8c8c] hover:bg-gray-200"
                  }`}
                >
                  Live in Miami
                </span>
              </label>
            </div>
            <div className="w-full text-center">
              <label className="flex items-center">
                <input
                  className="hidden"
                  type="radio"
                  name="location"
                  value="Visiting Miami"
                  checked={formData.location === "Visiting Miami"}
                  onChange={handleChange}
                />
                <span
                  onClick={() => handleSpanClick("location", "Visiting Miami")}
                  className={`w-full border border-solid border-[#e8e6e6] py-2 text-[14px] rounded-tr-md rounded-br-md cursor-pointer ${
                    formData.location === "Visiting Miami" ? "bg-[#ff4901] text-white" : "text-[#8c8c8c] hover:bg-gray-200"
                  }`}
                >
                  Visiting Miami
                </span>
              </label>
            </div>
          </div>
          <div className="flex">
            <div className="w-full text-center">
              <label className="flex items-center">
                <input
                  className="hidden"
                  type="radio"
                  name="scheduleType"
                  value="flexible"
                  checked={formData.scheduleType === "flexible"}
                  onChange={handleChange}
                  required
                />
                <span
                  onClick={() => handleSpanClick("scheduleType", "flexible")}
                  className={`w-full border border-solid border-[#e8e6e6] py-2 text-[14px] rounded-tl-md rounded-bl-md cursor-pointer ${
                    formData.scheduleType === "flexible" ? "bg-[#ff4901] text-white" : "text-[#8c8c8c] hover:bg-gray-200"
                  }`}
                >
                  Flexible Schedule
                </span>
              </label>
            </div>
            <div className="w-full text-center">
              <label className="flex items-center">
                <input
                  className="hidden"
                  type="radio"
                  name="scheduleType"
                  value="strict"
                  checked={formData.scheduleType === "strict"}
                  onChange={handleChange}
                />
                <span
                  onClick={() => handleSpanClick("scheduleType", "strict")}
                  className={`w-full border border-solid border-[#e8e6e6] py-2 text-[14px] rounded-tr-md rounded-br-md cursor-pointer ${
                    formData.scheduleType === "strict" ? "bg-[#ff4901] text-white" : "text-[#8c8c8c] hover:bg-gray-200"
                  }`}
                >
                  Strict Schedule
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}