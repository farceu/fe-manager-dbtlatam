"use client";
import React from "react";
import Header from "../components/header";
import TopNav from "../components/topnav";
import { topNav } from "../data";
import { useDashboard } from "@/stores/dashboard/dashboardStore";
import { Main } from "../components/main";
import { Button } from "@/components/ui/button";
import TitleSection from "../components/title-section";
import { Edit, Trash2, UsersIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Search from "../admin-users/components/search";
import {
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
            <Card className="h-full p-5">
              <div className="flex justify-between items-start gap-5">
                <div className="w-1/3">
                  <Image
                    src="/img/roles-image.svg"
                    alt="Roles"
                    width={100}
                    height={100}
                    className="w-full h-full"
                  />
                </div>
                <div className="w-2/3">
                  <Search placeholder="Buscar por nombre" />
                  <div className="mt-5 p-3 border border-gray-200 rounded-lg">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-primary">Nombre</TableHead>
                          <TableHead className="text-primary text-right">Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>Nombre</TableCell>
                          <TableCell className="flex justify-end gap-2">
                            <Button variant="outline" size="icon">
                              <Edit className="text-primary" />
                            </Button>
                            <Button variant="outline" size="icon">
                              <Trash2 className="text-primary" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Main>
    </>
  );
};

export default RolesPage;
