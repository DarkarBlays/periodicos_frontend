import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Home from "./views/Home";
import CreateNewpaperView from "./views/newspaper/CreateNewpaperView";
import EditNewpaperView from "./views/newspaper/EditNewpaperView";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} index />
          <Route path="/newspaper/create" element={<CreateNewpaperView />} />
          <Route path="/newspaper/:newpaperId/edit" element={<EditNewpaperView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
