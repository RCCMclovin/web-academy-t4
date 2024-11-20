import { screen, render } from "@testing-library/react";
import { mockProdutos } from "@/app/mocks/produtos";
import {
  FavoritosProvider,
    useProdutosFavoritos,
    useValorTotalFavoritos,
} from "../../../State/FavoritosProvider";
import { calculaValorComPorcentagemDeDesconto } from "@/app/helpers";
import ListagemFavoritos from "../ListagemFavoritos";

jest.mock("../../../State/FavoritosProvider", () => ({
    ...jest.requireActual("../../../State/FavoritosProvider"),
    useProdutosFavoritos: jest.fn(),
    useValorTotalFavoritos: jest.fn(),
}));

describe("ListagemFavoritos:", () => {
    it("Deve renderizar a lista vazia:", () => {
        const useProdutosFavoritosMock = useProdutosFavoritos as jest.Mock;
        useProdutosFavoritosMock.mockReturnValue([]);

        const useValorTotalFavoritosMock = useValorTotalFavoritos as jest.Mock;
        useValorTotalFavoritosMock.mockReturnValue(0);

        render(
            <FavoritosProvider>
                <ListagemFavoritos />
            </FavoritosProvider>
        );

        expect(screen.getByText("Sua lista de favoritos está vazia.")).toBeInTheDocument();
        expect(screen.getByText(`Quantidade de produtos: ${0}`)).toBeInTheDocument();
        expect(screen.getByText(`Valor total: R$ ${0}`)).toBeInTheDocument();
    });

    it("Deve renderizar a tabela com um elemento:", () => {
        const produtoMockado = mockProdutos[0];

        const precoComDesconto = calculaValorComPorcentagemDeDesconto(
            Number(produtoMockado.preco),
            produtoMockado.desconto
        ).toFixed(2);

        const useProdutosFavoritosMock = useProdutosFavoritos as jest.Mock;
        useProdutosFavoritosMock.mockReturnValue([produtoMockado]);

        const useValorTotalFavoritosMock = useValorTotalFavoritos as jest.Mock;
        useValorTotalFavoritosMock.mockReturnValue(precoComDesconto);

        render(
            <FavoritosProvider>
                <ListagemFavoritos />
            </FavoritosProvider>
        );

        expect(screen.getByRole("table")).toBeInTheDocument();
        expect(screen.getByText(produtoMockado.nome)).toBeInTheDocument();
        expect(screen.getByText(`Quantidade de produtos: ${1}`)).toBeInTheDocument();
        expect(screen.getByText(`Valor total: R$ ${precoComDesconto}`)).toBeInTheDocument();
    });

    it("Deve renderizar a tabela com multiplos elementos:", () => {
        const produtosMockados = mockProdutos.slice(0, 3);

        const precoComDesconto = (prod: Produto) => calculaValorComPorcentagemDeDesconto(
            Number(prod.preco),
            prod.desconto
        );

        const sumPrecos = () => {
            let s = 0;
            produtosMockados.forEach((prod) => {
                s += precoComDesconto(prod);
            });
            return s.toFixed(2);
        };

        const useProdutosFavoritosMock = useProdutosFavoritos as jest.Mock;
        useProdutosFavoritosMock.mockReturnValue(produtosMockados);

        const useValorTotalFavoritosMock = useValorTotalFavoritos as jest.Mock;
        useValorTotalFavoritosMock.mockReturnValue(sumPrecos());

        render(
            <FavoritosProvider>
                <ListagemFavoritos />
            </FavoritosProvider>
        );

        expect(screen.getByRole("table")).toBeInTheDocument();
        produtosMockados.forEach((prod) => expect(screen.getByText(prod.nome)).toBeInTheDocument());
        expect(screen.getByText(`Quantidade de produtos: ${produtosMockados.length}`)).toBeInTheDocument();
        expect(screen.getByText(`Valor total: R$ ${sumPrecos()}`)).toBeInTheDocument();
    })
});