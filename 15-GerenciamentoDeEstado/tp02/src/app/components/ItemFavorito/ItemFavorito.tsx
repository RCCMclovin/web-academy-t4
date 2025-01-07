import { calculaValorComPorcentagemDeDesconto } from "@/app/helpers";
import Image from "next/image";
import { useFavoritosContext } from "../FavoritosProvider/FavoritosProvider";
import { useEffect, useState } from "react";

interface IItemFavoritoProps {
  itemFavorito: Produto;
  removerFavorito: (id: string) => void;
}

export default function ItemFavorito({
  itemFavorito,
  removerFavorito,
}: IItemFavoritoProps) {
  const { isRemoveFavoritoPending } = useFavoritosContext();
  const [ removedFavorito, setRemovedFavorito ] = useState<string | null>(null);
  const desfavoritar = () => {
    removerFavorito(itemFavorito.id);
    setRemovedFavorito(itemFavorito.id);
  };

  useEffect(() => { 
    if(!isRemoveFavoritoPending) setRemovedFavorito(null);
  }, [isRemoveFavoritoPending, setRemovedFavorito])

  return (
    <tr key={itemFavorito.id}>
      <td className="d-flex flex-row">
        <Image
          className="rounded"
          src={itemFavorito.fotos[0].src}
          alt={itemFavorito.fotos[0].titulo}
          width={50}
          height={50}
        />
        <div className="d-flex flex-column ms-2">
          <span className="">{itemFavorito.nome} 
          <small className="text-muted">{itemFavorito.descricao}</small>
        </div>
      </td>

      <td>
        R${" "}
        {calculaValorComPorcentagemDeDesconto(
          Number(itemFavorito.preco),
          itemFavorito.desconto
        ).toFixed(2)}
      </td>

      <td>{itemFavorito.desconto}%</td>

      <td>
        <button
          onClick={() => desfavoritar()}
          className={(isRemoveFavoritoPending && removedFavorito === itemFavorito.id)
            ? "btn btn-danger btn-sm"
            : "btn btn-outline-danger btn-sm"
          }
          disabled={(isRemoveFavoritoPending && removedFavorito === itemFavorito.id)}
      >
          {(isRemoveFavoritoPending && removedFavorito === itemFavorito.id)
            ? "Removendo"
            : " Remover "}
      </button>
        
        
      </td>
    </tr>
  );
}
