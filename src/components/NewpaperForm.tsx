import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  Control,
  useWatch,
} from "react-hook-form";
import { NewpaperFormData } from "../types";
import ErrorMessage from "./ErrorMessage";

type NewpaperFormProps = {
  register: UseFormRegister<NewpaperFormData>;
  errors: FieldErrors<NewpaperFormData>;
  setValue: UseFormSetValue<NewpaperFormData>;
  control: Control<NewpaperFormData>;
};

export default function NewpaperForm({
  register,
  errors,
  setValue,
  control,
}: NewpaperFormProps) {
  // Escuchar el archivo cargado
  const archivo = useWatch({ control, name: "archivo" });

  return (
    <>
      <div className="mb-5 space-y-3">
        <label htmlFor="titulo" className="text-sm uppercase font-bold">
          Nombre del Periódico
        </label>
        <input
          id="titulo"
          className="w-full p-3 border border-gray-200"
          type="text"
          placeholder="Nombre del Periódico"
          {...register("titulo", {
            required: "El título del periódico es obligatorio",
          })}
        />
        {errors.titulo && <ErrorMessage>{errors.titulo.message}</ErrorMessage>}
      </div>

      <div className="mb-5 space-y-3">
        <label htmlFor="precio" className="text-sm uppercase font-bold">
          Precio del Periódico
        </label>
        <input
          id="precio"
          className="w-full p-3 border border-gray-200"
          type="number"
          placeholder="$12000"
          {...register("precio", {
            required: "El precio del periódico es obligatorio",
          })}
        />
        {errors.precio && <ErrorMessage>{errors.precio.message}</ErrorMessage>}
      </div>

      <div className="mb-5 space-y-3">
        <label htmlFor="fecha" className="text-sm uppercase font-bold">
          Fecha del Periódico
        </label>
        <input
          id="fecha"
          className="w-full p-3 border border-gray-200"
          type="date"
          {...register("fecha", {
            required: "La fecha del periódico es obligatoria",
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
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setValue("archivo", file);
            }}
          />
        </label>

        {/* Mostrar nombre del archivo */}
        {archivo && (
          <p className="text-sm text-gray-600 mt-2">
            Archivo seleccionado:{" "}
            <span className="font-medium">{archivo.name}</span>
          </p>
        )}

        {errors.archivo && (
          <ErrorMessage>{errors.archivo.message}</ErrorMessage>
        )}
      </div>
    </>
  );
}
