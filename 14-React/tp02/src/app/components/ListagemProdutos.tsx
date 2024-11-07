"use client";
import useListaProdutos from "../hooks/useListaProdutos";
import Produto from "../types/produto";
import CardProduto from "./CardProduto";
import AllProductsProp from "./props/AllProductsProp";


  
export default function ListagemProdutos(props: AllProductsProp) {
  const { produtos, isPending, isError } = useListaProdutos();
  if (isPending) return <h5>Carregando...</h5>;
  if (isError) return <h5>Ocorreu um erro ao carregar os produtos. :(</h5>;
  if (!produtos) return<h5>Não há produtos disponíveis no momento.</h5>;
  
  const listarProdutos = (): JSX.Element[] =>{
    const cards: JSX.Element[] = [];
    produtos.forEach((produto: Produto) => {
      if (produto.fotos) {
        cards.push(
          <CardProduto itensCarrinho={props.itensCarrinho}
            setItensCarrinho={props.setItensCarrinho}
            img={{ src: produto.fotos[0].src, alt: produto.fotos[0].titulo }}
            produto={produto}
            setValorTotal={props.setValorTotal}
            setQuantidadeItens={props.setQuantidadeItens}
            sum={props.sum}
            total={props.total}
            adicionarAoCarrinho={props.adicionarAoCarrinho}
          ></CardProduto>
        );
      } else {
        cards.push(
          <CardProduto  itensCarrinho={props.itensCarrinho}
            setItensCarrinho={props.setItensCarrinho}
            img={{ src: "/placeholder.png", alt: "imagem placeholder" }}
            produto={produto}
            setValorTotal={props.setValorTotal}
            setQuantidadeItens={props.setQuantidadeItens}
            sum={props.sum}
            total={props.total}
            adicionarAoCarrinho={props.adicionarAoCarrinho}
          ></CardProduto>
        );
      }
    });
    return cards;
  }

  return (
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">            
        {listarProdutos()}
      </div>
  );
}