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
  