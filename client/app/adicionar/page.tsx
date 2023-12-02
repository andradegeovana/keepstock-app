"use client";
import UserRegistrationForm from "@/app/components/UserRegistrationForm";
import Sidebar from "@/app/components/sidebar";
import { AuthContext } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";

import React, { useEffect, useContext } from "react";



const Page = () => {
  const { isAuth } = useContext(AuthContext);
  const router = useRouter()
  const handleRegisterSuccess = () => {
  };

  useEffect(() => {
    const fetchData = async () => {
      try {

      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 p-8 overflow-y-auto">
        <div>
          <UserRegistrationForm onRegisterSuccess={handleRegisterSuccess} />
        </div>
      </div>

    </div>
  );
};

export default Page;
