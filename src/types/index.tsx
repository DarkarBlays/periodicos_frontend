import { z } from "zod";

export const newpaperSchema = z.object({
  data: z.array(
    z.object({
      titulo: z.string().min(1, "El título es obligatorio"),
      fecha: z.string(),
      precio: z.number().min(0, "El precio no puede ser negativo"),
      archivo: z.instanceof(File, { message: "Debe ser un archivo válido" }),
    })
  ),
});

export type Newpaper = z.infer<typeof newpaperSchema>;

export type NewpaperFormData = Pick<Newpaper["data"][0],"titulo" | "fecha" | "precio" | "archivo">;
