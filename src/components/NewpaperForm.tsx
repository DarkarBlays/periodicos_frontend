import { FieldErrors, UseFormRegister } from "react-hook-form";
import { NewpaperFormData } from "../types";
import ErrorMessage from "./ErrorMessage";

type NewpaperFormProps = {
  register: UseFormRegister<NewpaperFormData>;
  errors: FieldErrors<NewpaperFormData>;
};

export default function NewpaperForm({ errors, register }: NewpaperFormProps) {
  return (
    <>
      <div className="mb-5 space-y-3">
        <label htmlFor="titulo" className="text-sm uppercase font-bold">
          Nombre del Periodico
        </label>
        <input
          id="titulo"
          className="w-full p-3  border border-gray-200"
          type="text"
          placeholder="Nombre del Periodico"
          {...register("titulo", {
            required: "El Titulo del periodico es obligatorio",
          })}
        />
        {errors.titulo && <ErrorMessage>{errors.titulo.message}</ErrorMessage>}
      </div>

      <div className="mb-5 space-y-3">
        <label htmlFor="precio" className="text-sm uppercase font-bold">
          Precio del Periodico
        </label>
        <input
          id="precio"
          className="w-full p-3  border border-gray-200"
          type="number"
          placeholder="$12000"
          {...register("precio", {
            required: "El precio del periodico es obligatorio",
          })}
        />
        {errors.precio && <ErrorMessage>{errors.precio.message}</ErrorMessage>}
      </div>

      <div className="mb-5 space-y-3">
        <label htmlFor="fecha" className="text-sm uppercase font-bold">
          Fecha del Periodico
        </label>
        <input
          id="fecha"
          className="w-full p-3  border border-gray-200"
          type="date"
          {...register("fecha", {
            required: "La fecha del periodico es obligatorio",
          })}
        />
        {errors.fecha && <ErrorMessage>{errors.fecha.message}</ErrorMessage>}
      </div>

      <div className="mb-5 space-y-2">
        <label htmlFor="archivo" className="text-sm uppercase font-bold">
          Archivo del Periódico
        </label>

        <label
          htmlFor="archivo"
          className="flex flex-col items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:border-blue-500 hover:bg-blue-50 transition duration-200"
        >
          <span className="text-gray-600 text-sm font-medium">
            Haz clic o arrastra un archivo aquí
          </span>
          <span className="text-xs text-gray-500">
            Solo archivos PDF (máx. 10MB)
          </span>
          <input
            id="archivo"
            type="file"
            className="hidden"
            accept=".pdf"
            {...register("archivo", {
              required: "El archivo del periodico es obligatorio",
            })}
          />
        </label>
        {errors.archivo && (
          <ErrorMessage>{errors.archivo.message}</ErrorMessage>
        )}
      </div>
    </>
  );
}
