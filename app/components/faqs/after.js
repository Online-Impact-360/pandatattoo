"use client";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useEffect, useState } from "react";

export default function After({ isOpen, onToggle }) {
  const [faqContent, setFaqContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchFaqContent() {
      try {
        const res = await fetch("/api/contentful?content_type=afterFaq");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        const items = data.items || [];
        setFaqContent(items.map(item => item.fields));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching FAQ content:", error);
        setIsLoading(false);
      }
    }

    fetchFaqContent();
  }, []);

  const faqPairs = faqContent
    .map(fields => ({
      question: fields.question,
      answer: fields.answer,
    }))
    .filter(pair => pair.question);

  // Helper function to render content (rich text or plain text)
  const renderContent = (content) => {
    if (!content) return null;
    if (typeof content === "object" && content.nodeType) {
      return documentToReactComponents(content);
    }
    return content;
  };

  return (
    <div className="rounded-md transparent">
      <div className="relative flex flex-col mb-[-10%] pb-[15%] text text-center rounded-tr-[50px] rounded-tl-[50px] bg-black shadow-2xl shadow-[0_25px_60px_15px_rgba(225,225,225,0.7)] transition-shadow duration-300 hover:shadow-[0px_0px_25px_rgba(255,255,255,0.3)]">
        {/* Header with click handler */}
        <h2
          className="flex p-10 mb-10 cursor-pointer jump-on-hover transition-transform duration-200"
          onClick={onToggle}
        >
          <span className="text-left text-2xl sm:text-4xl lg:text-6xl font-bold text-white">
            AFTER CARE
          </span>
          <span className="text-xs ml-5 text-white">[ 01 ]</span>
        </h2>

        {/* Content with animation */}
        <div
          className={`text-left transition-all duration-1000 ease-in-out ${
            isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          {isLoading ? (
            <div className="text-white text-center">Loading FAQs...</div>
          ) : faqPairs.length === 0 ? (
            <div className="text-white text-center">No FAQs available</div>
          ) : (
            <div className="faq-content">
              {faqPairs.map((item, index) => (
                <div key={index} className="md:flex faq-section">
                  <div className="w-full md:w-2/5 question">
                    <h2 className="relative w-full text-xl font-bold text-white inline-block after:content-[''] after:block after:h-[1px] after:w-full after:bg-white after:absolute after:top-1/2 after:left-0 after:z-0 after:transform after:-translate-y-1/2">
                      <span className="relative ml-10 p-3 z-10 bg-black">
                        [ QUESTION ]
                      </span>
                    </h2>
                    <div className="p-5 md:p-10 font-bold text-white">
                      {renderContent(item.question)}
                    </div>
                  </div>
                  <div className="w-full md:w-3/5 answer">
                    <h2 className="text-xl">
                      <span className="relative ml-10 px-3 z-10 bg-black font-bold text-[#ff4901]">
                        [ ANSWER ]
                      </span>
                    </h2>
                    <div className="p-5 md:p-10 text-white">
                      {renderContent(item.answer) || "No answer provided"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}