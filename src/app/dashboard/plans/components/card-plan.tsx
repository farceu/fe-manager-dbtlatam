"use client";
import React, { useState } from "react";
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
import PlanForm from "./plan-form";
import { Plan } from "../services/types";
import { usePlanStore } from "../store/indext";
import { useSession } from "next-auth/react";
import { update } from "../services";

interface CardPlanProps {
  plan?: Plan;
  isEmpty?: boolean;
}

const CardPlan = ({ plan, isEmpty }: CardPlanProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { data: session }: any = useSession();
  const { updatePlan, refreshPlans } = usePlanStore();

  const handleEdit = async (data: Plan) => {
    try {
      if (!plan?.id) return;

      const updatedPlan = await update(plan.id, data, session?.token);
      updatePlan(plan.id, updatedPlan);
      await refreshPlans(session?.token);
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("Error al actualizar el plan:", error);
    }
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
              <PlanForm />
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
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Edit className="text-primary" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90%] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="font-extrabold">Editar plan</DialogTitle>
                <DialogDescription className="text-sm">
                  Modifica los campos que desees actualizar.
                </DialogDescription>
              </DialogHeader>
              <PlanForm defaultValues={plan} onSubmit={handleEdit} />
            </DialogContent>
          </Dialog>
          <Button variant="outline" size="icon">
            <Trash2 className="text-primary" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="m-0">
        <>
          <CardTitle className="text-2xl font-black text-[#FF8113] uppercase">
            {plan.name}
          </CardTitle>
          <CardTitle className="text-md font-extrabold text-primary uppercase">
            ${plan.monthly_price}
          </CardTitle>
          <CardDescription className="py-2">{plan.description}</CardDescription>
          <ul className="mt-2">
            {plan.system_resources?.map(resource => (
              <li
                key={resource.id}
                className="flex items-center justify-start gap-2 text-sm font-bold capitalize "
              >
                <CircleCheck size={18} className="text-[#14B117]" />{" "}
                <span className="text-[#3D4249]">{resource.name}</span>
              </li>
            ))}
          </ul>
        </>
      </CardContent>
    </Card>
  );
};

export default CardPlan;
