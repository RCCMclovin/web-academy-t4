import { queryAllByRole, render, screen } from "@testing-library/react";
import Navbar from "../Navbar";

describe("Navbar:", () => {
    it("Deve renderizar a navbar e todos os links:", () => {
        render(<Navbar />);

        expect(screen.getByRole("navigation")).toBeInTheDocument();
        //São 4 links, então a query deve rotornar um vetor com tamanho 3 (número de links na navbar)
        expect(screen.queryAllByRole("link")).toHaveLength(3);
    });
    // Não testei a navbar em outros tamanhos, olhe agora outro componente
});