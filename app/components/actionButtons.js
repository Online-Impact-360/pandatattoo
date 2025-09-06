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
          className="text-3xl bg-[#FF4901] hover:bg-[#ff6701] text-[#FFFFFF] px-10 py-5 rounded-md uppercase font-bold border-none"
        >
          Book · Now
        </button>
        <button
          onClick={handleCall}
          className="text-3xl bg-transparent hover:bg-[#FF4901] text-[#FF4901] hover:text-[#FFFFFF] px-10 py-5 rounded-md uppercase font-bold border-2 border-[#FF4901]"
        >
          Call · Now
        </button>
      </div>
    );
  }

  if (variant === "home") {
    return (
      <div className="flex flex-col space-y-4 justify-center items-center bg-black/50 backdrop-blur-sm px-6 py-6 rounded-xl shadow-2xl">
        <button
          onClick={() => openPopup()}
          className="px-8 py-3 bg-[#FF4901] hover:bg-[#ff6701] text-white rounded-md font-bold uppercase text-lg border-none transition-colors shadow-lg"
        >
          Book Now
        </button>
        <button
          onClick={handleCall}
          className="px-8 py-3 bg-white text-[#FF4901] hover:bg-[#FF4901] hover:text-white rounded-md font-bold uppercase text-lg border-2 border-[#FF4901] transition-colors shadow"
        >
          Call Now
        </button>
      </div>
    );
  }

  // Default variant
  return (
    <div className="flex flex-col space-y-3">
      <button
        onClick={() => openPopup()}
        className="px-6 py-3 bg-[#FF4901] hover:bg-[#ff6701] text-white rounded-md font-bold uppercase"
      >
        Book Now
      </button>
      <button
        onClick={handleCall}
        className="px-6 py-3 bg-transparent hover:bg-[#FF4901] text-[#FF4901] hover:text-white rounded-md font-bold uppercase border-2 border-[#FF4901]"
      >
        Call Now
      </button>
    </div>
  );
}
