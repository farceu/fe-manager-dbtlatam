"use client";
import React, { useEffect } from "react";
import Header from "../components/header";
import TopNav from "../components/topnav";
import { topNav } from "../data";
import { useDashboard } from "@/stores/dashboard/dashboardStore";
import { Main } from "../components/main";
import { Button } from "@/components/ui/button";
import TitleSection from "../components/title-section";
import { UsersIcon, Loader } from "lucide-react";
import { useUserStore } from "./store";
import { useSession } from "next-auth/react";
import Search from "./components/search";
import UsersTable from "./components/users-table";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const UsersPage = () => {
  const { data: session, status: sessionStatus }: any = useSession();
  const { users, loading, error, searchTerm, setSearchTerm, fetchUsers } = useUserStore();

  useEffect(() => {
    if (session?.token) {
      fetchUsers(session?.token);
    }
  }, [sessionStatus, session]);

  const handleEdit = (user: any) => {
    // Implementar lógica de edición
    console.log("Editar usuario:", user);
  };

  const handleDelete = (user: any) => {
    // Implementar lógica de eliminación
    console.log("Eliminar usuario:", user);
  };

  const handleReinvite = (user: any) => {
    // Implementar lógica de reinvitación
    console.log("Reinvitar usuario:", user);
  };

  return (
    <>
      <Header fixed>
        <div className="ml-auto flex items-center space-x-4">
          <Button
            size="icon"
            className="bg-orange-500 text-white rounded-full hover:bg-orange-400 cursor-pointer"
          >
            ES
          </Button>
        </div>
      </Header>
      <Main>
        <TitleSection
          title="Admin. Usuarios"
          description="Aquí puedes ver un resumen de tus deudas y pagos."
          icon={<UsersIcon color="white" />}
          subDescription="Usuarios"
        />
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
          <div className="w-full h-full">
            <section className="flex items-center justify-between mb-4">
              <Search />
              <Button className="bg-orange-500 text-white hover:bg-orange-400 cursor-pointer">
                <UsersIcon className="mr-2" /> Crear usuario
              </Button>
            </section>
            <Card className="p-4">
              {loading ? (
                <div className="flex justify-center items-center h-full">
                  <Loader className="animate-spin" />
                </div>
              ) : error ? (
                <div>Error: {error}</div>
              ) : (
                <UsersTable
                  users={users}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onReinvite={handleReinvite}
                />
              )}
            </Card>
          </div>
        </div>
      </Main>
    </>
  );
};

export default UsersPage;
