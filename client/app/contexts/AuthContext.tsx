'use client'
import { createContext, useState, useEffect } from "react";
import { parseCookies, destroyCookie, setCookie } from "nookies";
import { useRouter } from "next/navigation";
import { instance } from "../services/api";




type AuthContextType = {
    nome: string;
    isAuth: boolean;
    signIn: (data: SignInData) => Promise<void>; // Make sure signIn is defined
    signOut: () => void;
  };

export type SignInData = {
  login: string;
  senha: string;
  lembrarSenha: boolean;
  token: string;
};
export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: any) {
  const [isAuth, setIsAuth] = useState(false);
  const [nome, setNome] = useState<string>("")
  const [lembrarSenha, setLembrarSenha] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const { token } = parseCookies();

    // Recupera os valores armazenados em cookies
    const storedNome = localStorage.getItem("nome");

    setIsAuth(!!token);

    // Define os valores iniciais com base nos cookies
    if (token && storedNome) {
      setNome(storedNome);
    }
  }, []);

  const signIn = async (data: SignInData) => {
    try {
      const { login, senha, lembrarSenha } = data;
      const res = await instance.post(
        "login",
        {
          login,
          senha: senha,
        },
      );
      
      const { auth, token, nome } = res.data;


      if (auth) {
        setNome(nome);
        setIsAuth(true);

        // Armazena os valores em cookies
        setCookie(null, "token", token, {
          maxAge: 30 * 24 * 60 * 60, // 30 dias
          path: "/",
        });
        localStorage.setItem("nome", nome);
        localStorage.setItem("access_token", token);


        setLembrarSenha(lembrarSenha);

        router.push("/conteudo");
      } else {
        console.error("Autenticação falhou");
      }
    } catch (err) {
      console.error("Erro: " + err);
    }
  };

  const signOut = () => {
    destroyCookie(null, "token");

    // Remove os valores dos cookies e do localStorage
    localStorage.removeItem("nome");
    localStorage.removeItem("cargo");
    localStorage.removeItem("usuario_id");

    setIsAuth(false);
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{ isAuth, signIn, signOut, nome }}
    >
      {children}
    </AuthContext.Provider>
  );
}
