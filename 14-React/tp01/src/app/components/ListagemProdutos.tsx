"use client";
import CardProduto from "./CardProduto";
import AllProductsProp from "./props/AllProductsProp";


  
export default function ListagemProdutos(props: AllProductsProp) {
  const listarProdutos = (props: AllProductsProp): JSX.Element[] =>{
    const cards: JSX.Element[] = [];
    props.produtos.forEach((produto) => {
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
          ></CardProduto>
        );
      }
    });
    return cards;
  }

  return (
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">            
        {listarProdutos(props)}
      </div>
  );
}