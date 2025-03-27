import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import NewpaperForm from "../components/NewpaperForm";
import { toast } from "react-toastify";
import { NewpaperFormData } from "../types";
import { createNewpaper } from "../api/NewpaperAPI";

export default function CreateNewpaperView() {
  const navigate = useNavigate();

  const initialValues: NewpaperFormData = {
    titulo: "",
    fecha: "",
    precio: 0,
    archivo: {
      name: "",
      size: 0,
      type: "application/pdf",
    },
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: createNewpaper,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      navigate("/");
    },
  });

  const handleForm = (formData: NewpaperFormData) => mutate(formData);

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black">Crear Periodico</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Llena el siguiente formulario para crear un periodico
        </p>

        <nav className="my-5">
          <Link
            className="bg-red-400 hover:bg-red-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
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
          <NewpaperForm register={register} errors={errors} />
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
