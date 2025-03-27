import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <h1 className="text-5xl font-black">Mis Periodicos</h1>
      <p className="text-2xl font-light text-gray-500 mt-5">
        Maneja y administra tus periodicos
      </p>

      <nav className="my-5">
        <Link
          className="bg-red-400 hover:bg-red-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
          to="/create"
        >
          Nuevo Periodico
        </Link>
      </nav>
    </>
  );
}
