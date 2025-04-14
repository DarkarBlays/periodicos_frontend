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

export async function getNewpaperById(documentId: Newpaper["documentId"]) {
  try {
    const { data } = await api.get(
      `/periodicos?filters[documentId][$eq]=${documentId}&populate=archivo`
    );

    const result = data.data?.[0];

    if (!result) throw new Error("Periódico no encontrado");

    return result;
  } catch (error) {
    console.error("Error al obtener el periódico:", error);
    if (isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data?.error?.message ||
        "Error al obtener el periódico."
      );
    } else {
      throw new Error("Error inesperado.");
    }
  }
}


type NewpaperAPIType ={
  formData: NewpaperFormData;
  newpaperId: Newpaper["documentId"];
}

export async function updateNewpaper({formData,newpaperId}:NewpaperAPIType) {
  try {
    let archivoId: number | undefined = undefined;

    // Si el archivo es un nuevo File, súbelo a Cloudinary
    if (formData.archivo && formData.archivo instanceof File) {
      const uploadForm = new FormData();
      uploadForm.append("files", formData.archivo);

      const uploadResponse = await api.post("/upload", uploadForm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      archivoId = uploadResponse.data?.[0]?.id;

      if (!archivoId) {
        throw new Error("No se pudo obtener el ID del archivo subido");
      }
    } else if (formData.archivo && typeof formData.archivo === "object" && "id" in formData.archivo) {
      // Si ya existe un archivo, mantener su ID
      archivoId = formData.archivo.id;
    }

    const payload = {
      data: {
        titulo: formData.titulo,
        fecha: formData.fecha,
        precio: Number(formData.precio),
        archivo: archivoId,
      },
    };

    const response = await api.put(`/periodicos/${newpaperId}`, payload, {
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
        "Error al actualizar el periódico."
      );
    } else {
      throw new Error("Error inesperado.");
    }
  }
}