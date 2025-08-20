import { createClient } from "contentful-management";

export async function getContentfulEnv() {
  const token = process.env.CONTENTFULL_CMA_TOKEN;
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const envId = process.env.CONTENTFULL_ENVIRONMENT_ID;

  if (!token || !spaceId || !envId) {
    throw new Error("Missing Contentful env vars (token/spaceId/envId).");
  }

  const client = createClient({ accessToken: token });
  const space = await client.getSpace(spaceId);
  return space.getEnvironment(envId);
}

export const LOCALE = process.env.CONTENTFUL_LOCALE || "en-US";
