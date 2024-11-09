import Produto from "@/app/types/produto";

export default interface IProdutoFavoritoProp {
  produto: Produto;
  refreshFavoritos: () => void;
}
