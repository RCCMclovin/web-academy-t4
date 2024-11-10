import Produto from "@/app/types/produto";

export default interface ICardProdutoProp {
  produto: Produto;
  adicionarAoCarrinho: (produto: Produto) => void;
}
