"use client";
import { toast } from "react-toastify";
import useAddFavorito from "../hooks/useAddFavorito";
import ICardProdutoProp from "./props/ICardProdutoProp";
import Image from "next/image";
import { useRouter } from "next/navigation";


export default function CardProduto(props: ICardProdutoProp) {

    const { isPending, addFavorito } = useAddFavorito(
        () => toast.success("Produto favoritado com sucesso!"),
        () => toast.error("Algo deu errado.")
    );

    const router = useRouter();
    const verDetalhesProduto = (nomeProduto: string) => { router.push(`/produto/${nomeProduto}`) }
    

    return (
        <div className="card shadow-sm h-100">
            <div className="col">
                <Image
                    src={props.produto.fotos ? props.produto.fotos[0].src : "/placeholder.png"}
                    className="card-img-top"
                    alt={props.produto.fotos ? props.produto.fotos[0].titulo : "Imagem placeholder"}
                    width={300}
                    height={320}
                    onClick={() => verDetalhesProduto(props.produto.nome)}
                />

                <div className="card-body bg-light">
                    <h5 className="card-title">{props.produto.nome}</h5>
                    <p className="card-text text-secondary">R$ {props.produto.preco}</p>
                    <button className="btn btn-dark d-block w-100" type="button"
                    onClick={() => props.adicionarAoCarrinho(props.produto)}>
                        Adicionar no carrinho
                    </button>
                    <button className="btn btn-light d-block w-100 mt-2" type="button"
                        onClick={() => addFavorito(props.produto)}>
                        {isPending ? "Favoritando..." : "Favoritar"}
                    </button>
                </div>
            </div>
        </div>
    );
}