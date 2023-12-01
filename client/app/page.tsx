'use client'
import { useState } from "react";
import { fetchProdutos } from "./services/hooks";


export default function Home() {
  const [produtos, setProdutos] = useState([])
const handleProdutos = () => {
  let a = fetchProdutos()
  console.log((a))
 
}
  return (
    <div className="bg-[#3F8EFC] flex flex-col h-screen items-center justify-center">
      <div className="bg-white text-base flex flex-col items-center justify-center rounded-3xl h-[550px] w-[550px]">
        <div className="logo">
          <h1>KeepStock</h1>
        </div>
        <form>
          <div className="email">
            <label className="m-16">Email</label>
            <input className="bg-[#ECECEC] h-[40px] border border-[#D4D4D4] rounded-[4px] indent-[10px]" id="email" type="email" placeholder="Digite seu email"/>
          </div>
          <div className="senha">
            <label className="m-16">Senha</label>
            <input className="bg-[#ECECEC] h-[40px] border border-[#D4D4D4] rounded-[4px] indent-[10px]" id="senha" type="password" placeholder="Digite sua senha"/>
          </div>

          <div className="botao">
            <button onClick={handleProdutos} type="submit">ENTRAR</button>
          </div>
        </form>
      </div>
    </div>
  )
}
