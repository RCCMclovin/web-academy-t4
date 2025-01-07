"use client";

import Link from "next/link";
import { useAuthContext } from "../AuthProvider/AuthProvider";

export default function Navbar() {
  const { user, logout } = useAuthContext();
  return (
    <nav className="navbar navbar-expand-md bg-light border-bottom border-body sticky-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Loja WA
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Abrir menu"
        >
          <span className="navbar-toggler-icon"> 
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav me-auto mb-2 mb-md-0 ">
            <li className="nav-item">
              <Link className="nav-link" href="/">
                Início
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/favoritos">
                Lista de Favoritos
              </Link>
            </li>
          </ul>

          
            {user ? (
              <div className="d-flex align-content-center align-items-baseline">
                <div className="p-2"><p>{user}</p></div>
                <button type="button" className="btn btn-secondary"
                onClick={() => logout()}>
                Sair
              </button>
              </div>
            ): (
              <Link className="nav-link " href="/login">
              <button type="button" className="btn btn-secondary">
                Login
              </button>
            </Link>
            )}
        </div>
      </div>
    </nav>
  );
}
