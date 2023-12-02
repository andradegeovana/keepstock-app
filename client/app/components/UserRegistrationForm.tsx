// src/components/UserRegistrationForm.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { instance } from '../services/api';

interface UserRegistrationFormProps {
  onRegisterSuccess: () => void;
}

interface User {
  nome: string;
  usuario: string;
  senha: string;
  email: string;
  cpf: string;
  telefone: string;
}

const UserRegistrationForm: React.FC<UserRegistrationFormProps> = ({
  onRegisterSuccess,
}) => {
  const [userData, setUserData] = useState<User>({
    nome: '',
    usuario: '',
    senha: '',
    email: '',
    cpf: '',
    telefone: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Envia a solicitação para o backend
      await instance.post('usuario/registrar', userData);

      // Limpa o formulário após o registro bem-sucedido
      setUserData({
        nome: '',
        usuario: '',
        senha: '',
        email: '',
        cpf: '',
        telefone: '',
      });

      // Chama a função de retorno de sucesso
      onRegisterSuccess();
    } catch (error) {
      console.error('Erro no registro:', error);
      // Lógica de tratamento de erro (pode exibir uma mensagem para o usuário, etc.)
    }
  };

  return (
<form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 shadow-lg p-6 bg-white rounded-md">
  <h2 className="text-2xl font-bold mb-4">Registro de Usuário</h2>

  <div className="mb-4">
    <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
      Nome:
    </label>
    <input
      type="text"
      id="nome"
      name="nome"
      value={userData.nome}
      onChange={handleInputChange}
      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
    />
  </div>

  <div className="mb-4">
    <label htmlFor="usuario" className="block text-sm font-medium text-gray-700">
      Usuário:
    </label>
    <input
      type="text"
      id="usuario"
      name="usuario"
      value={userData.usuario}
      onChange={handleInputChange}
      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
    />
  </div>

  <div className="mb-4">
    <label htmlFor="senha" className="block text-sm font-medium text-gray-700">
      Senha:
    </label>
    <input
      type="password"
      id="senha"
      name="senha"
      value={userData.senha}
      onChange={handleInputChange}
      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
    />
  </div>

  <div className="mb-4">
    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
      Email:
    </label>
    <input
      type="email"
      id="email"
      name="email"
      value={userData.email}
      onChange={handleInputChange}
      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
    />
  </div>

  <div className="mb-4">
    <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">
      CPF:
    </label>
    <input
      type="text"
      id="cpf"
      name="cpf"
      value={userData.cpf}
      onChange={handleInputChange}
      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
    />
  </div>

  <div className="mb-4">
    <label htmlFor="telefone" className="block text-sm font-medium text-gray-700">
      Telefone:
    </label>
    <input
      type="tel"
      id="telefone"
      name="telefone"
      value={userData.telefone}
      onChange={handleInputChange}
      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
    />
  </div>

  <button
    type="submit"
    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
  >
    Registrar
  </button>
</form>

  );
};

export default UserRegistrationForm;
