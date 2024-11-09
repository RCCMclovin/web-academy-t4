import Produto from "../types/produto";
import api, { apiFavoritos } from "./api";

export async function getListaproduto(): Promise<Produto[]> {
  return api.get("/produto").then((response) => response.data);
}

export async function getProduto(nomeProduto: string): Promise<Produto> {
  return api.get(`/produto/${nomeProduto}`).then((response) => response.data);
}

export async function addProdutoFavorito(produto: Produto) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return apiFavoritos
    .post<Produto>("/favoritos", produto)
    .then((response) => response.data);
}

export async function getListaFavoritos(): Promise<Produto[]> {
  return apiFavoritos.get("/favoritos").then((response) => response.data);
}

export async function removeProdutoFavorito(produto: Produto) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return apiFavoritos
    .delete(`/favoritos/${produto.id}`)
    .then((response) => response.data);
}