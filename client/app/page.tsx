'use client'
import { useState } from "react";
import axios from "axios";
import { instance } from "./services/api";
import { useRouter } from "next/navigation"; // Correct import

export default function Home() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response = await instance.post("/login", {
        usuario: email,
        senha: senha,
      });

      if (response.status === 200) {
        const data = response.data;
        console.log("Login successful", data);
        router.push("/conteudo");
      } else {
        console.error("Login failed");
        setError("Erro no login. Verifique suas credenciais.");
      }
    } catch (error) {
      console.error("Error during login", error);
      setError("Erro ao realizar o login. Tente novamente mais tarde.");
    }
  };

  return (
    <div className="bg-[#3F8EFC] flex flex-col h-screen items-center justify-center">
      <div className="bg-white text-base flex flex-col items-center justify-center rounded-3xl h-[550px] w-[550px]">
        <div className="logo mb-6">
          <h1>KeepStock</h1>
        </div>
        <form onSubmit={handleLogin} className="flex flex-col items-center">
          <div className="mb-4">
            <label className="text-lg">Usuário</label>
            <input
              className="input-field"
              id="email"
              type="text"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="text-lg">Senha</label>
            <input
              className="input-field"
              id="senha"
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <button type="submit" className="btn-login">
              ENTRAR
            </button>
          </div>

          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
}
