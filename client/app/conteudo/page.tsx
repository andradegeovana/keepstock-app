"use client";
import React, { useEffect, useState, useContext } from "react";
import { FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi";
import { deleteProduto, fetchProdutos } from "../services/hooks";
import Sidebar from "../components/sidebar";
import ProductModal from "../components/ProductModal";
import { AuthContext } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";
import EditProductModal from "../components/EditProductModal";

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
  const [showEditModal, setShowEditModal] = useState(false); // Novo estado para o modal de edição
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  ); // Novo estado para o produto selecionado

  const { id, isAuth } = useContext(AuthContext);
  const router = useRouter();
  const handleAddProduct = async (formData: any) => {};
  const handleEditClick = (productId: number) => {
    // Configura o estado para abrir o modal de edição
    setShowEditModal(true);
    // Configura o estado com o ID do produto selecionado para edição
    setSelectedProductId(productId);
  };
  const handleEditProduct = async (formData: FormData) => {
    // Lógica para editar produto (se necessário)
    console.log("Produto editado:", formData);
    // Atualize a lista de produtos após a edição
    await fetchData();
  };
  const [isLoading, setIsLoading] = useState(true);
  async function fetchData() {
    try {
      const produtos = await fetchProdutos();
      setDados(produtos);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    } finally {
      setIsLoading(false); // Indica que o carregamento foi concluído
    }
  }

  useEffect(() => {
    const fetchDataAndSetState = async () => {
      try {
        const produtos = await fetchProdutos();
        setDados(produtos);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchDataAndSetState();
  }, [showModal, showEditModal, selectedProductId]);

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
                <div className="flex justify-between mb-2">
                  <p className="font-bold text-lg">{produto.nome}</p>
                  <div className="flex space-x-2">
                  <FiEdit2
                    className="cursor-pointer text-blue-500"
                    onClick={() => handleEditClick(produto.id)}
                  />
                    <FiTrash2
                      className="cursor-pointer text-red-500"
                      onClick={async () => {
                        deleteProduto(produto.id);
                        await fetchData();
                      }}
                    />
                  </div>
                </div>
                <img
                  src={`data:image/png;base64,${produto.imagem}`}
                  alt="Imagem do Produto"
                  className="mb-2 rounded w-full h-32 object-cover"
                />
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
        <EditProductModal
          showModal={showEditModal}
          onClose={() => setShowEditModal(false)}
          onEditProduct={handleEditProduct}
          productId={selectedProductId}
        />
      </div>
    </div>
  );
};

export default Page;
