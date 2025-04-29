import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAgentPlaygroundStore } from "@/stores/dashboard/agentPlaygroundStore";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

export default function SaveAgent() {
  const form = useFormContext();
  const { isLoading } = useAgentPlaygroundStore();

  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const getContainer = document.getElementById("agent-playground");
    if (getContainer) {
      setContainer(getContainer);
    }
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Save</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[475px]" container={container}>
        <DialogHeader>
          <DialogTitle>Save Agent</DialogTitle>
          <DialogDescription>
            This will save the current agent and you will be able to start using it.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="name"
              disabled={isLoading}
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Email Agent" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="description"
              disabled={isLoading}
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="The idea of this agent is to handle the emails to the user..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <Loader /> : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
