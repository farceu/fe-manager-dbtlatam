"use client";
import { Separator } from "@/components/ui/separator";
import useCreateTool from "@/hooks/useCreateTool";
import useGetProjectId from "@/hooks/useGetProjectId";
import { ToolFormValues } from "@/models/tools";
import { createTool } from "@/services/tools";
import { useDashboard } from "@/stores/dashboard/dashboardStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { DashboardLayout } from "../DashboardLayout";
import { CreateToolForm } from "../components/CreateToolForm";

export default function DashboardToolCreate() {
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
    tool: null,
  });
  const { tools, setTools } = useDashboard();
  const router = useRouter();
  const projectId = useGetProjectId();
  const onCreateTool = (data: ToolFormValues) => {
    setIsLoading(true);
    createTool({ ...data, project_id: projectId })
      .then(res => {
        if (res.error) {
          throw new Error(res.error.message);
        }

        if (tools.length === 0) {
          setTools([res.data]);
        } else {
          setTools([...tools, res.data]);
        }

        toast.success("Tool created successfully");
        router.push(`/dashboard/${projectId}/tools`);
      })
      .catch(err => {
        console.log(err);
        toast.error("Error creating tool", {
          description: err.message,
        });
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Create Tool</h1>
          <p className="text-muted-foreground">Here&apos;s your will create a new tool.</p>
        </div>
        <Separator className="shadow" />
      </div>

      <CreateToolForm
        onFormSubmit={onFormSubmit}
        onSubmit={onCreateTool}
        isLoading={isLoading}
        form={form}
        headerFields={headerFields}
        parameterFields={parameterFields}
        handleAddHeader={handleAddHeader}
        handleAddParameter={handleAddParameter}
        removeHeader={removeHeader}
        removeParameter={removeParameter}
      />
    </DashboardLayout>
  );
}
