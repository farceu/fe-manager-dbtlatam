"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Share2 } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { User } from "../services/types";
import { useSearchParams } from "next/navigation";
import DialogConfirm from "../../components/dialog-confirm";

interface UsersTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onReinvite: (user: User) => void;
}

const UsersTable = ({ users, onEdit, onDelete, onReinvite }: UsersTableProps) => {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search")?.toLowerCase() || "";

  const filteredUsers = users.filter(user => {
    if (!searchTerm) return true;
    return (
      user.name.toLowerCase().includes(searchTerm) ||
      user.last_name.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-primary">Nombre</TableHead>
          <TableHead className="text-primary">Apellido</TableHead>
          <TableHead className="text-primary">Email</TableHead>
          <TableHead className="text-primary">Teléfono</TableHead>
          <TableHead className="text-primary">Creado</TableHead>
          <TableHead className="text-primary">Actualizado</TableHead>
          <TableHead className="text-primary text-center">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredUsers.map(user => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.last_name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.phone_number}</TableCell>
            <TableCell className="text-xs">
              {user.created_at &&
                format(new Date(user.created_at), "dd-MM-yyyy HH:mm", { locale: es })}
            </TableCell>
            <TableCell className="text-xs">
              {user.updated_at &&
                format(new Date(user.updated_at), "dd-MM-yyyy HH:mm", { locale: es })}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-1">
                <Button variant="ghost" size="icon" onClick={() => onEdit(user)} title="Editar">
                  <Edit className="text-primary" />
                </Button>
                <DialogConfirm
                  title="¿Está seguro que desea eliminar el usuario?"
                  description="Al eliminar el usuario, perderá toda la información asociada a este usuario."
                  triggerButton={
                    <Button variant="ghost" size="icon" title="Eliminar">
                      <Trash2 className="text-primary" />
                    </Button>
                  }
                  onConfirm={() => onDelete(user)}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onReinvite(user)}
                  title="Reinvitar"
                >
                  <Share2 className="text-primary" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UsersTable;
