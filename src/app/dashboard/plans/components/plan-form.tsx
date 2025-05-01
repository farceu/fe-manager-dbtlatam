"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormProvider, useForm } from "react-hook-form";
import { FormMessage, FormControl, FormLabel, FormField, FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

const SECCIONES = [
  "Onboarding",
  "Usuarios y roles",
  "Pagos y suscripciones",
  "Gestión de tareas",
  "Configuración de sistema",
];

interface PlanFormProps {
  onSubmit: (data: {
    name: string;
    price: string;
    description: string;
    secciones: string[];
    is_default: boolean;
  }) => void;
  defaultValues?: {
    name: string;
    price: string;
    description: string;
    secciones: string[];
    is_default: boolean;
  };
}

export const PlanForm = ({ onSubmit, defaultValues }: PlanFormProps) => {
  const form = useForm({
    defaultValues: defaultValues || {
      name: "",
      price: "",
      description: "",
      secciones: [] as string[],
      is_default: false,
    },
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del plan</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Plan básico" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio del plan</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: 1000" {...field} />
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
                <FormLabel>Descripción</FormLabel>
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
              {SECCIONES.map(sec => (
                <label key={sec} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={sec}
                    {...form.register("secciones", { required: true })}
                  />
                  {sec}
                </label>
              ))}
            </div>
            {form.formState.errors.secciones && (
              <span className="text-red-500 text-xs">Selecciona al menos una sección</span>
            )}
          </div>
        </div>
        <section className="flex items-center justify-between gap-2 w-full border-t border-orange-300 pt-4">
          <FormField
            control={form.control}
            name="is_default"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    <span className="text-sm">Usar este plan por defecto</span>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-blue-700 text-white w-1/2">
            Guardar
          </Button>
        </section>
      </form>
    </FormProvider>
  );
};
