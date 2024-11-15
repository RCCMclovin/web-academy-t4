"use client";
import { calculaValorComPorcentagemDeDesconto } from "@/app/helpers";
import { createContext, useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addProdutoFavorito, getListaFavoritos, removeProdutoFavorito } from "@/app/services/favoritos";
import { toast } from "react-toastify";

interface IFavoritosContext{
    favoritos: Produto[];
    setFavoritos: React.Dispatch<React.SetStateAction<Produto[]>>;
    isAddFavoritoPending: boolean;
    isRemoveFavoritoPending: boolean;
    isFavorito: (id: string) => boolean;
    removeFavorito: (id: string) => void;
    addFavorito: (produto: Produto) => void;
    totalFavoritos: () => number;
}

interface FavoritosProviderProps{
    children: React.ReactNode;
}
  
export const FavoritosContext = createContext<IFavoritosContext>({
    favoritos: [],
    setFavoritos: () => { },
    isAddFavoritoPending: false,
    isRemoveFavoritoPending: false,
    isFavorito: (id: string) => false,
    removeFavorito: (id: string) => { },
    addFavorito: (produto: Produto) => { },
    totalFavoritos: () => 0,
});

const FavoritosProvider = ({ children }: FavoritosProviderProps) => {
    const [favoritos, setFavoritos] = useState<Produto[]>([]);
    const { produtos, refetchFavoritos} = useFavoritos();
    const { adicionaFavorito, isAddFavoritoPending } = useAddFavorito(
        () => {
            toast.success("Produto favoritado com sucesso!");
            refetchFavoritos();
        },
        () => toast.error("Algo deu errado.")
    );
    const { removerFavorito, isRemoveFavoritoPending } = useRemoveFavorito(
        () => {
            toast.success("Produto removido com sucesso.");
            refetchFavoritos();
        },
        () => toast.error("Algo deu errado.")
    );

    useEffect(() => {
        setFavoritos(produtos);
    },[produtos])
    
    const isFavorito = (id: string): boolean => favoritos.some((produto) => produto.id === id);

    const removeFavorito = (id: string) => {
        removerFavorito(favoritos.filter((produto) => produto.id == id)[0]);
    }

    const addFavorito = (produto: Produto) => {
        if (!isFavorito(produto.id)) {
            adicionaFavorito(produto);
        }
    }

    const totalFavoritos = (): number => {
        let total = 0;
        favoritos.forEach((produto) => total += calculaValorComPorcentagemDeDesconto(Number(produto.preco), produto.desconto));
        return total;
    }
    
    const value = {
        favoritos,
        setFavoritos,
        isAddFavoritoPending,
        isRemoveFavoritoPending,
        isFavorito,
        removeFavorito,
        addFavorito,
        totalFavoritos
    };

    return (
        <FavoritosContext.Provider value={value}>
            {children}
        </FavoritosContext.Provider>
    )
}

export const useFavoritosContext = () => {
    const favoritosContext = useContext(FavoritosContext);
    
    return favoritosContext;
};

export const useFavoritos = () => {
    const { data, isPending, isError, refetch } = useQuery({
        queryKey: ["listaFavoritos"],
        queryFn: () => getListaFavoritos(),
    });
    
    return { produtos: data || [], refetchFavoritos: refetch, isPending, isError };
}

export const useAddFavorito =(
    onSuccess: () => void,
    onError: () => void
  ) => {
    const { mutate, isPending } = useMutation({
      mutationFn: (produto: Produto) => addProdutoFavorito(produto),
      onSuccess,
      onError,
    });
  
    return {
      adicionaFavorito: mutate,
      isAddFavoritoPending: isPending,
    };
}

export const useRemoveFavorito = (
    onSuccess: () => void,
    onError: () => void
  ) => {
    const { mutate, isPending } = useMutation({
      mutationFn: (produto: Produto) => removeProdutoFavorito(produto),
      onSuccess,
      onError,
    });
  
    return {
      removerFavorito: mutate,
      isRemoveFavoritoPending: isPending,
    };
}

export default FavoritosProvider;