import { z } from "zod";

export const archivoSchema = z.object({
  id: z.number(),
  name: z.string(),
  url: z.string(),
  mime: z.string(),
  size: z.number(),
  hash: z.string(),
  ext: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string(),
});

export const newpaperSchema = z.object({
  id: z.number(),
  documentId: z.string(),
  titulo: z.string().min(1, "El título es obligatorio"),
  fecha: z.string(),
  precio: z.number().min(0, "El precio no puede ser negativo"),
  archivo: archivoSchema.optional(),
});

export const homeNewpaperSchema = z.object({
  data: z.array(newpaperSchema),
});

export type Newpaper = z.infer<typeof newpaperSchema>;

export type NewpaperFormData = Pick<
  Newpaper,
  "titulo" | "fecha" | "precio" | "archivo"
>;
