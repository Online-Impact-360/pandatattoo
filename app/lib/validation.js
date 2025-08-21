import z from "zod";


export const SubmissionSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  phoneNumber: z.string().trim().min(6).max(30),
  email: z.string().trim().regex(/^\w[\w.-]*@([\w-]+\.)+[\w-]+$/),
  instagram: z.string().trim().max(120).optional(),
  age: z.enum(["over18", "under18"]).optional().transform((val) => val), // Map to ageType
  ageType: z.enum(["over18", "under18"]).optional(),
  gender: z.enum(["Male", "Female"]).optional(),
  bodyPosition: z.string().trim().max(120).optional(),
  bodyPositionImage: z.string().trim().max(120).optional(), // Handle separately if needed
  selectedPosition: z.enum(["front", "back"]).optional(),
  size: z.string().trim().max(120).optional(),
  color: z.enum(["Color", "Black/White"]).optional().transform((val) => val), // Map to colorType
  colorType: z.enum(["Color", "Black/White"]).optional(),
  tattooDescription: z.string().min(10).max(5000).optional(),
  availableDates: z.array(z.string().trim().min(1)).optional(),
  schedule: z.string().trim().max(500).optional(),
  location: z.string().trim().optional().transform((val) => val?.includes("Visiting") ? "Visiting" : "Living"), // Map to miamiStatus
  miamiStatus: z.enum(["Living", "Visiting"]).optional(),
  scheduleType: z.string().trim().optional(), // Handle separately
  artistId: z.string().trim().optional(), // Maps to artistName in Contentful
  tattooImage: z.any().optional(), // Handled separately as a File
}).transform((data) => ({
  ...data,
  ageType: data.age || data.ageType, // Prefer age if provided
  colorType: data.color || data.colorType, // Prefer color if provided
  miamiStatus: data.location || data.miamiStatus, // Prefer location if provided
}));

export const SubmissionInput = SubmissionSchema.shape;
