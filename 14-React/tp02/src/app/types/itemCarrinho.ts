import Produto from "./produto";

export default interface ItemCarrinho extends Produto {
  quantidade: number;
}
