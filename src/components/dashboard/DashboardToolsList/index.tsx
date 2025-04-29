"use client";
import Loader from "@/components/Loader";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import useCreateTool from "@/hooks/useCreateTool";
import useGetToolsList from "@/hooks/useGetToolsList";
import { ToolFormValues, ToolModel } from "@/models/tools";
import { updateTool } from "@/services/tools";
import { useDashboard } from "@/stores/dashboard/dashboardStore";
import { useState } from "react";
import { toast } from "sonner";
import { CreateToolForm } from "../components/CreateToolForm";
import { DashboardLayout } from "../DashboardLayout";
import ToolsTable from "./components/ToolsTable.tsx";

export default function DashboardToolsList() {
  const { tools } = useGetToolsList();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTool, setCurrentTool] = useState<ToolModel | null>(null);
  const {
    form,
    headerFields,
    parameterFields,
    handleAddHeader,
    handleAddParameter,
    onFormSubmit,
    removeHeader,
    removeParameter,
    isLoading,
    setIsLoading,
  } = useCreateTool({
    tool: currentTool,
  });
  const { tools: toolsDataDashboard, setTools } = useDashboard();
  const handleEditClick = (tool: ToolModel) => {
    setCurrentTool(tool);
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
    setCurrentTool(null);
  };

  const handleFormSubmit = (data: ToolFormValues) => {
    if (currentTool) {
      setIsLoading(true);

      updateTool({ ...data, id: currentTool.id, project_id: currentTool.project_id })
        .then(res => {
          if (res.error) {
            throw new Error(res.error.message);
          }

          setTools(toolsDataDashboard.map(tool => (tool.id === currentTool.id ? res.data : tool)));
          toast.success("Tool updated successfully");
          setSidebarOpen(false);
        })
        .catch(err => {
          console.log(err);
          toast.error("Error updating tool");
        })
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <DashboardLayout>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Tools</h1>
            <p className="text-muted-foreground">Here&apos;s a list of your tools.</p>
          </div>

          <Separator className="shadow" />

          <ToolsTable tools={tools} onEdit={handleEditClick} />

          <Sheet open={sidebarOpen} onOpenChange={open => !open && handleSidebarClose()}>
            <SheetContent className="sm:max-w-md lg:max-w-lg overflow-y-auto h-full">
              <SheetHeader>
                <SheetTitle>Edit tool</SheetTitle>
              </SheetHeader>

              <div className="p-4 h-full">
                <CreateToolForm
                  tool={currentTool}
                  onSubmit={handleFormSubmit}
                  isLoading={isLoading}
                  form={form}
                  headerFields={headerFields}
                  parameterFields={parameterFields}
                  handleAddHeader={handleAddHeader}
                  handleAddParameter={handleAddParameter}
                  onFormSubmit={onFormSubmit}
                  removeHeader={removeHeader}
                  removeParameter={removeParameter}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      )}
    </DashboardLayout>
  );
}
