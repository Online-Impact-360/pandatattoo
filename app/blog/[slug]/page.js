"use client";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import Banner from "../../components/banner";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function BlogPage() {
  const { slug } = useParams();
  const [blogPost, setBlogPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogPost() {
      try {
        const res = await fetch(`/api/contentful?content_type=blog&fields.slug=${slug}`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        const items = data.items || [];
        if (items.length === 0) {
          setBlogPost({ title: "Blog Not Found", content: null });
        } else {
          setBlogPost(items[0].fields);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching blog post:", error);
        setBlogPost({ title: "Error Loading Blog", content: null });
        setIsLoading(false);
      }
    }

    if (slug) {
      fetchBlogPost();
    }
  }, [slug]);

  // Helper function to render rich text content
  const renderContent = (content) => {
    if (!content) return <p className="text-black text-lg mb-4">No content available</p>;
    if (typeof content === "object" && content.nodeType) {
      return documentToReactComponents(content, {
        renderNode: {
          [BLOCKS.PARAGRAPH]: (node, children) => (
            <p className="text-black mb-4">{children}</p>
          ),
          [BLOCKS.HEADING_3]: (node, children) => (
            <h3 className="text-black font-bold mb-2">{children}</h3>
          ),
          [BLOCKS.UL_LIST]: (node, children) => (
            <ul className="text-black list-disc list-inside mb-4 [&>li::marker]:inline">{children}</ul>
          ),
          [BLOCKS.OL_LIST]: (node, children) => (
            <ol className="text-black list-decimal list-inside mb-4 [&>li::marker]:inline">{children}</ol>
          ),
          [BLOCKS.LIST_ITEM]: (node, children) => (
            <li className="ml-5 mb-2">{children}</li>
          ),
          [BLOCKS.PARAGRAPH]: (node, children) => {
            if (node.content[0]?.nodeType === "text" || node.content[0]?.nodeType === "hyperlink") {
              return <span className="text-black">{children}</span>;
            }
            return <p className="text-black mb-4">{children}</p>;
          },
          [INLINES.HYPERLINK]: (node, children) => (
            <a href={node.data.uri} className="text-[#ff4901] underline" target="_blank" rel="noopener noreferrer">{children}</a>
          ),
        },
        renderMark: {
          bold: (text) => <strong className="font-bold text-black">{text}</strong>,
          italic: (text) => <em className="italic text-black">{text}</em>,
        },
      });
    }
    return <p className="text-black text-xs lg:text-lg mb-4">{content}</p>;
  };

  return (
    <div>
      <Banner header="Blog" />
      <section>
        <h2 className="flex border-b-2 p-5">
          <span className="w-1/5 text-left text-white text-xs md:text-xl">(BLOG)</span>
          <span className="w-4/5 text-right text-white uppercase text-lg md:text-4xl font-bold">
            {isLoading ? "Loading..." : blogPost?.title || "SIT YOUR ASS DOWN AND READ"}
          </span>
        </h2>
        <div className="py-10 px-2 lg:p-20 mb-20">
          <div className="py-10 px-5 lg:p-15 bg-white rounded-[20px] lg:rounded-[30px] text-sm lg:text-lg">
            {isLoading ? (
              <p className="text-black">Loading blog content...</p>
            ) : (
              renderContent(blogPost?.content)
            )}
          </div>
        </div>
      </section>
    </div>
  );
}