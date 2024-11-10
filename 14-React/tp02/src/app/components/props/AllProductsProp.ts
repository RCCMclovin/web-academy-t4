import Produto from "@/app/types/produto";

//Prop para substituir a falta de um banco de dados com produtos
export default interface AllProductsProp {
  adicionarAoCarrinho: (produto: Produto) => void;
}
