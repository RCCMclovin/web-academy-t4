"use client";
import Produto from "../types/itemCarrinho";
import ItemCarrinho from "./ItemCarrinho";
import ICarrinhoProps from "./props/ICarrinhoProps";




export default function ListagemCarrinho(props: ICarrinhoProps) {
  const generateRows = (produto: Produto): JSX.Element => {
      return (
        <ItemCarrinho
          produto={produto}
          removerItemDoCarrinho={props.removerItemDoCarrinho}></ItemCarrinho>
      );
  }
  
    return (
        <div className="card mb-4">
            <div className="row card-body">
              <h5 className="card-title mb-4 fw-light">
                Produtos selecionados
              </h5>
              <div className="table-responsive">
                <table className="table ">
                  <thead>
                    <tr>
                      <th>Produto</th>
                      <th>Valor Unitário</th>
                      <th>Quantidade</th>
                      <th>Valor Total</th>
                      <th>Opções</th>
                    </tr>
                  </thead>
                  <tbody>
                {props.carrinho.produtos.map(generateRows)}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
    );
}