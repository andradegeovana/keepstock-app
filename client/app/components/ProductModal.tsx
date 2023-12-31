import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import axios from "axios";
import { instance } from "../services/api";
import { fetchProdutos } from "../services/hooks";

interface ProductModalProps {
  showModal: boolean;
  onClose: () => void;
  onAddProduct: (formData: FormData) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({
  showModal,
  onClose,
  onAddProduct,
}) => {
  const [formData, setFormData] = useState<any>({
    imagem: "",
    nome: "",
    categoria: "",
    descricao: "",
    estoque: 0,
    preco: 0,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({ ...prevData, [name]: value }));
  };

  const handleNumberInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({ ...prevData, [name]: parseInt(value, 10) }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const base64Image = await convertToBase64(file);
      setFormData((prevData: any) => ({ ...prevData, imagem: base64Image }));
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
  
      reader.onload = () => {
        if (reader.result) {
          const base64String = reader.result.toString();
          // Remova o prefixo 'data:image/png;base64,'
          const base64WithoutPrefix = base64String.replace(/^data:image\/\w+;base64,/, '');
          resolve(base64WithoutPrefix);
        } else {
          reject("Failed to convert image to base64");
        }
      };
  
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      onAddProduct(formData);
      const response = await instance.post("produto/cadastrar", formData);
      fetchProdutos()
      onClose();
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
    }
  };

  return (
    // Modal
    showModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          onClick={onClose}
          className="absolute inset-0 bg-gray-500 opacity-50"
        ></div>
        <div className="bg-white p-8 rounded shadow-md z-10 w-full max-w-md">
          <div className="flex justify-end mb-2">
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <FiX />
            </button>
          </div>
          <h2 className="text-2xl font-bold mb-4">Adicionar Produto</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Imagem:
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Nome:
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Categoria:
                <input
                  type="text"
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Descrição:
                <textarea
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                ></textarea>
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Estoque:
                <input
                  type="number"
                  name="estoque"
                  value={formData.estoque}
                  onChange={handleNumberInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Preço:
                <input
                  type="number"
                  name="preco"
                  value={formData.preco}
                  onChange={handleNumberInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </label>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Adicionar Produto
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default ProductModal;


