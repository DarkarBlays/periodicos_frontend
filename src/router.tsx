import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Home from "./views/Home";
import CreateNewpaperView from "./views/CreateNewpaperView";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} index />
          <Route path="/create" element={<CreateNewpaperView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
