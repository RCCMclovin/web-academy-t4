"use client";
import React from "react";
import ListagemCarrinho from "../components/ListagemCarrinho";
import ResumoCarrinho from "../components/ResumoCarrinho";
import { mockItensCarrinho } from "../mocks/itensCarrinho";
import Carrinho from "../types/carrinho";
import ItemCarrinho from "../types/itemCarrinho";

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

export default function CarrinhoPage() {
  const [itensCarrinho, setItensCarrinho] = React.useState<Carrinho>({ produtos: mockItensCarrinho });
  const [valorTotal, setValorTotal] = React.useState<number>(total(itensCarrinho.produtos));
  const [quantidadeItens, setQuantidadeItens] = React.useState<number>(sum(itensCarrinho.produtos));
  const removerItemDoCarrinho = (id: string) => {
    setItensCarrinho((carrinho) => {
        carrinho.produtos = carrinho.produtos.filter((prod) => prod.id != id);
        setQuantidadeItens(sum(carrinho.produtos));
        setValorTotal(total(carrinho.produtos));
        return carrinho;
    })
  }

  return (
    <>
      <main>
        <div  className="container p-5">
        <ListagemCarrinho 
            carrinho={itensCarrinho}
            setItensCarrinho={setItensCarrinho}
            setValorTotal={setValorTotal}
            setQuantidadeItens={setQuantidadeItens}
            sum={sum}
            total={total}
            removerItemDoCarrinho={removerItemDoCarrinho}
          ></ListagemCarrinho>

          <ResumoCarrinho
            valorTotal={valorTotal}
            quantidadeItens={quantidadeItens}>  
          </ResumoCarrinho>
        </div>
      </main>
    </>
  );
}