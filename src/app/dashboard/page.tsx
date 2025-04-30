"use client";
"use client";
import React from "react";
import Header from "./components/header";
import TopNav from "./components/topnav";
import { topNav } from "./data";
import { Main } from "./components/main";
import { Button } from "@/components/ui/button";
const DashboardPage = () => {
  return (
    <>
      <Header fixed>
        <TopNav links={topNav} />
        <div className="ml-auto flex items-center space-x-4">
          <Button
            size="icon"
            className="bg-orange-500 text-white rounded-full hover:bg-orange-400 cursor-pointer"
          >
            ES
          </Button>
        </div>
      </Header>
      {/* <AppSidebar /> */}
      <Main>
        <div className="mb-2 flex flex-wrap items-center justify-between space-y-2 gap-x-4">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight">Overview</h2>
            <p className="text-muted-foreground">
              Aquí puedes ver un resumen de tus deudas y pagos.
            </p>
          </div>
          <Button variant="outline">Acción</Button>
        </div>
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
          DATATABLE
        </div>
      </Main>
    </>
  );
};

export default DashboardPage;
