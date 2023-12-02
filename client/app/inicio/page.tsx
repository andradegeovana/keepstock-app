"use client";
import React, { useContext, useEffect, useState } from "react";
import { FiBox, FiUsers, FiInfo, FiList, FiDatabase, FiDollarSign } from "react-icons/fi";
import Sidebar from "../components/sidebar";
import { useRouter } from "next/navigation";
import { AuthContext } from "../contexts/AuthContext";
import { fetchAllUsuario, fetchProdutos } from "../services/hooks";

const Page = () => {
  const { nome, isAuth } = useContext(AuthContext);
  const [totalProdutos, setTotalProdutos] = useState(0);
  const [totalUsuarios, setTotalUsuarios] = useState(0);
  const [valorProdutosEstoque, setValorProdutosEstoque] = useState(0);
  const [totalPrecosProdutos, setTotalPrecosProdutos] = useState(0);
  const [produtosSemEstoque, setProdutosSemEstoque] = useState(0);
  const router = useRouter();

  async function fetchData() {
    try {
      const produtos = await fetchProdutos();
      setTotalProdutos(produtos.length);
      const usuarios = await fetchAllUsuario();
      setTotalUsuarios(usuarios.length);

      // Calcular o valor total dos produtos em estoque, a soma de todos os preços e a quantidade de produtos sem estoque
      const valorProdutos = produtos.reduce(
        (total: any, produto: any) => total + (produto.estoque > 0 ? produto.preco * produto.estoque : 0),
        0
      );

      const totalPrecos = produtos.reduce((total: any, produto: any) => total + produto.preco, 0);
      const produtosSemEstoque = produtos.filter((produto: { estoque: number; }) => produto.estoque === 0).length;

      setValorProdutosEstoque(valorProdutos);
      setTotalPrecosProdutos(totalPrecos);
      setProdutosSemEstoque(produtosSemEstoque);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }

  useEffect(() => {
    if (!isAuth) {
      router.push("/");
    } else {
      fetchData();
    }
  }, [isAuth]);

  // Se o usuário não estiver autenticado, não exibe o conteúdo
  if (!isAuth) {
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-semibold mb-4">Bem-vindo, {nome}!</h1>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white rounded-lg shadow-md p-4">
            <FiBox className="text-3xl mb-4 text-blue-500" />
            <h2 className="text-xl font-semibold mb-2">Total de Produtos</h2>
            <p>{totalProdutos}</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <FiUsers className="text-3xl mb-4 text-green-500" />
            <h2 className="text-xl font-semibold mb-2">Total de Usuários</h2>
            <p>{totalUsuarios}</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <FiDollarSign  className="text-3xl mb-4 text-orange-500" />
            <h2 className="text-xl font-semibold mb-2">Valor dos Produtos em Estoque</h2>
            <p>R$ {valorProdutosEstoque.toFixed(2)}</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <FiInfo className="text-3xl mb-4 text-orange-500" />
            <h2 className="text-xl font-semibold mb-2">Soma de Todos os Preços</h2>
            <p>R$ {totalPrecosProdutos.toFixed(2)}</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <FiDatabase className="text-3xl mb-4 text-orange-500" />
            <h2 className="text-xl font-semibold mb-2">Produtos Sem Estoque</h2>
            <p>{produtosSemEstoque}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
