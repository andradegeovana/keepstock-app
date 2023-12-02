'use client'
import { useState, useContext } from "react";
import axios from "axios";
import { instance } from "./services/api";
import { useRouter } from "next/navigation";
import { AuthContext } from "./contexts/AuthContext";


export default function Home() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const { id, isAuth, signIn } = useContext(AuthContext)  
  const router = useRouter();

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await signIn(email, senha);
    } catch (error) {
      console.error("Error during login", error);
      setError(`Erro ao realizar o login ${error}`);
    }
  };

  return (
    <div className="bg-[#3F8EFC] flex h-screen items-center justify-center">
    <div className="bg-white rounded-3xl h-[550px] w-[550px] p-8 flex flex-col items-center justify-center">
      <div className="logo mb-6">
        <h1 className="text-3xl flex font-bold">KeepStock <img src="./box.svg" alt="" /></h1>
      </div>
      <form onSubmit={handleLogin} className="flex flex-col items-center">
        <div className="m-4">
          <label htmlFor="email" className="text-lg p-2">
            Usuário
          </label>
          <input
            id="email"
            type="text"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="m-4">
          <label htmlFor="senha" className="text-lg p-2">
            Senha
          </label>
          <input
            id="senha"
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="input-field"
          />
        </div>

        <div className="mb-4">
        <button
    type="submit"
    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
  >
    Entrar
  </button>
        </div>

        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  </div>
  );
}
