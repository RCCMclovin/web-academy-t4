"use client";
import ItemCarrinho from "./ItemCarrinho";
import ICarrinhoProps from "./props/ICarrinhoProps";




export default function ListagemCarrinho(props: ICarrinhoProps) {
  const generateRows = (): JSX.Element[] => {
    const rows: JSX.Element[] = [];
    const numProds: number = props.carrinho.produtos.length
    for(let i = 0; i < numProds; i++) {
      rows.push(
        <ItemCarrinho
          produto={props.carrinho.produtos[i]}
          setItensCarrinho={props.setItensCarrinho}
          quantidade={props.carrinho.produtos[i].quantidade}
          setValorTotal={props.setValorTotal}
          setQuantidadeItens={props.setQuantidadeItens}
          sum={props.sum}
          total={props.total}
          removerItemDoCarrinho={props.removerItemDoCarrinho}></ItemCarrinho>
      );
    }
    return rows;
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
                {generateRows()}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
    );
}