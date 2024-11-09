import { useMutation } from "@tanstack/react-query";
import Produto from "../types/produto";
import { removeProdutoFavorito } from "../services/produtos";

export default function useRemoveFavorito(
  onSuccess: () => void,
  onError: () => void
) {
  const { mutate, isPending } = useMutation({
    mutationFn: (produto: Produto) => removeProdutoFavorito(produto),
    onSuccess,
    onError,
  });

  return {
    removerFavorito: mutate,
    isPending,
  };
}
