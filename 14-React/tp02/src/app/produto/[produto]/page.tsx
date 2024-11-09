"use client"
import useGetProdutos from "@/app/hooks/useGetProduto";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function ProductPage() {
    const { produto } = useParams();
    const { isPending, dadosProduto, isError } = useGetProdutos(produto as string);
    if (isPending) return <h5 className="card-title mb-4 fw-bold">Carregando...</h5>;
    if (isError) return <h5>Ocorreu um erro ao carregar os produtos. :(</h5>;
    if (!dadosProduto) return <h5>Produto não existe.</h5>;

    const generateImages = (): JSX.Element[] => {
        const images: JSX.Element[] = [];
        if (dadosProduto.fotos) {
            for (let i = 0; i < dadosProduto.fotos.length; i++) {
                images.push(<Image key={""} src={dadosProduto.fotos[i].src} alt={dadosProduto.fotos[i].titulo} width={300} height={320} />);
            }
        }
        else images.push(<Image key={""} src={"/placeholder.png"} alt={"imagem placeholder"} width={300} height={320} />);
        return images;
    }
    
    return (
        <main>
            <div className="container p-5">
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title mb-4 fw-light">Detalhes do produto</h5>
            <h5 className="card-title mb-4 fw-bold">{dadosProduto.nome}</h5>

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3 mb-3">
              {generateImages()}
            </div>

            <p className="card-text fw-medium">
              Valor: R${Number(dadosProduto.preco).toFixed(2)}
            </p>
                        <p className="card-text fw-medium">Descrição: {dadosProduto.descricao}</p>
            <p className="card-text fw-medium">Anunciado por: {dadosProduto.usuario_id}</p>

          </div>
        </div>
      </div>
        </main>
    );
}