"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormProvider, useForm } from "react-hook-form";
import { FormMessage, FormControl, FormLabel, FormField, FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { create, getSystemResources } from "../services";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plan, Resource } from "../services/types";
import { usePlanStore } from "../store/indext";

const planFormSchema = z.object({
  name: z.string().min(3, "Campo requerido").max(50, "Máximo 50 caracteres"),
  monthly_price: z.any().optional(),
  description: z.string().min(10, "Campo requerido").max(500, "Máximo 500 caracteres"),
  system_resources: z.array(z.string()).optional(),
  currency: z.string().optional(),
  id: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

type PlanFormValues = z.infer<typeof planFormSchema>;

interface PlanFormProps {
  defaultValues?: Partial<Plan>;
  onSubmit?: (data: Plan) => Promise<void>;
}

const PlanForm = ({ defaultValues, onSubmit }: PlanFormProps) => {
  const [resources, setResources] = useState<Resource[]>([]);
  const { data: session }: any = useSession();
  const { addPlan, refreshPlans } = usePlanStore();

  const form = useForm<PlanFormValues>({
    resolver: zodResolver(planFormSchema),
    defaultValues: {
      name: defaultValues?.name || "",
      monthly_price: defaultValues?.monthly_price || 0,
      description: defaultValues?.description || "",
      system_resources: (defaultValues?.system_resources || []).map(r =>
        typeof r === "string" ? r : r.id
      ),
      currency: defaultValues?.currency || "USD",
    },
  });

  useEffect(() => {
    if (session?.token) {
      fetchResources();
    }
  }, [session?.token]);

  const fetchResources = async () => {
    const resourcesData = await getSystemResources(session?.token);
    setResources(resourcesData);
  };

  const handleSubmit = async (data: PlanFormValues): Promise<void> => {
    try {
      const { id, created_at, updated_at, ...restData } = data;
      const planData = {
        ...restData,
        system_resources: data.system_resources || [],
      } as unknown as Plan;

      if (onSubmit) {
        await onSubmit(planData);
      } else {
        const response = await create(planData, session?.token);
        addPlan(response);
      }

      await refreshPlans(session?.token);
    } catch (error) {
      console.error("Error al guardar el plan:", error);
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full space-y-6">
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4 items-start">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Nombre del plan<span className="text-orange-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Plan básico" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="monthly_price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Precio del plan<span className="text-orange-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Ej: 1000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Descripción<span className="text-orange-500">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Ingresa una breve descripción del plan"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <Label>
              Secciones<span className="text-orange-500">*</span>
            </Label>
            <div className="flex flex-col gap-2 mt-2">
              {resources.length > 0 &&
                resources.map(resource => (
                  <label key={resource.id} className="flex items-center gap-2">
                    <Checkbox
                      checked={form.watch("system_resources")?.includes(resource.id)}
                      onCheckedChange={checked => {
                        const currentResources = form.getValues("system_resources") || [];
                        if (checked) {
                          form.setValue("system_resources", [...currentResources, resource.id]);
                        } else {
                          form.setValue(
                            "system_resources",
                            currentResources.filter(id => id !== resource.id)
                          );
                        }
                      }}
                    />
                    {resource.name}
                  </label>
                ))}
            </div>
            {form.formState.errors.system_resources && (
              <span className="text-red-500 text-xs">
                {form.formState.errors.system_resources.message}
              </span>
            )}
          </div>
        </div>
        <section className="grid grid-cols-2 gap-4 border-t pt-4 border-orange-400">
          <FormField
            control={form.control}
            name="currency"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Moneda: {field.value}</span>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="bg-blue-700 text-white w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Guardando..." : "Guardar"}
          </Button>
        </section>
      </form>
    </FormProvider>
  );
};

export default PlanForm;
