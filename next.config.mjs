/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
	  domains: ["images.ctfassets.net"], // ✅ Add Contentful image domain here
	},
	env: {
	  BUSINESS_PHONE_NUMBER: process.env.BUSINESS_PHONE_NUMBER,
	},
  };

export default nextConfig;
