"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent } from "react";

export default function Login() {
    const [errorPass, setErrorPass] = React.useState<null | string>(null);
    const [errorEmail, setErrorEmail] = React.useState<null | string>(null);
    const [email, setEmail] = React.useState<string>("");
    const [pass, setPass] = React.useState<string>("");
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
          </div>{" "}
          <div className="col-12 col-md-8 d-flex justify-content-center align-items-center">
            <form onSubmit={(e) => handleSubmit(e)}>
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
                  onBlur={({target}) => validade(target.value, setErrorEmail)}                
                  required
                />
                {errorEmail && <p>{errorEmail}</p>}
              </div>
              <div className="mb-3">
                <label htmlFor="senha" className="form-label">
                  Senha
                </label>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  id="senha"value={pass}
                  onChange={(event) => setPass(event.target.value)}                
                  onBlur={({target}) => validade(target.value, setErrorPass)}  
                  required
                />
                {errorPass && <p>{errorPass}</p>}
              </div>

              <div className="d-grid col-12">
                <button type="submit" className="btn btn-success">
                  Entrar
                </button>
              </div>

              <div className="text-center mt-3">
                <Link href="/cadastro" className="btn btn-link">
                  não tenho cadastro
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}