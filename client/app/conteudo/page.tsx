'use client';
import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { fetchProdutos } from "../services/hooks";
import Sidebar from "../components/sidebar";
import ProductModal from "../components/ProductModal";

interface Produto {
  id: number;
  imagem: string;
  nome: string;
  categoria: string;
  descricao: string;
  estoque: number;
  preco: number;
}

const Page: React.FC = () => {
  const [dados, setDados] = useState<Produto[]>([]);
  const [showModal, setShowModal] = useState(false);

  const handleAddProduct = async (formData: any) => {
    // Lógica para enviar dados ao backend e adicionar o produto
    // (Implemente de acordo com a sua API)
    console.log("Formulário submetido:", formData);
    // Atualizar a lista de produtos, se necessário
    // fetchProdutos()...
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const produtos = await fetchProdutos();
        setDados(produtos);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded"
          >
            <FiPlus className="mr-2" />
            Adicionar Produto
          </button>
        </div>
        <h2 className="text-2xl font-bold mb-4">Lista de Produtos</h2>
        <div className="flex flex-wrap">
          {dados.map((produto) => (
            <div
              key={produto.id}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4"
            >
              <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                <img
                  src={`data:image/png;base64,${produto.imagem}`}
                  alt="Imagem do Produto"
                  className="mb-2 rounded w-full h-32 object-cover"
                />
                <p className="font-bold text-lg">{produto.nome}</p>
                <p className="text-gray-500">{produto.categoria}</p>
                <p className="text-sm">{produto.descricao}</p>
                <p className="mt-2">Estoque: {produto.estoque}</p>
                <p className="text-green-600">Preço: ${produto.preco}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        <ProductModal
          showModal={showModal}
          onClose={() => setShowModal(false)}
          onAddProduct={handleAddProduct}
        />
      </div>
    </div>
  );
};

export default Page;
