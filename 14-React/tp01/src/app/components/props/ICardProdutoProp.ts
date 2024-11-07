import Produto from "@/app/types/produto";
import ImgProp from "./ImgProp";
import Carrinho from "@/app/types/carrinho";
import ItemCarrinho from "@/app/types/itemCarrinho";

export default interface ICardProdutoProp {
  itensCarrinho: Carrinho;
  setItensCarrinho: React.Dispatch<React.SetStateAction<Carrinho>>;
  img: ImgProp;
  produto: Produto;
  setValorTotal: React.Dispatch<React.SetStateAction<number>>;
  setQuantidadeItens: React.Dispatch<React.SetStateAction<number>>;
  sum: (produtos: ItemCarrinho[]) => number;
  total: (produtos: ItemCarrinho[]) => number;
}
