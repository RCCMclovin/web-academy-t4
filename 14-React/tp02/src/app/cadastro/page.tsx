"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Cadastro = {
    nome: string;
    email: string;
    vEmail: string;
    senha: string;
}

export default function CadastroPage() {
    const { register, handleSubmit, formState: { errors }, getValues} = useForm<Cadastro>();
    const router = useRouter();
    const onSubmit: SubmitHandler<Cadastro> = (data) => {
        console.log(data);
        router.push("/");
    }
    

    const checkEmail = (email1: string, email2: string): boolean | string => {
        return (email1 === email2) || "Emails devem ser iguais";
    }

    

  return (
    <main>
      <div className="container-fluid d-flex min-vh-100">
        <div className="row min-vw-100">
          <div className="col-12 col-md-4 bg-light d-flex justify-content-center align-items-center">
            <h2>Bem vindo à WA Loja!</h2>
          </div>
          <div className="col-12 col-md-8 d-flex justify-content-center align-items-center">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label htmlFor="nome" className="form-label">
                  Nome
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="nome"
                  aria-describedby="nome"
                  {...register("nome", {required:true})}
                />{errors.nome?.type === "required" && <span className="text-danger">Preencha este campo</span>}
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
                  {...register("email", {required:true, pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+(\.[a-zA-Z]{2,5}$)+/,
                    message: 'Email inválido',
                  },})}
                />
                {errors.email?.type === "required" && <span className="text-danger">Preencha este campo</span>}
                {errors.email?.type === "pattern" && <span className="text-danger">{errors.email.message}</span>}              
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
                  {...register("vEmail", {required:true, validate: (value) => checkEmail(getValues().email, value)})}
                />
              {errors.vEmail?.type === "required" && <span className="text-danger">Preencha este campo</span>}
              {errors.vEmail?.type === "validate" && <span className="text-danger">{errors.vEmail.message}</span>}
              </div>
              <div className="mb-3">
                <label htmlFor="senha" className="form-label">
                  Senha
                </label>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  id="senha"
                  {...register("senha", {required: true, minLength: 6})}
                />
                {errors.senha?.type === "required" && <span className="text-danger">Preencha este campo</span>}
                {errors.senha?.type === "minLength" && <span className="text-danger">Ao menos 6 caracteres.</span>}
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