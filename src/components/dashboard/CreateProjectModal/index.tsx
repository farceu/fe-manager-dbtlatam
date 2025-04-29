import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useCreateProject from "@/hooks/useCreateProject";

type CreateProjectModalProps = {
  setIsOpen: (isOpen: boolean) => void;
};

export default function CreateProjectModal({ setIsOpen }: CreateProjectModalProps) {
  const { form, onSubmit, isLoading } = useCreateProject();

  const handleOnSubmit = (data: any) => {
    onSubmit(data)
      .then(() => {
        setIsOpen(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Create project</DialogTitle>
        <DialogDescription>Create a new project to get started.</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleOnSubmit)} className="flex flex-col gap-4">
            <div className="w-full">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Project name</FormLabel>
                    <FormControl>
                      <Input disabled={isLoading} placeholder="Project name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? <Loader /> : "Save changes"}
            </Button>
          </form>
        </Form>
      </div>
    </DialogContent>
  );
}
