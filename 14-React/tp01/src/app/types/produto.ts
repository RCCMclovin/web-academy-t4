import Img from "./imagem";

export default interface Produto {
  id: string;
  fotos?: Img[];
  nome: string;
  preco: string | number;
  descricao?: string;
  vendido?: string;
  usuario_id?: string;
}
