"use client";
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CircleCheck, Edit, Trash2 } from "lucide-react";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Dialog } from "@/components/ui/dialog";
import { PlanForm } from "./plan-form";

interface CardPlanProps {
  plan?: {
    id: string;
    title: string;
    price: string | number;
    description: string;
    features: string[];
  };
  isEmpty?: boolean;
}

const CardPlan = ({ plan, isEmpty }: CardPlanProps) => {
  const handleSubmit = (data: {
    name: string;
    price: string;
    description: string;
    secciones: string[];
    is_default: boolean;
  }) => {
    // Aquí manejas el envío del formulario
    console.log(data);
  };

  if (isEmpty || !plan) {
    return (
      <Card className="h-full min-h-[450px] max-h-[450px] border border-dashed border-gray-300 bg-[#F9FCFF] shadow-none">
        <CardContent className="h-full flex items-center justify-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="px-10 py-4 text-lg border-blue-600 border-2 text-black"
                variant="outline"
              >
                Crear plan
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle className="font-extrabold">Crear plan</DialogTitle>
                <DialogDescription className="text-sm">
                  Completa los campos obligatorios para crear un nuevo plan.
                </DialogDescription>
              </DialogHeader>
              <PlanForm onSubmit={handleSubmit} />
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full min-h-[450px] max-h-[450px] bolder-none shadow-xl mb-10" key={plan.id}>
      <CardHeader className="m-0">
        <div className="flex items-center justify-end gap-2">
          <Button variant="outline" size="icon">
            <Edit className="text-primary" />
          </Button>
          <Button variant="outline" size="icon">
            <Trash2 className="text-primary" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="m-0">
        <>
          <CardTitle className="text-2xl font-black text-[#FF8113] capitalize">
            {plan.title}
          </CardTitle>
          <CardTitle className="text-md font-extrabold text-primary uppercase">
            {plan.price}
          </CardTitle>
          <CardDescription className="py-2">{plan.description}</CardDescription>
          <ul className="mt-2">
            {plan.features.map(feature => (
              <li
                key={feature + Math.random()}
                className="flex items-center justify-start gap-2 text-sm font-bold capitalize "
              >
                <CircleCheck size={18} className="text-[#14B117]" />{" "}
                <span className="text-[#3D4249]">{feature}</span>
              </li>
            ))}
          </ul>
        </>
      </CardContent>
    </Card>
  );
};

export default CardPlan;
