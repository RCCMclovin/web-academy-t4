import Produto from "@/app/types/produto";

export default interface IListagemFavoritosProps {
  favoritos: Produto[];
  refreshFavoritos: () => void;
}
