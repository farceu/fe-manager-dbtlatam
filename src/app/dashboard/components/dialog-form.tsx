import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode } from "react";

interface DialogFormProps<T> {
  defaultValues?: Partial<T>;
  title?: string;
  description?: string;
  isEdit?: boolean;
  children: ReactNode;
  trigger: ReactNode;
  onSubmit?: (data: T) => Promise<void>;
  open?: boolean;
}

const DialogForm = <T,>({
  defaultValues,
  title = "Crear",
  description = "Completa los campos obligatorios.",
  isEdit = false,
  children,
  trigger,
  onSubmit,
  open,
}: DialogFormProps<T>) => {
  return (
    <Dialog open={open}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="font-extrabold">{title}</DialogTitle>
          <DialogDescription className="text-sm">{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default DialogForm;
