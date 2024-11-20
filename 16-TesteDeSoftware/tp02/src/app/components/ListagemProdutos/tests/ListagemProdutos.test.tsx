import { screen, render } from "@testing-library/react";
import { mockProdutos } from "@/app/mocks/produtos";
import {
  FavoritosProvider,
} from "../../../State/FavoritosProvider";
import ListagemProdutos from "../ListagemProdutos";

describe("ListagemProdutos:", () => {
    it("Deve renderizar lista vazia:", () => {
        const produtosMockados: Produto[] = [];

        render(
            <FavoritosProvider>
                <ListagemProdutos produtos={produtosMockados} />
            </FavoritosProvider>
        );

        expect(screen.getByText("Produtos disponíveis:")).toBeInTheDocument();
        expect(screen.queryAllByRole("img")).toHaveLength(0);
    });

    it("Deve renderizar lista com um produto:", () => {
        const produtosMockados: Produto[] = [mockProdutos[0]];

        render(
            <FavoritosProvider>
                <ListagemProdutos produtos={produtosMockados} />
            </FavoritosProvider>
        );

        expect(screen.getByText("Produtos disponíveis:")).toBeInTheDocument();
        expect(screen.queryAllByRole("img")).toHaveLength(produtosMockados.length);
    });

    it("Deve renderizar lista com múltiplos produtos:", () => {
        const produtosMockados: Produto[] = mockProdutos;

        render(
            <FavoritosProvider>
                <ListagemProdutos produtos={produtosMockados} />
            </FavoritosProvider>
        );

        expect(screen.getByText("Produtos disponíveis:")).toBeInTheDocument();
        expect(screen.queryAllByRole("img")).toHaveLength(produtosMockados.length);
    });
})