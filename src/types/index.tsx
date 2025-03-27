import { z } from "zod";

export const newpaperSchema = z.object({
  uid: z.string(),
  titulo: z.string().min(1, "El título es obligatorio"),
  fecha: z
    .string(),
  precio: z.number().min(0, "El precio no puede ser negativo"),
  archivo: z
    .object({
      name: z.string().endsWith(".pdf", "El archivo debe ser un PDF"),
      size: z
        .number()
        .max(10 * 1024 * 1024, "El archivo no debe superar los 10MB"),
      type: z.literal("application/pdf"),
    })
    .refine((file) => file.type === "application/pdf", {
      message: "Solo se permiten archivos PDF",
    }),
});

export type Newpaper = z.infer<typeof newpaperSchema>;

export type NewpaperFormData = Pick<Newpaper, "titulo" | "fecha" | "precio" | "archivo">
