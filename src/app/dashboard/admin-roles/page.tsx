"use client";
import React from "react";
import Header from "../components/header";
import TopNav from "../components/topnav";
import { topNav } from "../data";
import { useDashboard } from "@/stores/dashboard/dashboardStore";
import { Main } from "../components/main";
import { Button } from "@/components/ui/button";
import TitleSection from "../components/title-section";
import { ChartArea, LayoutDashboard, Square, UserIcon, UsersIcon } from "lucide-react";
const RolesPage = () => {
  const { defaultOpen } = useDashboard();
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
          title="Admin. Roles"
          description="Aquí puedes ver un resumen de tus deudas y pagos."
          icon={<UsersIcon color="white" />}
          subDescription="Usuarios"
        />
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
          <div className="w-full h-full">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam quia ipsam hic voluptate
            soluta. Ex ratione provident amet animi atque, facilis dolorem odit dignissimos vitae
            nemo! Quos quae non sit?
          </div>
        </div>
      </Main>
    </>
  );
};

export default RolesPage;
