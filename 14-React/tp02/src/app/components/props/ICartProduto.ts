import Carrinho from "@/app/types/carrinho";
import ItemCarrinho from "@/app/types/itemCarrinho";
import Produto from "@/app/types/produto";

export default interface ICartProduto {
  produto: Produto;
  setItensCarrinho: React.Dispatch<React.SetStateAction<Carrinho>>;
  quantidade: number;
  setValorTotal: React.Dispatch<React.SetStateAction<number>>;
  setQuantidadeItens: React.Dispatch<React.SetStateAction<number>>;
  sum: (produtos: ItemCarrinho[]) => number;
  total: (produtos: ItemCarrinho[]) => number;
  removerItemDoCarrinho: (id: string) => void;
}
