import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mockProdutos } from "@/app/mocks/produtos";
import {
  FavoritosProvider,
    useProdutosFavoritos,
} from "../../../State/FavoritosProvider";
import { calculaValorComPorcentagemDeDesconto } from "@/app/helpers";
import ItemFavorito from "../ItemFavorito";

  
describe("ItemFavorito:", () => {
    it("Deve renderizar corretamente as informações do produtio favorito:", () => {
        const produtoMockado = mockProdutos[0];
        const { nome, fotos, desconto, descricao } = produtoMockado;

        const precoComDesconto = calculaValorComPorcentagemDeDesconto(
            Number(produtoMockado.preco),
            produtoMockado.desconto
        ).toFixed(2);

        render(
            <FavoritosProvider>
                <ItemFavorito key={produtoMockado.id} itemFavorito={produtoMockado} setFavoritos={() => { }} />
            </FavoritosProvider>
        );

        
        expect(screen.getByAltText(fotos[0].titulo)).toBeInTheDocument();
        expect(screen.getByText(nome)).toBeInTheDocument();
        expect(screen.getByText(descricao)).toBeInTheDocument();
        expect(screen.getByText(`R$ ${precoComDesconto}`)).toBeInTheDocument();
        expect(screen.getByText(`${desconto}%`)).toBeInTheDocument();
        expect(screen.getByRole("button")).toBeInTheDocument();
    });
    it("Clicar em remover deve remover o favorito", async () => {
        const setFavoritos = jest.fn();
    
        const produtoMockado = mockProdutos[0];

        render(
            <FavoritosProvider>
                <ItemFavorito key={produtoMockado.id} itemFavorito={produtoMockado} setFavoritos={setFavoritos} />
            </FavoritosProvider>
        );

        const botao = screen.getByRole("button", {
            name: /Remover/i,
          });
      
        await userEvent.click(botao);
        
        expect(setFavoritos).toHaveBeenCalledTimes(1);
    });
});