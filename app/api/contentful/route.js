import * as contentful from "contentful";
import { NextResponse } from "next/server";

const { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN } = process.env;

const client = contentful.createClient({
  space: CONTENTFUL_SPACE_ID,
  accessToken: CONTENTFUL_ACCESS_TOKEN,
});

// Extract query parameters
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const contentType = searchParams.get("content_type");
    const slug = searchParams.get("fields.slug");

    // Ensure content_type is provided
    if (!contentType) {
      return NextResponse.json(
        { error: "Missing content_type parameter" },
        { status: 400 }
      );
    }

    // Build query object
    const query = { content_type: contentType };
    if (slug) {
      query["fields.slug"] = slug;
    }

    console.log(query)
    // Fetch filtered entries
    const entries = await client.getEntries(query);

    return NextResponse.json({ items: entries.items });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data from Contentful" },
      { status: 500 }
    );
  }
}