'use client'
import { createContext, useState, useEffect } from "react";
import { parseCookies, destroyCookie, setCookie } from "nookies";
import { useRouter } from "next/navigation";
import { instance } from "../services/api";




type AuthContextType = {
    id: number;
    nome: string;
    isAuth: boolean;
    signIn: (login: string, senha: string) => Promise<void>; // Make sure signIn is defined
    signOut: () => void;
  };

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: any) {
  const [isAuth, setIsAuth] = useState(false);
  const [nome, setNome] = useState<string>("");
  const [id, setId] = useState<number>(0); // Defina o tipo como number | undefined
  const router = useRouter();

  useEffect(() => {
    const { token } = parseCookies();
    const storedNome = localStorage.getItem("nome");

    setIsAuth(!!token);

    if (token && storedNome) {
      setNome(storedNome);
    }
  }, []);

  const signIn = async (login: string | null, senha: string | null) => {
    try {
      const res = await instance.post("/login", {
        usuario: login,
        senha: senha,
      });
      console.log(res.data)
      const { auth, token, nome, id } = res.data;

      if (auth) {
        setNome(nome);
        setId(id);
        setIsAuth(true);

        setCookie(null, "token", token, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });

        router.push("/inicio");
      } else {
        console.error("Autenticação falhou");
      }
    } catch (err) {
      console.error("Erro: " + err);
    }
  };

  const signOut = () => {
    destroyCookie(null, "token");

    localStorage.removeItem("nome");
    localStorage.removeItem("cargo");
    localStorage.removeItem("usuario_id");

    setIsAuth(false);
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{ isAuth, signIn, signOut, nome, id }}
    >
      {children}
    </AuthContext.Provider>
  );
}