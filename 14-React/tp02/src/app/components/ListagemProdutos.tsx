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
  
  const cardProduto = (produto: Produto): JSX.Element =>{
    return (
      <CardProduto 
        produto={produto}
        adicionarAoCarrinho={props.adicionarAoCarrinho}
      ></CardProduto>
    );
  }

  return (
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">            
        {produtos.map(cardProduto)}
      </div>
  );
}