"use client";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import Banner from "../components/banner";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function BlogList() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        const res = await fetch("/api/contentful?content_type=blog");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        const items = data.items || [];
        setBlogPosts(
          items.map(item => ({
            slug: item.fields.slug || "",
            title: item.fields.title || "Untitled",
            image: item.fields.featuredImage?.fields?.file?.url || "/fallback-image.jpg",
            excerpt: item.fields.excerpt || null,
          }))
        );
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        setIsLoading(false);
      }
    }

    fetchBlogPosts();
  }, []);

  // Helper function to render rich text or plain text
  const renderExcerpt = (content) => {
    if (!content) return <p className="text-md mb-2 text-white">No excerpt available</p>;
    if (typeof content === "object" && content.nodeType) {
      return documentToReactComponents(content, {
        renderNode: {
          [BLOCKS.PARAGRAPH]: (node, children) => (
            <p className="text-md mb-2 text-white">{children}</p>
          ),
        },
      });
    }
    return <p className="text-md mb-2 text-white">{content}</p>;
  };

  const columns = 3;
  const rows = Math.ceil(blogPosts.length / columns);

  const formattedPosts = [];
  for (let i = 0; i < blogPosts.length; i++) {
    if (i % 3 === 0) {
      formattedPosts.push([blogPosts[i]]);
    } else {
      const lastRow = formattedPosts[formattedPosts.length - 1];
      if (lastRow.length < 2) {
        lastRow.push(blogPosts[i]);
      } else {
        formattedPosts.push([blogPosts[i]]);
      }
    }
  }

  return (
    <div>
      <Banner header="Blog" />
      <section className="mb-20">
        <div className="relative grid mb-10 pt-10 pb-10 px-10">
          {/* Background Lines */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Vertical Lines */}
            {Array.from({ length: columns }).map((_, colIndex) => (
              <div
                key={`vertical-${colIndex}`}
                className="absolute top-0 bottom-0 w-[2px] bg-gray-500"
                style={{
                  left: `${(colIndex + 0.5) * (100 / columns)}%`,
                }}
              ></div>
            ))}
            {/* Horizontal Lines */}
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <div
                key={`horizontal-${rowIndex}`}
                className="absolute left-0 right-0 h-[2px] bg-gray-500"
                style={{
                  top: `${(rowIndex + 0.5) * (100 / rows)}%`,
                }}
              ></div>
            ))}
            {/* Dots at intersections */}
            {Array.from({ length: rows - 1 }).map((_, rowIndex) =>
              Array.from({ length: columns - 1 }).map((_, colIndex) => (
                <div
                  key={`dot-${rowIndex}-${colIndex}`}
                  className="absolute w-5 h-5 bg-gray-300 rounded-full"
                  style={{
                    top: `${(rowIndex + 1) * (100 / rows) - 0.6}%`,
                    left: `${(colIndex + 1) * (100 / columns)}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                ></div>
              ))
            )}
          </div>
          {/* Blog Posts Grid */}
          {isLoading ? (
            <div className="text-white text-center">Loading blog posts...</div>
          ) : blogPosts.length === 0 ? (
            <div className="text-white text-center">No blog posts available</div>
          ) : (
            formattedPosts.map((row, rowIndex) => (
              <div key={rowIndex} className="flex w-full flex-col md:flex-row gap-6 mb-10">
                {row.map((post, postIndex) => (
                  <Link
                    href={`/blog/${post.slug}`}
                    key={post.slug}
                    className={`relative ${row.length === 1 ? "w-full" : "w-full md:w-1/2"} flex flex-col gap-6 group`}
                    role="link"
                    tabIndex={0}
                  >
                    <div className="relative w-full">
                      <div className="relative w-full overflow-hidden rounded-[30px] lg:rounded-[50px]">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-[300px] lg:h-[500px] object-cover bg-gray-800 transition-transform duration-700 group-hover:scale-125"
                        />
                      </div>
                      <div className="p-3 md:p-6 text-white">
                        <h3 className="text-lg uppercase lg:text-2xl font-bold m-0">{post.title}</h3>
                        {renderExcerpt(post.excerpt)}
                        <div className="flex text-xl underline text-white">
                          <span className="text-white pr-2">
                            <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="rotate-90">
                              <path d="M7 7h8.586L5.293 17.293l1.414 1.414L17 8.414V17h2V5H7v2z" />
                            </svg>
                          </span>
                          <span className="text-sm mt-1">READ ARTICLE</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}