import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import BootstrapClient from "./components/BootstrapClient";
import Navbar from "./components/Navbar/Navbar";
import FavoritosProvider from "./components/FavoritosProvider/FavoritosProvider";
import { ReactQueryClientProvider } from "./components/ReactQueryClient";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./components/AuthProvider/AuthProvider";

export const metadata: Metadata = {
  title: "WA Loja",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <ReactQueryClientProvider>
        <AuthProvider>
        <FavoritosProvider>
          <Navbar />
          <ToastContainer />
          {children}
          <BootstrapClient />
        </FavoritosProvider>
        </AuthProvider>
      </ReactQueryClientProvider>
      </body>
    </html>
  );
}
