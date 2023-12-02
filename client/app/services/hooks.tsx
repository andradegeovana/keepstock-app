import { instance } from "./api";

export const fetchProdutos = async () => {
    try {
      const response = await instance.get("produto/todos");
      const data = response.data;
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  export const deleteProduto = async (id: number) => {
    try {
      const response = await instance.delete(`produto/remover/${id}`);
      const data = response.data;
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  export const fetchUsuario = async (id: number) => {
    try {
      const response = await instance.get(`usuario/mostrar/${id}`);
      const data = response.data;
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  export const fetchAllUsuario = async () => {
    try {
      const response = await instance.get('usuario/todos');
      const data = response.data;
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  export const editarProduto = async (id: any, formData: any) => {
    try {
      const response = await instance.put(`produto/editar/${id}`, formData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const addUsuario = async (formData: any) => {
    try {
      const response = await instance.put("", formData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };