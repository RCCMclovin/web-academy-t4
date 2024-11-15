import api from "./api";

export async function addProdutoFavorito(produto: Produto) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return api
    .post<Produto>("/favoritos", produto)
    .then((response) => response.data);
}

export async function getListaFavoritos(): Promise<Produto[]> {
  return api.get("/favoritos").then((response) => response.data);
}

export async function removeProdutoFavorito(produto: Produto) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return api
    .delete(`/favoritos/${produto.id}`)
    .then((response) => response.data);
}
