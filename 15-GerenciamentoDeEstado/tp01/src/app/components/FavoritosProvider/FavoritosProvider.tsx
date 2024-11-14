"use client";
import { createContext, useContext, useState } from "react";

interface IFavoritosContext{
    favoritos: Produto[];
    setFavoritos: React.Dispatch<React.SetStateAction<Produto[]>>;
}

interface FavoritosProviderProps{
    children: React.ReactNode;
}
  
export const FavoritosContext = createContext<IFavoritosContext>({
    favoritos: [],
    setFavoritos: () => { },
});

const FavoritosProvider = ({ children }: FavoritosProviderProps) => {
  const [favoritos, setFavoritos] = useState<Produto[]>([]);

  const value = { favoritos, setFavoritos };

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

export default FavoritosProvider;