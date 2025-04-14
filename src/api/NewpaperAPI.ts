import api from "../lib/axios";
import { isAxiosError } from "axios";
import { homeNewpaperSchema, Newpaper, NewpaperFormData } from "../types";

export async function createNewpaper(formData: NewpaperFormData) {
  try {
    let uploadedFileId: number;

    if (formData.archivo) {
      const uploadForm = new FormData();
      if (formData.archivo instanceof File) {
        uploadForm.append("files", formData.archivo);
      } else {
        throw new Error("El archivo proporcionado no es un Blob válido.");
      }

      const uploadResponse = await api.post("/upload", uploadForm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      uploadedFileId = uploadResponse.data?.[0]?.id;

      if (!uploadedFileId) {
        throw new Error("No se pudo obtener el ID del archivo subido");
      }
    }
    
    const payload = {
      data: {
        titulo: formData.titulo,
        fecha: formData.fecha,
        precio: Number(formData.precio),
        archivo: uploadedFileId!, 
      },
    };

    const response = await api.post("/periodicos", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    console.error(error);
    if (isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data?.error?.message ||
        error.response.data?.message ||
        "Error al crear el periódico."
      );
    } else {
      throw new Error("Error inesperado.");
    }
  }
}


export async function getNewpapers() {
  try {
    const { data } = await api("/periodicos?populate=archivo");
    const response = homeNewpaperSchema.safeParse(data);

    if (response.success) {
      return response.data.data;
    }
    
  } catch (error) {
    console.error(error);
    if (isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data?.error?.message ||
        error.response.data?.message ||
        "Error al crear el periódico."
      );
    } else {
      throw new Error("Error inesperado.");
    }
  }
}

export async function getNewpaperById(id:Newpaper['id']) {
  try {
    const {data} = await api(`/periodicos/${id}`)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}