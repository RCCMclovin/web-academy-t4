import { useQuery } from "@tanstack/react-query";
import { getListaFavoritos } from "../services/produtos";

export default function useListaFavoritos() {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["listaFavoritos"],
    queryFn: () => getListaFavoritos(),
  });

  return { produtos: data, refetchFavoritos: refetch, isPending, isError };
}
