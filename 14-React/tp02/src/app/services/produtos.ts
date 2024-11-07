import Produto from "../types/produto";
import api from "./api";

export default async function getListaproduto(): Promise<Produto[]> {
  return api.get("/produto").then((response) => response.data);
}
