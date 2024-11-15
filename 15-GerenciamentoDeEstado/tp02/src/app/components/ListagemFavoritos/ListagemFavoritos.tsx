import ItemFavorito from "../ItemFavorito/ItemFavorito";
import { useFavoritos, useFavoritosContext } from "../FavoritosProvider/FavoritosProvider";


export default function ListagemFavoritos() {
  const { favoritos, removeFavorito, totalFavoritos } = useFavoritosContext();
  const { isPending } = useFavoritos();

  return (
    <div className="card mb-4">
      <div className="row card-body">
        <h5 className="card-title mb-4 fw-bold">Lista de favoritos:</h5>

        {favoritos.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-borderless">
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Preço</th>
                  <th>Desconto</th>
                  <th>Opções</th>
                </tr>
              </thead>
              <tbody>
                {favoritos.map((item) => (
                  <ItemFavorito
                    key={item.id}
                    itemFavorito={item}
                    removerFavorito={removeFavorito}
                  />
                ))}
              </tbody>
            </table>
          </div>
        ) : (isPending ? (
          <p>Carregando Favoritos</p>
        ) :(
          <p>Sua lista de favoritos está vazia.</p>
        ))}
      </div>
      <div className="card-footer d-flex flex-column">
        <small className="text-muted">
          Quantidade de produtos: {favoritos.length}
        </small>

        <small className="text-muted">
          Valor total: R$ {totalFavoritos()}
        </small>
      </div>
    </div>
  );
}
