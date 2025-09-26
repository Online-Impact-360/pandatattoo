"use client";
import { usePopup } from "@/context/popupContext";

export default function ActionButtons({ variant = "footer" }) {
  const { openPopup } = usePopup();

  const handleCall = () => {
    const phoneNumber = process.env.BUSINESS_PHONE_NUMBER || '+17867894567';
    window.location.href = `tel:${phoneNumber}`;
  };

  if (variant === "footer") {
    return (
      <div
        className="w-full md:w-1/3 flex justify-center flex-col items-center space-y-4"
        style={{
          backgroundImage: `
            radial-gradient(circle, white 10px, transparent 11px),
            radial-gradient(circle, white 10px, transparent 11px),
            radial-gradient(circle, white 10px, transparent 11px),
            radial-gradient(circle, white 10px, transparent 11px)
          `,
          backgroundSize: "10px 10px",
          backgroundPosition: "top left, top right, bottom left, bottom right",
          backgroundRepeat: "no-repeat",
        }}
      >
        <button
          onClick={() => openPopup()}
          className="luxury-button text-3xl text-white px-10 py-5 rounded-lg font-semibold transition-all duration-300 ease-in-out tracking-wide"
        >
          Book · Now
        </button>
        <button
          onClick={handleCall}
          className="luxury-button-outline text-3xl text-[#c7a03c] hover:text-white px-10 py-5 rounded-lg font-semibold transition-all duration-300 ease-in-out tracking-wide"
        >
          Call · Now
        </button>
      </div>
    );
  }

  if (variant === "home") {
    return (
      <div className="">
        <button
          onClick={() => openPopup()}
          className="luxury-button px-8 p-5 text-white rounded-lg font-semibold uppercase text-base transition-all duration-300 ease-in-out tracking-wide"
        >
          Book Now
        </button>
      </div>
    );
  }

  // Default variant
  return (
    <div className="flex flex-col space-y-3">
      <button
        onClick={() => openPopup()}
        className="luxury-button text-3xl text-white px-10 py-5 rounded-lg font-semibold transition-all duration-300 ease-in-out tracking-wide"
      >
        Book Now
      </button>
      <button
        onClick={handleCall}
        className="luxury-button-outline text-3xl text-[#c7a03c] hover:text-white px-10 py-5 rounded-lg font-semibold transition-all duration-300 ease-in-out tracking-wide"
      >
        Call Now
      </button>
    </div>
  );
}
