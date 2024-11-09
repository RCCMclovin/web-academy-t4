"use client";

import { toast } from "react-toastify";
import useRemoveFavorito from "../hooks/useRemoveFavorito";
import IProdutoFavoritoProp from "./props/IProdutoFavoritoProp";

export default function ItemFavorito(props: IProdutoFavoritoProp) {

    const { isPending, removerFavorito } = useRemoveFavorito(
        () => {
            toast.success("Produto removido com sucesso.");
            props.refreshFavoritos();
        },
        () => toast.error("Algo deu errado.")
    )
    return (
        <tr key="1">
            <td>{props.produto.nome}</td>
            <td>R$ {Number(props.produto.preco).toFixed(2)}</td>
            
            <td>
                <button className="btn btn-danger btn-sm"
                onClick={() => removerFavorito(props.produto)}>
                    {isPending ? "Carregando..." : "Remover"}
                </button>
            </td>
        </tr>
    );
}