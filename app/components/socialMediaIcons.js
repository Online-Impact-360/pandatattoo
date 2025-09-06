"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function SocialMediaIcons({ variant }) {
  const [socialMediaLinks, setSocialMediaLinks] = useState({
    instagram: "",
    facebook: "",
    youtube: "",
    tiktok: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSocialMediaLinks = async () => {
      try {
        const res = await fetch("/api/contentful?content_type=socialMedia");
        const data = await res.json();
        const fields = data.items[0]?.fields || {};
        setSocialMediaLinks({
          instagram: fields.instagram || "",
          facebook: fields.facebook || "",
          youtube: fields.youtube || "",
          tiktok: fields.tiktok || "",
        });
      } catch (error) {
        console.error("Error fetching social media links:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSocialMediaLinks();
  }, []);

  const holderClasses = "w-full lg:w-3/4";
  const baseClasses = "rounded-md hover:text-[#ff4901] transition-colors duration-200 ease-out";
  const headerClasses = "p-4 bg-black text-white my-2 lg:mx-2 hidden lg:block";
  const footerClasses = "block bg-gray-700 text-gray-200 w-full p-4 md:p-8 my-2 md:my-5 mx-auto transform-gpu";
  const footerSVG = "w-6 h-6 md:w-10 md:h-10 m-auto";
  const headerFooterSVG = "w-6 h-6 m-auto";

  if (isLoading) return <div>Loading social media links...</div>;

  return (
    <div
      className={`${
        variant === "footer" ? `${holderClasses} flex flex-row md:grid md:grid-cols-2 gap-1 md:gap-4 justify-center will-change-scroll` : "flex lg:flex-row flex-col z-50"
      }`}
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      <div className={`${variant === "header" ? "" : "px-1 md:px-4"}`}>
        <Link
          href={socialMediaLinks.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className={`${baseClasses} ${variant === "header" ? headerClasses : footerClasses}`}
        >
          <svg
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 328.566 328.601"
            fill="currentColor"
            className={variant === "footer" ? footerSVG : headerFooterSVG}
          >
            <path d="M252.852,328.601H75.762c-6.148-1.299-12.472-2.056-18.414-3.988C22.811,313.386.189,282.355.089,245.914-.061,191.482.011,137.048.073,82.616c.02-17.603,4.934-33.798,15.396-48.013C32.492,11.474,55.587.059,84.259.033c52.925-.048,105.85-.049,158.775.039,5.536.009,11.161.252,16.59,1.24,30.357,5.523,51.531,22.775,63.111,51.271,2.968,7.305,3.941,15.42,5.831,23.163v177.126c-.407,2.294-.792,4.592-1.223,6.882-5.68,30.165-22.769,51.276-51.033,62.91-7.383,3.039-15.615,4.013-23.456,5.936h-.002ZM164.337,27.593v-.144c-26.731,0-53.464-.183-80.191.131-6.528.077-13.351.85-19.499,2.911-23.056,7.73-37.094,28.01-37.128,52.861-.074,54.007-.05,108.014.031,162.022.006,4.244.308,8.594,1.26,12.713,6.042,26.117,27.35,43.003,54.48,43.053,53.996.101,107.993.126,161.989-.099,6.304-.026,12.902-.941,18.846-2.965,22.962-7.82,36.924-27.929,36.965-52.649.089-54.114.041-108.228-.005-162.342-.003-3.299-.31-6.618-.746-9.891-3.226-24.184-25.997-45.148-50.36-45.503-28.542-.416-57.094-.097-85.642-.097h0Z" />
            <path d="M164.287,246.445c-45.266-.023-82.288-37.143-82.098-82.317.19-45.262,36.978-81.969,82.134-81.953,45.275.017,82.293,37.127,82.104,82.308-.189,45.241-37.012,81.984-82.139,81.962h0ZM164.383,219.001c30.264-.069,54.598-24.441,54.603-54.686.005-30.241-24.326-54.617-54.594-54.695-30.316-.078-54.917,24.559-54.764,54.846.153,30.307,24.548,54.604,54.754,54.535h0Z" />
            <path d="M253.292,95.748c-11.296,0-20.351-8.983-20.435-20.273-.084-11.355,9.133-20.682,20.435-20.68,11.244.002,20.729,9.556,20.532,20.68-.2,11.288-9.299,20.273-20.532,20.272h0Z" />
          </svg>
        </Link>
      </div>
      <div className={`${variant === "header" ? "" : "px-1 md:px-4"}`}>
        <Link
          href={socialMediaLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className={`${baseClasses} ${variant === "header" ? headerClasses : footerClasses}`}
        >
          <svg
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 274.22 512"
            fill="currentColor"
            className={variant === "footer" ? footerSVG : headerFooterSVG}
          >
            <path d="M256.25,288l14.22-92.66h-88.91v-60.13c0-25.35,12.42-50.06,52.24-50.06h40.42V6.26S237.54,0,202.47,0c-73.22,0-121.08,44.38-121.08,124.72v70.62H0v92.66h81.39v224h100.17v-224h74.69Z" />
          </svg>
        </Link>
      </div>
      <div className={`${variant === "header" ? "" : "px-1 md:px-4"}`}>
        <Link
          href={socialMediaLinks.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className={`${baseClasses} ${variant === "header" ? headerClasses : footerClasses}`}
        >
          <svg
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 369.199"
            fill="currentColor"
            className={variant === "footer" ? footerSVG : headerFooterSVG}
          >
            <path d="M.001,220.994v-71.008c.301-3.113.597-6.227.903-9.339,2.052-20.868,3.166-41.882,6.364-62.573C13.057,40.625,39.984,13.961,76.371,9.235c21.777-2.828,43.714-4.851,65.644-5.986C198.768.31,255.569-1.071,312.401.969c40.285,1.446,80.606,2.344,120.606,8.044,38.085,5.427,63.191,28.148,71.006,65.656,3.079,14.779,4.287,29.967,5.963,45.012,1.046,9.394,1.374,18.867,2.024,28.305v72.008c-.266,1.787-.638,3.566-.781,5.363-1.421,17.918-2.407,35.882-4.313,53.748-1.809,16.96-5.454,33.495-15.543,47.901-15.557,22.214-37.545,33-63.892,34.919-38.344,2.793-76.723,6.003-115.133,6.773-47.925.96-95.924.5-143.838-1.033-31.718-1.015-63.467-3.985-94.972-7.92-32.206-4.022-57.709-28.303-64.487-60.096-3.525-16.537-5.002-33.53-6.998-50.365-1.112-9.379-1.39-18.857-2.043-28.29h.001ZM268.305,39.261c-44.272,1.227-75.111,1.608-105.898,3.081-25.441,1.217-50.867,3.252-76.212,5.802-23.034,2.317-34.974,13.495-39.477,36.33-2.313,11.729-3.693,23.707-4.577,35.64-2.823,38.107-3.238,76.296-.883,114.418,1.177,19.059,3.535,38.149,6.969,56.93,2.741,14.996,13.377,24.148,28.014,28.23,4.149,1.157,8.471,2.013,12.76,2.292,37.229,2.421,74.444,5.957,111.71,6.669,48.623.929,97.304.167,145.933-1.018,26.272-.64,52.537-3.164,78.712-5.78,24.573-2.456,36.803-14.313,40.438-38.728,2.425-16.285,4.534-32.75,4.915-49.178.765-32.972,1.028-65.999-.038-98.954-.605-18.708-3.386-37.478-6.794-55.924-2.92-15.807-13.842-25.54-29.557-29.004-8.592-1.894-17.388-3.395-26.157-3.864-51.069-2.73-102.158-5.102-139.859-6.942h.001Z" />
            <path d="M345.035,184.98c-46.987,27.189-93.034,53.834-139.65,80.809V104.194c46.387,26.834,92.521,53.522,139.65,80.786h0Z" />
          </svg>
        </Link>
      </div>
      <div className={`${variant === "header" ? "" : "px-1 md:px-4"}`}>
        <Link
          href={socialMediaLinks.tiktok}
          target="_blank"
          rel="noopener noreferrer"
          className={`${baseClasses} ${variant === "header" ? headerClasses : footerClasses}`}
        >
          <svg
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 12 14"
            fill="currentColor"
            className={variant === "footer" ? footerSVG : headerFooterSVG}
          >
            <path d="M12,3.295c-1.92-.121-3.028-1.306-3.263-3.295l-2.306.008v8.367c.349,4.465-3.839,3.789-4.166,1.503-.167-1.192.432-1.875,1.502-2.232.361-.122.732-.213,1.109-.273v-2.362C.08,5.178-.839,9.484.656,11.929c2.322,3.804,8.112,2.148,8.112-3.167v-4.176c1.138.683,2.117,1.048,3.232.942v-2.233Z" />
          </svg>
        </Link>
      </div>
    </div>
  );
}