"use client";

import ItemFavorito from "./ItemFavorito";
import IListagemFavoritosProps from "./props/IListagemFavoritosProps";

export default function ListagemFavoritos(props: IListagemFavoritosProps) {
    const generateRows = (): JSX.Element[] => {
      const rows: JSX.Element[] = [];
      const numProds: number = props.favoritos.length
      for(let i = 0; i < numProds; i++) {
        rows.push(
            <ItemFavorito produto={props.favoritos[i]}
                refreshFavoritos={props.refreshFavoritos}>    
            </ItemFavorito>
            
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