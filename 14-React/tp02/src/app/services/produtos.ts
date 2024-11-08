import Produto from "../types/produto";
import api, { apiFavoritos } from "./api";

export async function getListaproduto(): Promise<Produto[]> {
  return api.get("/produto").then((response) => response.data);
}

export async function addProdutoFavorito(produto: Produto) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return apiFavoritos
    .post<Produto>("/favoritos", produto)
    .then((response) => response.data);
}