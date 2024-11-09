"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent } from "react";

export default function Cadastro() {
    const [errorPreenchimentoEmail, setErrorPreenchimentoEmail] = React.useState<null | string>(null);
    const [errorPreenchimentoVEmail, setErrorPreenchimentoVEmail] = React.useState<null | string>(null);
    const [errorPreenchimentoNome, setErrorPreenchimentoNome] = React.useState<null | string>(null);
    const [errorPreenchimentoPass, setErrorPreenchimentoPass] = React.useState<null | string>(null);
    const [errorEmail, setErrorEmail] = React.useState<null | string>(null);
    const [email, setEmail] = React.useState<string>("");
    const [pass, setPass] = React.useState<string>("");
    const [vEmail, setVEmail] = React.useState<string>("");
    const [nome, setNome] = React.useState<string>("");
    const router = useRouter();

    const validade = (value: string, setError: React.Dispatch<React.SetStateAction<null | string>>): boolean => {
        if (value.length === 0) {
            setError("Preencha este campo.")
            return false;
        } else {
            setError(null);
            return true;
        }
    }

    const checkEmail = (email1: string, email2: string): boolean => {
        if (email1 === email2) {
            setErrorEmail(null);
            return true;
        } else {
            setErrorEmail("Emails devem ser iguais");
            return false;
        }
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        router.push("/");
    }

  return (
    <main>
      <div className="container-fluid d-flex min-vh-100">
        <div className="row min-vw-100">
          <div className="col-12 col-md-4 bg-light d-flex justify-content-center align-items-center">
            <h2>Bem vindo à WA Loja!</h2>
          </div>
          <div className="col-12 col-md-8 d-flex justify-content-center align-items-center">
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="mb-3">
                <label htmlFor="nome" className="form-label">
                  Nome
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="nome"
                  aria-describedby="nome"
                  value={nome}
                  onChange={(event) => setNome(event.target.value)}                
                  onBlur={({target}) => validade(target.value, setErrorPreenchimentoNome)}  
                  required
                />{errorPreenchimentoNome && <p>{errorPreenchimentoNome}</p>}
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control form-control-lg"
                  id="email"
                  aria-describedby="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}                
                  onBlur={({target}) => validade(target.value, setErrorPreenchimentoEmail)}  
                  required
                />{errorPreenchimentoEmail && <p>{errorPreenchimentoEmail}</p>}
              </div>

              <div className="mb-3">
                <label htmlFor="confirmarEmail" className="form-label">
                  Confirmar email
                </label>
                <input
                  type="email"
                  className="form-control form-control-lg"
                  id="confirmarEmail"
                  aria-describedby="confirmarEmail"
                  value={vEmail}
                  onChange={(event) => setVEmail(event.target.value)}                
                  onBlur={({ target }) => validade(target.value, setErrorPreenchimentoVEmail) || checkEmail(email, target.value)}
                  required
                />{(errorPreenchimentoVEmail || errorEmail) && <p>{(errorPreenchimentoVEmail || errorEmail)}</p>}
              </div>
              <div className="mb-3">
                <label htmlFor="senha" className="form-label">
                  Senha
                </label>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  id="senha"
                  value={pass}
                  onChange={(event) => setPass(event.target.value)}                
                  onBlur={({target}) => validade(target.value, setErrorPreenchimentoPass)}  
                  required
                />{errorPreenchimentoPass && <p>{errorPreenchimentoPass}</p>}
              </div>

              <div className="d-grid col-12">
                <button type="submit" className="btn btn-success">
                  Confirmar cadastro
                </button>
              </div>

              <div className="text-center mt-3">
                <Link href="/login" className="btn btn-link">
                  já possuo cadastro
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}