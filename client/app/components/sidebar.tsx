"use client";
import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../contexts/AuthContext";
import { FiHome, FiBox, FiUser, FiLogOut } from "react-icons/fi";

const Sidebar = () => {
  const { signOut } = useContext(AuthContext);
  const router = useRouter();

  const menuItems = [
    { label: "Início", icon: <FiHome size={20} />, path: "/inicio" },
    { label: "Produtos", icon: <FiBox size={20} />, path: "/conteudo" },
    { label: "Conta", icon: <FiUser size={20} />, path: "/conta" },
  ];

  return (
    <div className="h-screen bg-[#3F8EFC] p-4">
      <div className="flex flex-col h-full">
        <div className="mb-4">
          <span className="flex">
            <h1 className="text-black text-2xl font-bold flex items-center justify-center">
              Keepstock
            </h1>{" "}
            <img className="p-2" src="/box.svg" alt="box" />
          </span>
        </div>
        <div className="space-y-4">
          {menuItems.map((item, index) => (
            <div
              key={index}
              onClick={() => router.push(item.path)}
              className="flex items-center cursor-pointer text-white transition duration-300 hover:bg-white hover:text-[#3F8EFC] px-3 py-2 rounded"
            >
              {item.icon}
              <p className="ml-2">{item.label}</p>
            </div>
          ))}
          <div
            onClick={() => signOut()}
            className="flex items-center cursor-pointer text-white transition duration-300 hover:bg-white hover:text-[#3F8EFC] px-3 py-2 rounded"
          >
            <FiLogOut size={20} />
            <p className="ml-2">Sair</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
