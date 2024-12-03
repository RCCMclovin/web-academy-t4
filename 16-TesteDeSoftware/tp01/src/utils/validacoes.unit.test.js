const { primeiroNome, verificarDisponibilidadeEstoque, calcularPrecoTotal } = require("./validacoes");

describe("Testando todas as funções em validacoes.js:", () =>{
    describe("Testando primeiroNome:", () => {
        //Definindo um vetor de testes a serem feitos para evitar repetição de código
        const testesPrimeiroNome = [
            { descricao: "Nome normal", nomeCompleto: "Rafael Castilho Carvalho", nome: "Rafael"},
            { descricao: "Inicia com Espaço", nomeCompleto: " Rafael Castilho Carvalho", nome: "Rafael" },
            { descricao: "Multiplos espaços entre nomes", nomeCompleto: "Rafael      Castilho      Carvalho", nome: "Rafael" },
            { descricao: "Nome sem espaço", nomeCompleto: "RafaelCastilhoCarvalho", nome: "RafaelCastilhoCarvalho" },
            { descricao: "Apenas espaços", nomeCompleto: "      ", nome: "" },
            { descricao: "Nome vazio", nomeCompleto: "", nome: "" }
        ];

        testesPrimeiroNome.forEach((nome) => {
            test(nome.descricao, () => { expect(primeiroNome(nome.nomeCompleto)).toBe(nome.nome); });
        });
    });

    describe("Testando verificarDisponibilidadeEstoque:", () => {
        //Definindo um vetor de testes a serem feitos para evitar repetição de código
        const testesVerificarDisponibilidadeEstoque = [
            { descricao: "Quantidade menor do que estoque", produto: "laptop", quantidade: 5, result: true },
            { descricao: "Quantidade igual ao estoque", produto: "smartphone", quantidade: 20, result: true },
            { descricao: "Quantidade maior do que estoque", produto: "headphone", quantidade: 10, result: false },
            { descricao: "Produto não existe no estoque", produto: "head", quantidade: 10, result: false },
            { descricao: "Quantidade 0", produto: "tablet", quantidade: 0, result: true },
            { descricao: "Produto sem estoque", produto: "livro", quantidade: 1, result: false}
        ];

        testesVerificarDisponibilidadeEstoque.forEach((produto) => {
            test(produto.descricao, () => { expect(verificarDisponibilidadeEstoque(produto.produto, produto.quantidade)).toBe(produto.result); });
        });
    });

    describe("Testando calcularPrecoTotal:", () => {
        //Definindo um vetor de testes a serem feitos para evitar repetição de código
        const testesCalcularPrecoTotal = [
            {
                descricao: "Carrinho exemplo",
                produtos: [
                    { nome: 'Produto 1', preco: 10, quantidade: 2 },
                    { nome: 'Produto 2', preco: 15, quantidade: 2 },
                    { nome: 'Produto 3', preco: 20, quantidade: 1 }
                ], total: 70
            }, {
                descricao: "Carrinho com quantidade alta",
                produtos: [
                    { nome: 'Produto 1', preco: 10, quantidade: 1 },
                    { nome: 'Produto 2', preco: 15, quantidade: 20 },
                    { nome: 'Produto 3', preco: 20, quantidade: 1 }
                ], total: 330
            }, {
                descricao: "Quantidades 0",
                produtos: [
                    { nome: 'Produto 1', preco: 10, quantidade: 0 },
                    { nome: 'Produto 2', preco: 15, quantidade: 0 },
                    { nome: 'Produto 3', preco: 20, quantidade: 0 }
                ], total: 0
            }, {
                descricao: "Carrinho vazio",
                produtos: [],
                total: 0
            }
        ];
        
        testesCalcularPrecoTotal.forEach((carrinho) => {
            test(carrinho.descricao, () => expect(calcularPrecoTotal(carrinho.produtos)).toBe(carrinho.total));
        });
    });

});