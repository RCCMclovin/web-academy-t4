import { useQuery } from "@tanstack/react-query";
import { getProduto } from "../services/produtos";

export default function useGetProduto(productName: string) {
  const { data, isPending, isError } = useQuery({
    queryKey: ["getProduto", productName],
    queryFn: ({ queryKey }) => getProduto(queryKey[1]),
  });

  return { dadosProduto: data, isPending, isError };
}
