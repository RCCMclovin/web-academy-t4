import Carrinho from "@/app/types/carrinho";
import ItemCarrinho from "@/app/types/itemCarrinho";

export default interface ICarrinhoProps {
  carrinho: Carrinho;
  setItensCarrinho: React.Dispatch<React.SetStateAction<Carrinho>>;
  setValorTotal: React.Dispatch<React.SetStateAction<number>>;
  setQuantidadeItens: React.Dispatch<React.SetStateAction<number>>;
  sum: (produtos: ItemCarrinho[]) => number;
  total: (produtos: ItemCarrinho[]) => number;
}
