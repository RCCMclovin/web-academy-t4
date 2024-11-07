"use client";
import ICardProdutoProp from "./props/ICardProdutoProp";
import Image from "next/image";


export default function CardProduto(props: ICardProdutoProp) {
    const inserirProduto = () =>{
        let atualizado: boolean = false;
        props.itensCarrinho.produtos.forEach((p) => {
            if (!atualizado && p.id === props.produto.id) {
                p.quantidade += 1;
                atualizado = true;
            }
        });
        if (!atualizado) {
            props.itensCarrinho.produtos.push({ ...props.produto, quantidade: 1 });
        }
        props.setItensCarrinho(props.itensCarrinho);
        props.setQuantidadeItens(props.sum(props.itensCarrinho.produtos));
        props.setValorTotal(props.total(props.itensCarrinho.produtos))
    }

    return (
        <div className="card shadow-sm h-100">
            <div className="col">
                <Image
                    src={props.img.src}
                    className="card-img-top"
                    alt={props.img.alt}
                    width={300}
                    height={320}
                />

                <div className="card-body bg-light">
                    <h5 className="card-title">{props.produto.nome}</h5>
                    <p className="card-text text-secondary">R$ {props.produto.preco}</p>
                    <button className="btn btn-dark d-block w-100" type="button"
                    onClick={() => inserirProduto()}>
                        Adicionar no carrinho
                    </button>
                </div>
            </div>
        </div>
    );
}