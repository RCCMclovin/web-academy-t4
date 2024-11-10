import ItemCarrinho from "@/app/types/itemCarrinho";

export default interface ICartProduto {
  produto: ItemCarrinho;
  removerItemDoCarrinho: (id: string) => void;
}
