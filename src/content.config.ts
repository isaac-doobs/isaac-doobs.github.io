import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/projects",
    // Keep IDs as the flat filename (e.g. "jasper-properties") regardless of
    // which category subfolder the file lives in, so URLs stay stable.
    generateId: ({ entry }) =>
      entry
        .replace(/\.(md|mdx)$/, "")
        .split("/")
        .pop(),
  }),
  schema: z.object({
    title: z.string(),
    category: z.enum(["Interactive", "Design"]),
    year: z.number(),
    status: z.string(),
    medium: z.array(z.string()),
    dimensions: z.string().optional(),
    concept: z.string(),
    academicContext: z.string().optional(),
    process: z.array(z.string()).optional(),
    challenges: z.string().optional(),
    researchRelevance: z.string().optional(),
    software: z.array(z.string()),
    hardware: z.array(z.string()),
    inputs: z.array(z.string()),
    videoUrl: z.string(),
    thumbnailUrl: z.string(),
    mediaGallery: z.array(z.string()).optional(),
    blueprintUrl: z.string().optional(),
    blueprintCaption: z.string().optional(),
    codeSnippet: z.string().optional(),
    codeLanguage: z.string().default("javascript"),
  }),
});

export const collections = { projects };
