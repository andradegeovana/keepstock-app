import React from "react";

const Sidebar = () => {
  return (
    <div className="h-screen bg-[#3F8EFC] p-4">
      <div className="flex flex-col h-full">
        <div className="mb-4">
          <h1 className="text-white text-2xl font-bold">Keepstock</h1>
        </div>
        <div className="space-y-4">
          <p className="text-white">Início</p>
          <p className="text-white">Produtos</p>
          <p className="text-white">Estoque</p>
          <p className="text-white">Conta</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
