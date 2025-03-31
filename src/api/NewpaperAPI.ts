import api from "../lib/axios";
import { isAxiosError } from "axios";
import { NewpaperFormData } from "../types";

export async function createNewpaper(newspaperData: NewpaperFormData) {
  const formData = new FormData();

  // Agregar los datos bajo la clave "data" en formato JSON
  formData.append(
    "data",
    JSON.stringify({
      titulo: newspaperData.titulo,
      fecha: newspaperData.fecha,
      precio: newspaperData.precio,
    })
  );

  // Adjuntar el archivo SOLO si existe
  if (newspaperData.archivo) {
    formData.append("files.archivo", newspaperData.archivo);
  }
  
  try {
    const {data} = await api.post(
      "/periodicos",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("✅ Periódico creado con éxito:", data);
    return data;
    
  } catch (error) {
    console.log(error);
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
