"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormProvider, useForm } from "react-hook-form";
import { FormMessage, FormControl, FormLabel, FormField, FormItem } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { User, Role } from "../services/types";
import { getRoles } from "../services";
import { useSession } from "next-auth/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const userFormSchema = z.object({
  name: z.string().min(3, "Campo requerido").max(50, "Máximo 50 caracteres"),
  last_name: z.string().min(3, "Campo requerido").max(50, "Máximo 50 caracteres"),
  email: z.string().email("Email inválido"),
  phone_number: z.string().min(8, "Campo requerido").max(15, "Máximo 15 caracteres"),
  type: z
    .string()
    .min(1, "Campo requerido")
    .refine(value => ["SUPER_ADMIN", "NORMAL"].includes(value), {
      message: "Debe seleccionar un rol válido",
    }),
  roles: z.array(z.string()).min(1, "Debe seleccionar al menos un rol"),
});

type UserFormValues = z.infer<typeof userFormSchema>;

interface UserFormProps {
  defaultValues?: Partial<User>;
  onSubmit?: (data: User) => Promise<void>;
}

const UserForm = ({ defaultValues, onSubmit }: UserFormProps) => {
  const [roles, setRoles] = useState<Role[]>([]);
  const { data: session }: any = useSession();

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: defaultValues?.name || "",
      last_name: defaultValues?.last_name || "",
      email: defaultValues?.email || "",
      phone_number: defaultValues?.phone_number || "",
      type: defaultValues?.type || "",
      roles: defaultValues?.roles || [],
    },
  });

  useEffect(() => {
    if (session?.token) {
      fetchRoles();
    }
  }, [session?.token]);

  const fetchRoles = async () => {
    const rolesData = await getRoles(session?.token);
    setRoles(rolesData);
  };

  const handleSubmit = async (data: UserFormValues): Promise<void> => {
    try {
      const userData = {
        ...data,
        roles: data.roles,
      } as User;

      if (onSubmit) {
        await onSubmit(userData);
      }
    } catch (error) {
      console.error("Error al guardar el usuario:", error);
    }
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full space-y-6"
        autoComplete="off"
      >
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Nombre<span className="text-orange-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Juan" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Apellido<span className="text-orange-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Pérez" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Email<span className="text-orange-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Ej: juan@ejemplo.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Teléfono<span className="text-orange-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Ej: +56912345678" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Tipo de usuario<span className="text-orange-500">*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="SUPER_ADMIN">Administrador</SelectItem>
                    <SelectItem value="NORMAL">Usuario</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <Label>
              Roles<span className="text-orange-500">*</span>
            </Label>
            <div className="flex flex-col gap-2 mt-2">
              {roles.map(role => (
                <div key={`role-${role.id}`} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`role-checkbox-${role.id}`}
                    checked={form.watch("roles")?.includes(role.id)}
                    onChange={e => {
                      const currentRoles = form.getValues("roles") || [];
                      if (e.target.checked) {
                        form.setValue("roles", [...currentRoles, role.id]);
                      } else {
                        form.setValue(
                          "roles",
                          currentRoles.filter(id => id !== role.id)
                        );
                      }
                    }}
                  />
                  <label htmlFor={`role-checkbox-${role.id}`}>{role.name}</label>
                </div>
              ))}
            </div>
            {form.formState.errors.roles && (
              <span className="text-red-500 text-xs">{form.formState.errors.roles.message}</span>
            )}
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            className="bg-blue-700 text-white"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Guardando..." : "Guardar"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default UserForm;
