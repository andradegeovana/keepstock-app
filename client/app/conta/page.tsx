"use client";
import React, { useEffect, useState, useContext } from "react";
import {
  FiUser,
  FiMail,
  FiLock,
  FiInfo,
  FiPhone,
  FiCalendar,
} from "react-icons/fi";
import Sidebar from "../components/sidebar";
import { fetchUsuario } from "../services/hooks";
import { AuthContext } from "../contexts/AuthContext";
import UserRegistrationForm from "../components/UserRegistrationForm";
import { useRouter } from "next/navigation";

interface Usuario {
  id: number;
  nome: string;
  usuario: string;
  senha: string;
  email: string;
  cpf: string;
  telefone: string;
  createdAt: string;
  updatedAt: string;
}

const formatarData = (data: string) => {
  const date = new Date(data);
  const dia = String(date.getDate()).padStart(2, "0");
  const mes = String(date.getMonth() + 1).padStart(2, "0");
  const ano = date.getFullYear();
  const horas = String(date.getHours()).padStart(2, "0");
  const minutos = String(date.getMinutes()).padStart(2, "0");

  return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
};

const Page = () => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const { id, isAuth } = useContext(AuthContext);
  const router = useRouter();
  const handleRegisterSuccess = () => {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id !== undefined) {
          const data = await fetchUsuario(id);
          setUsuario(data);
          console.log(data);
          console.log(id);
          console.log(isAuth);
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 p-8 overflow-y-auto">
        {usuario ? (
          <div className="flex flex-col space-y-4 items-center">
            <div
              key={usuario.id}
              className="flex items-center bg-white p-4 rounded-lg shadow-md w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4"
            >
              <div className="w-full">
                <div className="mb-4">
                  <FiInfo className="text-gray-500 mr-2" />
                  <label>ID:</label>
                  <input
                    type="text"
                    value={usuario.id}
                    readOnly
                    className="border rounded px-2 py-1 w-full text-center"
                  />
                </div>

                <div className="mb-4">
                  <FiUser className="text-gray-500 mr-2" />
                  <label>Nome:</label>
                  <input
                    type="text"
                    value={usuario.nome}
                    readOnly
                    className="border rounded px-2 py-1 w-full text-center"
                  />
                </div>

                <div className="mb-4">
                  <FiUser className="text-gray-500 mr-2" />
                  <label>Usuário:</label>
                  <input
                    type="text"
                    value={usuario.usuario}
                    readOnly
                    className="border rounded px-2 py-1 w-full text-center"
                  />
                </div>

                <div className="mb-4">
                  <FiMail className="text-gray-500 mr-2" />
                  <label>Email:</label>
                  <input
                    type="text"
                    value={usuario.email}
                    readOnly
                    className="border rounded px-2 py-1 w-full text-center"
                  />
                </div>
              </div>
              <div className="w-full">
                <div className="mb-4">
                  <FiLock className="text-gray-500 mr-2" />
                  <label>CPF:</label>
                  <input
                    type="text"
                    value={usuario.cpf}
                    readOnly
                    className="border rounded px-2 py-1 w-full text-center"
                  />
                </div>

                <div className="mb-4">
                  <FiPhone className="text-gray-500 mr-2" />
                  <label>Telefone:</label>
                  <input
                    type="text"
                    value={usuario.telefone}
                    readOnly
                    className="border rounded px-2 py-1 w-full text-center"
                  />
                </div>

                <div className="mb-4">
                  <FiCalendar className="text-gray-500 mr-2" />
                  <label>Criado em:</label>
                  <input
                    type="text"
                    value={formatarData(usuario.createdAt)}
                    readOnly
                    className="border rounded px-2 py-1 w-full text-center"
                  />
                </div>

                <div className="mb-4">
                  <FiCalendar className="text-gray-500 mr-2" />
                  <label>Atualizado em:</label>
                  <input
                    type="text"
                    value={formatarData(usuario.updatedAt)}
                    readOnly
                    className="border rounded px-2 py-1 w-full text-center"
                  />
                </div>
              </div>

            </div>
            <button
                onClick={() => router.push("/adicionar")}
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Adicionar Usuário
              </button>
          </div>
        ) : (
          <p>Nenhum dado encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default Page;
