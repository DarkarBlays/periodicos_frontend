import { Link } from "react-router-dom";
import { Fragment } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import { getNewpapers } from "../api/NewpaperAPI";
import {
  EllipsisHorizontalIcon,
  CalendarIcon,
} from "@heroicons/react/20/solid";

export default function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ["periodicos"],
    queryFn: getNewpapers,
  });

  if (isLoading) return "Cargando...";

  if (data)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-gray-200 p-10 font-serif">
        <h1 className="text-5xl font-black text-center text-gray-800 mb-4">
          Mis Periódicos
        </h1>
        <p className="text-2xl font-light text-center text-gray-500 mb-10">
          Maneja y administra tus periódicos
        </p>

        <nav className="flex justify-center mb-10">
          <Link
            className="bg-red-500 hover:bg-red-600 px-10 py-3 text-white text-xl font-bold cursor-pointer transition rounded-md shadow-lg"
            to="/newspaper/create"
          >
            Nuevo Periódico
          </Link>
        </nav>

        {data?.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
            {data.map((periodico) => (
              <div
                key={periodico.id}
                className="relative flex flex-col gap-3 p-4 w-60 bg-white/70 backdrop-blur-md rounded-2xl shadow-md border border-gray-300 hover:scale-105 transition-transform duration-300 hover:shadow-xl"
              >
                {/* Etiqueta NUEVO */}
                <span className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-bold px-2 py-0.5 rounded shadow z-20">
                  NUEVO
                </span>

                {/* Menú de acciones */}
                <Menu as="div" className="absolute top-2 right-2 z-20">
                  <MenuButton className="p-1 rounded-full text-gray-600 bg-white hover:text-black hover:bg-gray-200 transition">
                    <EllipsisHorizontalIcon className="w-6 h-6" />
                  </MenuButton>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <MenuItems className="absolute right-0 mt-2 w-44 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-30">
                      <MenuItem>
                        <Link
                          to={`/newspaper/${periodico.documentId}/edit`}
                          className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-100"
                        >
                          Editar
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <button className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-gray-100">
                          Eliminar
                        </button>
                      </MenuItem>
                    </MenuItems>
                  </Transition>
                </Menu>

                {/* Imagen o ícono */}
                <div className="relative z-10 w-full h-32 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center border border-gray-300">
                  {periodico.archivo?.url ? (
                    <img
                      src={`https://res.cloudinary.com/dgqiunsrg/image/upload/f_auto,q_auto/${periodico.archivo.hash}`}
                      alt={periodico.titulo}
                      className="w-full h-auto object-contain"
                    />
                  ) : (
                    <svg
                      className="w-12 h-12 fill-zinc-300"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M20 5H4V19L13.2923 9.70649C13.6828 9.31595 14.3159 9.31591 14.7065 9.70641L20 15.0104V5ZM2 3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V3.9934ZM8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11Z" />
                    </svg>
                  )}
                </div>

                {/* Título */}
                <h2 className="text-lg font-bold text-gray-800 capitalize text-center">
                  {periodico.titulo}
                </h2>

                {/* Precio y Fecha */}
                <div className="flex flex-col gap-1 items-center text-sm text-gray-600">
                  <p className="text-base font-semibold text-black">
                    ${periodico.precio}
                  </p>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4" />
                    <span>{periodico.fecha}</span>
                  </div>
                </div>

                {/* Botón Añadir */}
                <div className="mt-auto">
                  <button className="flex items-center justify-center gap-2 w-full py-2 px-4 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 rounded-md shadow transition-all duration-200 hover:scale-105">
                    <svg
                      className="w-4"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 
                        2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25L5.106 5.272M6 
                        20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 
                        0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                      />
                    </svg>
                    Añadir
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center py-20 text-gray-700 text-xl">
            No hay periódicos aún.{" "}
            <Link
              to="/create"
              className="text-red-600 font-bold hover:underline"
            >
              Crear periódico
            </Link>
          </p>
        )}
      </div>
    );
}
