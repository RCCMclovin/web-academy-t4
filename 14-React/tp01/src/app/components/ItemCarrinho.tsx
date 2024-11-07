"use client";
import ICartProduto from "./props/ICartProduto";

export default function ItemCarrinho(props: ICartProduto) {
    return (
        <tr key="1">
            <td>{props.produto.nome}</td>
            <td>R$ {Number(props.produto.preco).toFixed(2)}</td>
            <td>{props.quantidade}</td>

            <td>R$ {(Number(props.produto.preco) * props.quantidade).toFixed(2)}</td>
            <td>
                <button className="btn btn-danger btn-sm"
                onClick={() => props.setItensCarrinho((carrinho) => {
                    carrinho.produtos = carrinho.produtos.filter((prod) => prod.id != props.produto.id);
                    props.setQuantidadeItens(props.sum(carrinho.produtos));
                    props.setValorTotal(props.total(carrinho.produtos));
                    return carrinho;
                })}>
                    Remover
                </button>
            </td>
        </tr>
    );
}