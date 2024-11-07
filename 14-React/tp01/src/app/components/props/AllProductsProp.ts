import Carrinho from "@/app/types/carrinho";
import ItemCarrinho from "@/app/types/itemCarrinho";
import Produto from "@/app/types/produto";

//Prop para substituir a falta de um banco de dados com produtos
export default interface AllProductsProp {
  produtos: Produto[];
  itensCarrinho: Carrinho;
  setItensCarrinho: React.Dispatch<React.SetStateAction<Carrinho>>;
  setValorTotal: React.Dispatch<React.SetStateAction<number>>;
  setQuantidadeItens: React.Dispatch<React.SetStateAction<number>>;
  sum: (produtos: ItemCarrinho[]) => number;
  total: (produtos: ItemCarrinho[]) => number;
  inserirProduto: (produto: Produto) => void;
}
