import Carrinho from "@/app/types/carrinho";

export default interface ICarrinhoProps {
  carrinho: Carrinho;
  removerItemDoCarrinho: (id: string) => void;
}
