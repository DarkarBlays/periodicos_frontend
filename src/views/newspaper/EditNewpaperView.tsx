import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";
import { getNewpaperById } from "../../api/NewpaperAPI";
import EditNewpaperForm from "../../components/newspaper/EditNewpaperForm";

export default function EditNewpaperView() {
  const params = useParams();
  const newpaperId = +params.newpaperId!;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["editNewpaper", newpaperId],
    queryFn: () => getNewpaperById(newpaperId),
    retry: false,
  });

  if (isLoading) return "Cargando...";
  if (isError) return <Navigate to="/404" />;
  if (data) return <EditNewpaperForm data={data} newpaperId={newpaperId} />;
}
