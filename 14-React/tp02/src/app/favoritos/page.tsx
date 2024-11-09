"use client";
import ListagemFavoritos from "../components/ListagemFavoritos"
import useListaFavoritos from "../hooks/useListaFavoritos"

export default function FavoritosPage() {
    const { produtos, isPending, isError, refetchFavoritos } = useListaFavoritos()
    if (isPending) return <h5>Carregando...</h5>;
    if (isError) return <h5>Ocorreu um erro ao carregar os produtos.</h5>;
    if (!produtos) return <h5>Você ainda não tem favoritos.</h5>;
    
    return (
        <main>
            <div className="container p-5">
                <ListagemFavoritos favoritos={produtos || []}
                    refreshFavoritos={refetchFavoritos}>
                </ListagemFavoritos>
            </div>
        </main>
    )
}