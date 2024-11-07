import { useQuery } from "@tanstack/react-query";
import { getListaproduto } from "../services/produtos";

export default function useListaProdutos() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["listaProdutos"],
    queryFn: () => getListaproduto(),
  });

  return { produtos: data, isPending, isError };
}
