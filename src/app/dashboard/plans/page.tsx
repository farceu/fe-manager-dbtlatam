"use client";
import React from "react";
import Header from "../components/header";
import { Main } from "../components/main";
import { Button } from "@/components/ui/button";
import TitleSection from "../components/title-section";
import { FileText } from "lucide-react";
import CardPlan from "@/app/dashboard/plans/components/card-plan";
const OverviewPage = () => {
  const plans = [
    {
      id: "1",
      title: "Plan free",
      description: "description",
      price: "Gratis",
      features: ["Acceso básico", "Soporte por email"],
    },
    {
      id: "2",
      title: "plan1",
      description:
        "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      price: 100,
      features: ["feature1", "feature2", "feature3", "feature4", "feature5", "feature6"],
    },
  ];
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
          title="Planes"
          description="Aquí puedes ver un resumen de tus deudas y pagos."
          icon={<FileText color="white" />}
          subDescription="Planes y suscripciones"
        />
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
          <div className="w-full h-full">
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, index) => (
                <CardPlan
                  key={plans[index]?.id || `empty-${index}`}
                  plan={plans[index]}
                  isEmpty={!plans[index]}
                />
              ))}
            </div>
          </div>
        </div>
      </Main>
    </>
  );
};

export default OverviewPage;
