import Loader from "@/components/Loader";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useGetProjectId from "@/hooks/useGetProjectId";
import { ToolModel } from "@/models/tools";
import { deleteTool } from "@/services/tools";
import { useDashboard } from "@/stores/dashboard/dashboardStore";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ToolsTableProps {
  tools: ToolModel[];
  onEdit: (tool: ToolModel) => void;
}

const ToolsTable = ({ tools, onEdit }: ToolsTableProps) => {
  const [toolToDelete, setToolToDelete] = useState<ToolModel | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const projectId = useGetProjectId();
  const { tools: toolsDataDashboard, setTools } = useDashboard();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDeleteConfirm = async () => {
    if (toolToDelete) {
      setIsDeleting(true);
      await deleteTool(toolToDelete.id, projectId)
        .then(res => {
          if (res.error) {
            throw new Error(res.error.message);
          }
          toast.success("Tool deleted successfully");
          setTools(toolsDataDashboard.filter(tool => tool.id !== toolToDelete.id));
        })
        .catch(err => {
          console.log(err);
          toast.error("Error deleting tool");
        })
        .finally(() => setIsDeleting(false));

      setToolToDelete(null);
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tools.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                No tools available
              </TableCell>
            </TableRow>
          ) : (
            tools.map(tool => (
              <TableRow key={tool.id}>
                <TableCell className="font-medium">{tool.name}</TableCell>
                <TableCell className="max-w-xs truncate">{tool.description}</TableCell>
                <TableCell>{tool.method}</TableCell>
                <TableCell>{formatDate(tool.created_at)}</TableCell>
                <TableCell>{formatDate(tool.updated_at)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" size="icon" onClick={() => onEdit(tool)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => setToolToDelete(tool)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action will permanently delete the tool "{toolToDelete?.name}".
                            This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel
                            onClick={() => setToolToDelete(null)}
                            disabled={isDeleting}
                          >
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction onClick={handleDeleteConfirm} disabled={isDeleting}>
                            {isDeleting ? <Loader /> : "Delete"}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ToolsTable;
