"use client";
import { useEffect, useState } from "react";
import Step0 from "../components/popup-form/step0";
import Step1 from "../components/popup-form/step1";
import Step2 from "../components/popup-form/step2";
import Step3 from "../components/popup-form/step3";

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    instagram: "",
    age: "",
    gender: "",
    bodyPosition: "",
    bodyPositionImage: "",
    size: "",
    color: "",
    tattooDescription: "",
    tattooImage: null,
    location: "",
    schedule: [],
    artist: null,
    isImageView: false,
    selectedPosition: "front",
    selectedTattooStyles: [],
    somethingDifferent: false,
    desiredTiming: "",
  });
  const [isArtistPopupOpen, setIsArtistPopupOpen] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [bodyPositionValue, setBodyPositionValue] = useState("");
  const [artists, setArtists] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Normalize URLs to ensure absolute URLs
  const normalizeImageUrl = (url) => {
    if (!url) return "/default-artist.jpg";
    return url.startsWith("//") ? `https:${url}` : url;
  };

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const res = await fetch("/api/contentful?content_type=artists");
        if (!res.ok) throw new Error("Failed to fetch artists");
        const data = await res.json();
        const formattedArtists = data.items.map((item, index) => ({
          id: item.sys.id || index + 1,
          name: item.fields.artistName,
          slug: item.fields.artistName.toLowerCase().replace(/\s+/g, "-"),
          image: item.fields.artistPhoto?.fields?.file?.url
            ? `https:${item.fields.artistPhoto.fields.file.url}`
            : "/default-artist.jpg",
        }));
        setArtists(formattedArtists);
      } catch (error) {
        setArtists([]);
      }
    };

    fetchArtists();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleTogglePosition = () => {
    setFormData((prev) => ({
      ...prev,
      selectedPosition: prev.selectedPosition === "front" ? "back" : "front",
    }));
    setBodyPositionValue("");
  };

  const handleReturnToForm = () => {
    setFormData((prev) => ({ ...prev, isImageView: false }));
  };

  const handleDateSelect = (date) => {
    setFormData((prev) => ({
      ...prev,
      schedule: prev.schedule.some((d) => d.toDateString() === date.toDateString())
        ? prev.schedule.filter((d) => d.toDateString() !== date.toDateString())
        : [...prev.schedule, date],
    }));
  };

  const handleArtistSelect = (artist) => {
    const normalizedArtist = {
      ...artist,
      image: normalizeImageUrl(artist.image),
    };
    setSelectedArtist(normalizedArtist);
    setFormData({ ...formData, artist: normalizedArtist });
    setIsArtistPopupOpen(false);
  };

  const handleArtistInputChange = (e) => {
    const artistName = e.target.value;
    const matchedArtist = artists.find((a) => a.name.toLowerCase() === artistName.toLowerCase());
    const normalizedArtist = matchedArtist
      ? { ...matchedArtist, image: normalizeImageUrl(matchedArtist.image) }
      : { name: artistName, image: "/default-artist.jpg", slug: artistName.toLowerCase().replace(/\s+/g, "-") };
    setFormData({ ...formData, artist: normalizedArtist });
    setSelectedArtist(normalizedArtist);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "schedule") {
        formDataToSend.append(key, value.map((date) => date.toLocaleDateString()).join(", "));
      } else if (key === "selectedTattooStyles") {
        formDataToSend.append(key, Array.isArray(value) ? value.join(", ") : value);
      } else if (key === "artist" && value) {
        formDataToSend.append("artistName", value.name);
        formDataToSend.append("artistId", value.id)
        if (value.image && !value.image.startsWith("/")) {
          formDataToSend.append("artistImage", value.image);
        }
      } else if (value) {
        formDataToSend.append(key, value);
      }
    });

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        body: formDataToSend,
      });
      const result = await res.json();
      if (res.ok) {
        setSubmissionStatus("success");
        setTimeout(() => {
          setCurrentStep(0);
          setFormData({
            fullName: "",
            phoneNumber: "",
            email: "",
            instagram: "",
            age: "",
            gender: "",
            bodyPosition: "",
            bodyPositionImage: "",
            size: "",
            color: "",
            tattooDescription: "",
            tattooImage: null,
            location: "",
            schedule: [],
            artist: null,
            isImageView: false,
            selectedPosition: "front",
            selectedTattooStyles: [],
            somethingDifferent: false,
            desiredTiming: "",
          });
          setSelectedArtist(null);
          setBodyPositionValue("");
          setSubmissionStatus(null);
        }, 5000);
      } else {
        setSubmissionStatus("error");
      }
    } catch (error) {
      setSubmissionStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStep2ImageViewChange = (isImageView) => {
    setFormData((prev) => ({ ...prev, isImageView }));
  };

  const handleBodyPositionUpdate = (className, isRemoval) => {
    setBodyPositionValue((prev) => {
      const selections = prev ? prev.split(",").map((item) => item.trim()) : [];
      const newSelections = isRemoval
        ? selections.filter((item) => item !== className)
        : selections.includes(className) ? selections : [...selections, className];
      return newSelections.length > 0 ? newSelections.join(", ") : "";
    });
    setFormData((prev) => ({ ...prev, bodyPosition: bodyPositionValue }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-4xl mx-auto p-4">
        {submissionStatus === "success" && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            <h2 className="text-xl font-bold">Request Sent!</h2>
            <p>Your email has been sent successfully.</p>
          </div>
        )}
        {submissionStatus === "error" && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <h2 className="text-xl font-bold">Error!</h2>
            <p>Failed to send your request. Please try again.</p>
          </div>
        )}
        {!submissionStatus && (
          <div className="flex flex-col md:flex-row h-full max-h-[700px] md:items-stretch bg-white rounded-[20px] shadow-2xl">
            <div
              className={`flex flex-col w-full h-2/5 bg-white md:h-auto md:w-1/2 border-r border-[#E9E9E9] md:p-0 ${
                currentStep === 0 ? "hidden" : currentStep > 1 ? "hidden md:block" : "block"
              }`}
            >
              {selectedArtist ? (
                <div className="relative w-full h-full flex flex-col">
                  <button
                    onClick={() => setIsArtistPopupOpen(true)}
                    className="absolute top-4 left-4 flex items-center text-black text-xs"
                  >
                    <span className="gb_change-icon mr-2">
                      <svg
                        id="Layer_1"
                        data-name="Layer 1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 300.347 383.201"
                        className="h-[20px]"
                      >
                        <path d="M126.969,0c4.449,2.234,5.747,5.917,5.662,10.741-.212,12.094-.07,24.194-.069,36.292,0,1.353,0,2.706,0,4.589,1.751,0,3.186,0,4.621,0,40.409,0,80.817-.055,121.226.024,20.622.04,37.282,13.831,41.081,33.908.621,3.281.713,6.699.719,10.054.053,28.934.035,57.869.027,86.804-.002,7.556-1.679,9.212-9.246,9.213-13.47.002-26.939.01-40.409-.004-6.155-.006-8.238-2.115-8.243-8.378-.014-20.828.004-41.656-.011-62.484-.006-7.991-3.373-11.369-11.369-11.373-31.554-.015-63.107-.008-94.661,0-1.093,0-2.186.104-3.736.182,0,1.519,0,2.859,0,4.198,0,12.472-.032,24.944.017,37.415.015,3.706-.681,6.989-4.277,8.873-3.416,1.789-6.414.658-9.455-1.238-37.75-23.534-75.533-47.014-113.302-70.516-7.333-4.563-7.395-10.983-.171-15.478C42.613,49.653,79.854,26.482,117.095,3.313c1.789-1.113,3.588-2.209,5.383-3.313h4.491Z" />
                        <path d="M167.598,273.871c.07-1.609.179-2.948.18-4.287.013-12.347.047-24.694-.014-37.041-.019-3.798.447-7.284,4.182-9.309,3.558-1.929,6.662-.626,9.788,1.322,37.857,23.595,75.748,47.135,113.608,70.725,6.661,4.151,6.677,10.719.022,14.866-38.07,23.726-76.172,47.398-114.242,71.124-2.951,1.839-5.896,2.736-9.135.986-3.39-1.832-4.233-4.932-4.219-8.537.049-12.472.017-24.943.016-37.415,0-1.464,0-2.928,0-4.678-1.951,0-3.429,0-4.907,0-40.284,0-80.567.053-120.851-.023-20.633-.039-37.317-13.789-41.166-33.828-.607-3.158-.717-6.449-.723-9.679-.053-29.184-.037-58.368-.027-87.551.003-7.114,1.795-8.918,8.773-8.92,13.719-.005,27.438-.015,41.157.005,5.744.008,7.953,2.173,7.961,7.901.027,20.828.006,41.656.014,62.483.003,8.552,3.23,11.848,11.645,11.851,31.304.011,62.608.004,93.912.004,1.229,0,2.459,0,4.024,0Z" />
                      </svg>
                    </span>
                    <span className="font-bold">CHANGE</span>
                  </button>
                  <div className="w-full h-full flex flex-col justify-center items-center">
                    <div className="w-full h-full relative">
                      <img
                        src={normalizeImageUrl(selectedArtist.image)}
                        alt={selectedArtist.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-70 py-2 text-center">
                        <span className="text-[12px] text-white uppercase">Artist</span>
                        <p className="text-white text-xl font-bold">{selectedArtist.name.toUpperCase()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex flex-col justify-center items-center">
                  <div className="artist_icon mb-5 block">
                    <svg
                      className="h-[120px] m-auto"
                      id="Layer_1"
                      data-name="Layer 1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 26.947 26.947"
                    >
                      <path d="M13.476,0c7.432.002,13.48,6.056,13.471,13.483-.01,7.433-6.07,13.479-13.494,13.464C6.035,26.931.005,20.894,0,13.477-.005,6.05,6.047-.002,13.476,0ZM10.784,15.721c-3.017.026-5.661,2.088-6.448,5.005-.074.275-.023.455.162.656,2.983,3.24,6.658,4.558,11.003,3.88,2.805-.438,5.134-1.801,6.993-3.948.097-.112.168-.321.137-.459-.584-2.622-2.978-4.807-5.642-5.053M17.964,9.725c0-.269.003-.538,0-.807-.028-2.012-1.427-3.795-3.363-4.288-1.971-.501-3.987.37-4.986,2.164-.829,1.489-.788,3.09-.467,4.675.377,1.86,2.103,3.348,3.859,3.477,2.097.153,3.914-.96,4.652-2.841.302-.77.334-1.57.305-2.381Z" />
                    </svg>
                  </div>
                  <button
                    onClick={() => setIsArtistPopupOpen(true)}
                    className="flex items-center justify-center text-black text-xs"
                  >
                    <div className="selectartist_title_icon mr-2">
                      <svg
                        className="h-[20px]"
                        id="Layer_1"
                        data-name="Layer 1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 339.631 352.916"
                      >
                        <path d="M103.086,184.101c-51.778-37.124-55.862-108.854-15.287-151.87,38.495-40.812,102.234-43.244,142.596-5.132,22.867,21.592,33.971,48.285,32.314,79.79-1.659,31.528-16.178,56.462-40.716,75.872,6.991,3.207,13.801,6.253,20.535,9.458,2.693,1.282,5.278,2.82,7.808,4.406,8.26,5.178,10.46,13.876,5.632,21.946-4.797,8.018-13.685,10.383-21.964,5.437-13.492-8.061-27.791-13.882-43.202-17.122-70.201-14.759-140.462,30.631-155.56,100.925-2.027,9.435-2.541,19.248-3.145,28.923-.711,11.396-9.371,18.275-20.454,15.608C4.26,350.566-.078,344.659.001,336.168c.3-32.09,8.897-61.762,26.447-88.673,18.421-28.247,43.225-48.997,74.273-62.237.676-.288,1.323-.645,2.364-1.158ZM161.881,170.642c38.635-.119,69.394-31.017,69.231-69.543-.163-38.482-31.182-69.215-69.751-69.106-38.24.107-69.023,31.07-69.035,69.441-.012,38.483,30.986,69.327,69.555,69.208Z" />
                        <path d="M291.868,271.668c10.769,0,21.111-.148,31.448.039,11.621.211,18.568,9.514,15.65,20.612-1.829,6.954-7.502,11.285-15.263,11.358-10.464.098-20.929.024-31.994.024,0,1.49,0,2.794,0,4.098-.002,9.104.131,18.21-.041,27.311-.204,10.836-8.275,17.472-18.949,15.836-7.711-1.182-12.875-7.151-13.001-15.415-.139-9.102-.038-18.207-.041-27.311,0-1.35,0-2.699,0-4.51-2.09,0-3.915,0-5.739,0-9.104,0-18.209.075-27.311-.024-8.652-.094-14.772-5.939-15.512-14.587-.714-8.339,4.669-15.575,13.041-16.885,4.029-.63,8.192-.494,12.296-.534,7.584-.073,15.169-.021,23.226-.021,0-5.48,0-10.673,0-15.867,0-5.238-.055-10.476.015-15.713.125-9.361,6.93-16.376,15.855-16.434,8.925-.058,15.945,6.84,16.113,16.191.173,9.6.041,19.205.054,28.808.001.849.083,1.698.153,3.024Z" />
                      </svg>
                    </div>
                    <span className="text-xs font-bold">SELECT ARTIST</span>
                  </button>
                </div>
              )}
              {isArtistPopupOpen && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000]">
                  <div className="relative bg-white w-[300px] rounded shadow-lg">
                    <div className="p-4 h-[400px] overflow-y-auto">
                      <h3 className="text-lg text-black font-bold mb-4 text-center">Select an Artist</h3>
                      <ul className="space-y-2">
                        {artists.map((artist) => (
                          <li
                            key={artist.id}
                            onClick={() => handleArtistSelect(artist)}
                            className="flex items-center p-2 cursor-pointer hover:bg-gray-200 rounded"
                          >
                            <img
                              src={normalizeImageUrl(artist.image)}
                              alt={artist.name}
                              className="w-10 h-10 rounded-full mr-2 object-cover"
                            />
                            <span className="text-sm text-black font-bold">{artist.name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button
                      onClick={() => setIsArtistPopupOpen(false)}
                      className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className={`w-full h-full ${currentStep === 0 ? 'md:w-full' : 'md:h-auto md:w-1/2'} p-6 bg-white`}>
              <form onSubmit={handleSubmit} className="flex flex-col min-h-full overflow-y-auto">
                {currentStep === 0 && (
                  <Step0 
                    formData={formData} 
                    handleChange={handleChange} 
                    disabled={isSubmitting}
                  />
                )}
                {currentStep === 1 && (
                  <Step1 
                    formData={formData} 
                    handleChange={handleChange} 
                    disabled={isSubmitting}
                    artists={artists}
                    selectedArtist={selectedArtist}
                    setIsArtistPopupOpen={setIsArtistPopupOpen}
                    handleArtistSelect={handleArtistSelect}
                  />
                )}
                {currentStep === 2 && (
                  <Step2
                    formData={formData}
                    handleChange={handleChange}
                    handleFileChange={handleFileChange}
                    onImageViewChange={handleStep2ImageViewChange}
                    onBodyPositionUpdate={handleBodyPositionUpdate}
                    disabled={isSubmitting}
                  />
                )}
                {currentStep === 3 && (
                  <Step3
                    formData={formData}
                    handleChange={handleChange}
                    handleDateSelect={handleDateSelect}
                    setFormData={setFormData}
                    disabled={isSubmitting}
                  />
                )}
                <div className="mt-4 hidden">
                  <div className="relative mb-[-10px] px-3 z-10">
                    <span className="px-2 bg-white text-[11px] text-[#8c8c8c]">Selected Artist</span>
                  </div>
                  <div className="relative z-0">
                    <input
                      type="text"
                      name="artist"
                      value={formData.artist ? formData.artist.name : ""}
                      onChange={handleArtistInputChange}
                      placeholder="Select or enter artist name"
                      className="w-full p-2 px-4 border border-solid border-[#e8e6e6] rounded-md text-black text-sm"
                    />
                  </div>
                </div>
                <input
                  type="text"
                  name="bodyPositionImage"
                  value={bodyPositionValue}
                  onChange={(e) => setBodyPositionValue(e.target.value)}
                  className="hidden"
                  id="tattoo_final"
                />
                <div className="md:mt-auto">
                  {currentStep === 0 && (
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      disabled={isSubmitting}
                      className={`w-auto px-8 mx-auto block text-xs font-bold bg-[#ff4901] text-white py-3 rounded mt-4 ${
                        isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#f46932]'
                      }`}
                    >
                      NEXT
                    </button>
                  )}
                  {currentStep === 1 && (
                    <div className="flex space-x-2 mt-6">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(0)}
                        disabled={isSubmitting}
                        className={`w-1/2 bg-gray-300 text-black text-xs font-bold py-3 rounded ${
                          isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-400'
                        }`}
                      >
                        BACK
                      </button>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        disabled={isSubmitting}
                        className={`w-1/2 bg-[#ff4901] text-white text-xs font-bold py-3 rounded ${
                          isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#f46932]'
                        }`}
                      >
                        NEXT
                      </button>
                    </div>
                  )}
                  {currentStep === 2 && (
                    <div className="flex justify-between mt-6">
                      {!formData.isImageView ? (
                        <div className="flex space-x-2 w-full">
                          <button
                            type="button"
                            onClick={() => setCurrentStep(1)}
                            disabled={isSubmitting}
                            className={`w-1/2 bg-gray-300 text-black text-xs font-bold py-3 rounded ${
                              isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-400'
                            }`}
                          >
                            BACK
                          </button>
                          <button
                            type="button"
                            onClick={() => setCurrentStep(3)}
                            disabled={isSubmitting}
                            className={`w-1/2 bg-[#ff4901] text-white text-xs font-bold py-3 rounded ${
                              isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#f46932]'
                            }`}
                          >
                            NEXT
                          </button>
                        </div>
                      ) : (
                        <div className="flex space-x-2 w-full">
                          <button
                            type="button"
                            onClick={handleReturnToForm}
                            disabled={isSubmitting}
                            className={`w-1/2 bg-gray-300 text-black text-xs font-bold py-3 px-4 rounded ${
                              isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-400'
                            }`}
                          >
                            RETURN TO FORM
                          </button>
                          <button
                            type="button"
                            onClick={handleTogglePosition}
                            disabled={isSubmitting}
                            className={`w-1/2 bg-[#ff4901] text-white text-xs font-bold py-3 px-4 rounded uppercase ${
                              isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#f46932]'
                            }`}
                          >
                            {formData.selectedPosition + " SIDE"}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                  {currentStep === 3 && (
                    <div className="flex space-x-2 mt-6">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        disabled={isSubmitting}
                        className={`w-1/2 bg-gray-300 text-black text-xs font-bold py-3 rounded ${
                          isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-400'
                        }`}
                      >
                        BACK
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-1/2 bg-black text-white text-xs font-bold py-3 rounded ${
                          isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'
                        }`}
                      >
                        {isSubmitting ? 'SENDING...' : 'SEND REQUEST'}
                      </button>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}