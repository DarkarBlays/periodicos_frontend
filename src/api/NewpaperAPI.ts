import api from "../lib/axios";
import { isAxiosError } from "axios";
import { NewpaperFormData } from "../types";

export async function createNewpaper(formData: NewpaperFormData) {
  try {
    const {data} = await api.post("/periodicos", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
