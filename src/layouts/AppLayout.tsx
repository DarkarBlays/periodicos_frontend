import { Outlet } from "react-router-dom";
import NavMenu from "../components/NavMenu";
import Logo from "../components/Logo";

export default function AppLayout() {
  return (
    <>
      <header className="bg-gray-300 py-5">
        <div className="max-w-screen-2xl mx-auto flex flex-col justify-between items-center">
          <div className="w-64">
            <Logo />
          </div>
          <div className="mt-5">
            <NavMenu />
          </div>
        </div>
      </header>
      <section className="max-w-screen-2xl mx-auto mt-10 p-5">
        <Outlet />
      </section>
      <footer className="py-5">
        <p className="text-center">
          Todos los derechos reservados{" "}
          <span className="font-bold">{new Date().getFullYear()} </span>
        </p>
      </footer>
    </>
  );
}
