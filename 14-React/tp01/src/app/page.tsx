"use client";
import React from "react";
import ResumoCarrinho from "./components/ResumoCarrinho";
import ListagemProdutos from "./components/ListagemProdutos";
import { mockProdutos } from "./mocks/produtos";
import { mockItensCarrinho } from "./mocks/itensCarrinho";
import Carrinho from "./types/carrinho";
import ItemCarrinho from "./types/itemCarrinho";
import Produto from "./types/produto";

const sum = (arr: ItemCarrinho[]): number =>{
  let s: number = 0;
  arr.forEach((item) => { s += item.quantidade });
  return s;
}

const total = (carrinho: ItemCarrinho[]) =>{
  let s: number = 0;
  for (let i = 0; i < carrinho.length; i++){
    s += Number(carrinho[i].preco) * carrinho[i].quantidade;
  }
  return s;
}

export default function ProdutosPage() {
  const [itensCarrinho, setItensCarrinho] = React.useState<Carrinho>({ produtos: mockItensCarrinho });
  const [valorTotal, setValorTotal] = React.useState<number>(total(itensCarrinho.produtos));
  const [quantidadeItens, setQuantidadeItens] = React.useState<number>(sum(itensCarrinho.produtos));
  const adicionarAoCarrinho = (produto:Produto) =>{
    let atualizado: boolean = false;
    itensCarrinho.produtos.forEach((p) => {
        if (!atualizado && p.id === produto.id) {
          p.quantidade += 1;
          atualizado = true;
        }
    });
    if (!atualizado) {
      itensCarrinho.produtos.push({ ...produto, quantidade: 1 });
    }
    setItensCarrinho(itensCarrinho);
    setQuantidadeItens(sum(itensCarrinho.produtos));
    setValorTotal(total(itensCarrinho.produtos))
  }

  return (
    <>
      <main>
        <div className="container p-5">
          <ResumoCarrinho
            valorTotal={valorTotal}
            quantidadeItens={quantidadeItens}>  
          </ResumoCarrinho>

          <h5 className="mb-3">Produtos disponíveis:</h5>

          <ListagemProdutos produtos={mockProdutos}
            itensCarrinho={itensCarrinho}
            setItensCarrinho={setItensCarrinho}
            setValorTotal={setValorTotal}
            setQuantidadeItens={setQuantidadeItens}
            sum={sum}
            total={total}
            adicionarAoCarrinho={adicionarAoCarrinho}
          ></ListagemProdutos>

          
        </div>
      </main>
    </>
  );
}