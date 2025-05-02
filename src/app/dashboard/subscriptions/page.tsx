"use client";
import React from "react";
import Header from "../components/header";
import TopNav from "../components/topnav";
import { topNav } from "../data";
import { useDashboard } from "@/stores/dashboard/dashboardStore";
import { Main } from "../components/main";
import { Button } from "@/components/ui/button";
import TitleSection from "../components/title-section";
import {
  ChartArea,
  CreditCard,
  LayoutDashboard,
  Square,
  UserIcon,
  Trash2,
  Pause,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
// Datos dummy para la tabla
const dummyData = [
  {
    id: 1,
    cliente: "Juan Pérez",
    plan: "Premium",
    duracion: 12,
    precio: "$99.99",
    nota: "Pago mensual",
  },
  {
    id: 2,
    cliente: "María García",
    plan: "Básico",
    duracion: 6,
    precio: "$49.99",
    nota: "Pago trimestral",
  },
  {
    id: 3,
    cliente: "Carlos López",
    plan: "Empresarial",
    duracion: 24,
    precio: "$199.99",
    nota: "Pago anual",
  },
];

const SubscriptionsPage = () => {
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
          title="Suscripciones"
          description="Aquí puedes ver un resumen de tus deudas y pagos."
          icon={<CreditCard color="white" />}
          subDescription="Planes y suscripciones"
        />
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
          <div className="w-full h-full">
            <Card>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-primary">Cliente</TableHead>
                      <TableHead className="text-primary">Plan</TableHead>
                      <TableHead className="text-primary">Duración (meses)</TableHead>
                      <TableHead className="text-primary">Precio</TableHead>
                      <TableHead className="text-primary">Nota</TableHead>
                      <TableHead className="text-primary">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dummyData.map(item => (
                      <TableRow key={item.id}>
                        <TableCell>{item.cliente}</TableCell>
                        <TableCell>{item.plan}</TableCell>
                        <TableCell>{item.duracion}</TableCell>
                        <TableCell>{item.precio}</TableCell>
                        <TableCell>{item.nota}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="icon">
                              <Trash2 className="text-primary" />
                            </Button>{" "}
                            <Button variant="ghost" size="icon">
                              <Pause className="text-primary" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </Main>
    </>
  );
};

export default SubscriptionsPage;
