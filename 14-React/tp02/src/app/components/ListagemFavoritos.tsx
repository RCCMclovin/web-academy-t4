"use client";

import Produto from "../types/produto";
import ItemFavorito from "./ItemFavorito";
import IListagemFavoritosProps from "./props/IListagemFavoritosProps";

export default function ListagemFavoritos(props: IListagemFavoritosProps) {
  const generateRows = (favorito: Produto): JSX.Element => {
      return (
        <ItemFavorito produto={favorito}
          refreshFavoritos={props.refreshFavoritos}>    
        </ItemFavorito>      
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
                        <th>Opções</th>
                      </tr>
                    </thead>
                    <tbody>
                  {props.favoritos.map(generateRows)}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
      );
  }