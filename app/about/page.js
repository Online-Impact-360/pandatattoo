"use client";
import Banner from "../components/banner";
import { BLOCKS } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import StoreInfo from "../components/storeInfo";
import { useEffect, useState } from "react";

export default function AboutPage() {
  const [aboutData, setAboutData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAboutData() {
      try {
        const res = await fetch("/api/contentful?content_type=aboutPage");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        const items = data.items || [];
        if (items.length === 0) {
          setAboutData({
            mainStoryImage: { fields: { file: { url: "/about/our-story.jpg" } } },
            mainStoryText: null,
            firstBlockSet: null,
            secondBlockSet: null,
            secondImage: { fields: { file: { url: "/about/our-story.jpg" } } },
            thirdBlockSet: null,
            fourthBlockSet: null,
          });
        } else {
          setAboutData(items[0].fields);
        }
        setIsLoading(false);
      } catch (error) {
        setAboutData({
          mainStoryImage: { fields: { file: { url: "/about/our-story.jpg" } } },
          mainStoryText: null,
          firstBlockSet: null,
          secondBlockSet: null,
          secondImage: { fields: { file: { url: "/about/our-story.jpg" } } },
          thirdBlockSet: null,
          fourthBlockSet: null,
        });
        setIsLoading(false);
      }
    }

    fetchAboutData();
  }, []);

  // Helper function to render rich text or plain text
  const renderText = (content) => {
    if (!content) return <p className="text-white text-lg lg:text-2xl xl:text-4xl font-bold">No content available</p>;
    if (typeof content === "object" && content.nodeType) {
      return documentToReactComponents(content, {
        renderNode: {
          [BLOCKS.PARAGRAPH]: (node, children) => (
            <p className="text-white text-lg lg:text-2xl xl:text-4xl font-bold">{children}</p>
          ),
        },
      });
    }
    return <p className="text-white text-lg lg:text-2xl xl:text-xl font-bold">{content}</p>;
  };

  return (
    <div>
      <Banner header="About" />
      <section>
        <h2 className="flex border-b-2 p-5">
          <span className="w-full px-5 md:px-20 text-left text-4xl md:text-6xl font-bold text-white">
            OUR STORY
          </span>
        </h2>
        <div className="mb-20">
          {isLoading ? (
            <div className="text-white text-center text-lg">Loading about content...</div>
          ) : (
            <>
              <div className="flex flex-col md:flex-row p-5 lg:p-20">
                <div className="w-full md:w-2/5 lg:w-1/4 h-60 xl:h-80">
                  <div className="h-[100%] block group overflow-hidden rounded-[20px] flex justify-center items-center">
                    <img
                      src={aboutData?.mainStoryImage?.fields?.file?.url || "/about/our-story.jpg"}
                      alt="Our Story"
                      className="w-[100%] object-cover transition-transform duration-700 group-hover:scale-125"
                    />
                  </div>
                </div>
                <div className="w-full md:w-3/5 lg:w-3/4 py-5 md:pl-10 text-white text-lg lg:text-2xl xl:text-4xl font-bold">
                  {renderText(aboutData?.mainStoryText)}
                </div>
              </div>
              <div className="flex flex-col md:flex-row p-5 lg:py-10 lg:px-20">
                <h3 className="flex w-full md:w-1/2 py-10 md:px-5 rounded-[20px]">
                  <div className="mr-5 text-white">
                    {aboutData?.firstBlockSetTitle || "[01]"}
                  </div>
                  <div className="text-xl font-bold text-white">
                    {renderText(aboutData?.firstBlockSet)}
                  </div>
                </h3>
                <div className="flex w-full md:w-1/2 pb-10 md:py-10 md:px-5 rounded-[20px]">
                  <div className="mr-5 text-white">
                    {aboutData?.secondBlockSetTitle || "[02]"}
                  </div>
                  <div className="text-xl font-bold text-white">
                    {renderText(aboutData?.secondBlockSet)}
                  </div>
                </div>
              </div>
              <div className="flex p-5 md:px-20">
                <div className="w-full h-[300px] md:h-[500px]">
                  <div className="block group h-[300px] md:h-[500px] overflow-hidden rounded-[20px] flex justify-center items-center">
                    <img
                      src={aboutData?.secondImage?.fields?.file?.url || "/about/our-story.jpg"}
                      alt="Our Story"
                      className="w-[100%] object-cover transition-transform duration-700 group-hover:scale-125"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row p-5 lg:px-20 lg:pt-20">
                <div className="flex w-full md:w-1/2 py-0 md:px-5 rounded-[20px]">
                  <div className="mr-5 text-white">
                    {aboutData?.thirdBlockSetTitle || "[01]"}
                  </div>
                  <div className="text-xl font-bold text-white">
                    {renderText(aboutData?.thirdBlockSet)}
                  </div>
                </div>
                <div className="flex w-full md:w-1/2 py-10 md:py-0 md:px-5 rounded-[20px]">
                  <div className="mr-5 text-white">
                    {aboutData?.fourthBlockSetTitle || "[02]"}
                  </div>
                  <div className="text-xl font-bold text-white">
                    {renderText(aboutData?.fourthBlockSet)}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
      <StoreInfo />
    </div>
  );
}