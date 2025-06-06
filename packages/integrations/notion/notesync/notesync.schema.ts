import { z } from "zod";

export const notesInputCheck = z.object({
  query: z.string().optional(),
  maxResults: z.number().min(1).max(100).optional(),
});

export type NotesInputType = z.infer<typeof notesInputCheck>;
