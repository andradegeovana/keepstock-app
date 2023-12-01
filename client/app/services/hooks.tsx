import { instance } from "./api";

export const fetchProdutos = () => {
    return instance
      .get("produto/todos")
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.error(error);
      });
  };