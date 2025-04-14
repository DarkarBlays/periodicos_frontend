import { Link, useNavigate } from "react-router-dom";
import { Newpaper, NewpaperFormData } from "../../types";
import NewpaperForm from "./NewpaperForm";
import { useForm } from "react-hook-form";

type EditNewpaperFormProps = {
  data: NewpaperFormData;
  newpaperId: Newpaper["id"];
};
export default function EditNewpaperForm({
  data,
  newpaperId,
}: EditNewpaperFormProps) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      titulo: data.titulo,
      fecha: data.fecha,
      precio: data.precio,
      archivo: data.archivo?.url,
    },
  });
  return (
    <>
      <div className="max-w-3xl mx-auto font-serif">
        <h1 className="text-5xl font-black">Editar Periodico</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Llena el siguiente formulario para editar el periodico
        </p>

        <nav className="my-5">
          <Link
            className="bg-red-500 hover:bg-red-600 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            to="/"
          >
            Volver a Periodicos
          </Link>
        </nav>

        <form
          className="mt-10 bg-white shadow-lg p-10 rounded-lg"
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <NewpaperForm
            register={register}
            errors={errors}
            setValue={setValue}
            control={control}
          />
          <input
            type="submit"
            value="Crear Periodico"
            className="bg-red-600 hover:bg-red-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  );
}
