import { getContentfulEnv, LOCALE } from "./contentfulClient";

const CT_ID = "appointments"; // Content Type ID for form submissions
const F = {
  fullName: "fullName",
  phoneNumber: "phoneNumber",
  email: "email",
  instagram: "instagram",
  ageType: "ageType",
  gender: "gender",
  bodyPosition: "bodyPosition",
  selectedPosition: "selectedPosition",
  size: "size",
  colorType: "colorType",
  tattooDescription: "tattooDescription",
  availableDates: "availableDates",
  schedule: "schedule",
  miamiStatus: "miamiStatus",
  submissionDate: "submissionDate",
  tattooImage: "tattooImage",
  artistName: "artistName",
};

export async function createFormSubmissionEntry(data, tattooImage) {
  try {
    const env = await getContentfulEnv();

    // Build the Contentful entry payload
    const fields = {
      [F.fullName]: { [LOCALE]: data.fullName },
      [F.phoneNumber]: { [LOCALE]: data.phoneNumber },
      [F.email]: { [LOCALE]: data.email },
      [F.submissionDate]: { [LOCALE]: new Date().toISOString() },
    };

    if (data.instagram) fields[F.instagram] = { [LOCALE]: data.instagram };
    if (data.ageType) fields[F.ageType] = { [LOCALE]: data.ageType };
    if (data.gender) fields[F.gender] = { [LOCALE]: data.gender };
    if (data.bodyPosition) fields[F.bodyPosition] = { [LOCALE]: data.bodyPosition };
    if (data.selectedPosition) fields[F.selectedPosition] = { [LOCALE]: data.selectedPosition };
    if (data.size) fields[F.size] = { [LOCALE]: data.size };
    if (data.colorType) fields[F.colorType] = { [LOCALE]: data.colorType };
    if (data.tattooDescription) fields[F.tattooDescription] = { [LOCALE]: data.tattooDescription };
    if (data.availableDates) fields[F.availableDates] = { [LOCALE]: data.availableDates };
    if (data.schedule) fields[F.schedule] = { [LOCALE]: data.schedule };
    if (data.miamiStatus) fields[F.miamiStatus] = { [LOCALE]: data.miamiStatus };
    if (data.artistId) {
      fields[F.artistName] = {
        [LOCALE]: { sys: { type: "Link", linkType: "Entry", id: data.artistId } },
      };
    }

    // Handle tattooImage upload
    if (tattooImage) {
      try {
        // Validate file
        const allowedMimeTypes = ["image/jpeg", "image/png", "application/pdf"];
        const maxFileSize = 5 * 1024 * 1024; // 5MB
        if (!allowedMimeTypes.includes(tattooImage.type)) {
          throw new Error(`Invalid file type: ${tattooImage.type}. Only JPEG, PNG, or PDF are allowed.`);
        }
        if (tattooImage.size > maxFileSize) {
          throw new Error(`File size exceeds 5MB limit: ${tattooImage.size} bytes`);
        }
        if (tattooImage.size === 0) {
          throw new Error("File is empty");
        }

        // Read file as ArrayBuffer
        const arrayBuffer = await tattooImage.arrayBuffer().catch((error) => {
          throw new Error(`Failed to read file buffer: ${error.message}`);
        });

        // Convert to Buffer
        const buffer = Buffer.from(arrayBuffer);

        // Validate buffer for PNG
        if (tattooImage.type === "image/png") {
          const pngHeader = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
          if (!buffer.subarray(0, 8).equals(pngHeader)) {
            throw new Error("Invalid PNG file: Missing PNG signature");
          }
        }

        // Step 1: Upload the file binary
        const upload = await env.createUpload({
          file: buffer,
          contentType: tattooImage.type,
          fileName: tattooImage.name,
        }).catch((error) => {
          throw new Error(`Failed to upload file: ${error.message}`);
        });

        // Step 2: Create an asset referencing the upload
        const asset = await env.createAsset({
          fields: {
            title: { [LOCALE]: `Tattoo Image for ${data.fullName}` },
            file: {
              [LOCALE]: {
                contentType: tattooImage.type,
                fileName: tattooImage.name,
                uploadFrom: {
                  sys: {
                    type: "Link",
                    linkType: "Upload",
                    id: upload.sys.id,
                  },
                },
              },
            },
          },
        }).catch((error) => {
          throw new Error(`Failed to create asset: ${error.message}`);
        });


        // Step 3: Process the asset for all locales
        const processedAsset = await asset.processForAllLocales().catch((error) => {
          throw new Error(`Failed to process asset: ${error.message}`);
        });

        // Step 4: Publish the asset
        const publishedAsset = await processedAsset.publish().catch((error) => {
          throw new Error(`Failed to publish asset: ${error.message}`);
        });


        // Link the asset to the entry
        fields[F.tattooImage] = {
          [LOCALE]: { sys: { type: "Link", linkType: "Asset", id: publishedAsset.sys.id } },
        };
      } catch (error) {
        console.warn("Image upload failed, proceeding with entry creation:", {
          message: error.message,
          stack: error.stack,
        });
      }
    }

    // Create the entry
    const entry = await env.createEntry(CT_ID, { fields }).catch((error) => {
      throw new Error(`Failed to create entry: ${error.message}`);
    });


    // Publish the entry
    const published = await entry.publish().catch((error) => {
      throw new Error(`Failed to publish entry: ${error.message}`);
    });


    return { id: published.sys.id, sys: published.sys };
  } catch (error) {
    throw new Error(`Failed to create form submission entry: ${error.message}`);
  }
}