"use client";
import ICartProduto from "./props/ICartProduto";

export default function ItemCarrinho(props: ICartProduto) {
    return (
        <tr key="1">
            <td>{props.produto.nome}</td>
            <td>R$ {Number(props.produto.preco).toFixed(2)}</td>
            <td>{props.produto.quantidade}</td>

            <td>R$ {(Number(props.produto.preco) * props.produto.quantidade).toFixed(2)}</td>
            <td>
                <button className="btn btn-danger btn-sm"
                onClick={() => props.removerItemDoCarrinho(props.produto.id)}>
                    Remover
                </button>
            </td>
        </tr>
    );
}