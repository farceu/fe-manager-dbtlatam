import Loader from "@/components/Loader";
import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useGetToolsList from "@/hooks/useGetToolsList";
import { formatDate } from "@/lib/formatDate";
import { AgentModel } from "@/models/agent";
import { useFormContext } from "react-hook-form";

interface AgentDetailToolsTableProps {
  agent: AgentModel | null;
  isEditing: boolean;
}

export default function AgentDetailToolsTable({ agent, isEditing }: AgentDetailToolsTableProps) {
  const form = useFormContext();
  const { tools, isLoading } = useGetToolsList();

  return (
    <div className="rounded-md border">
      {isLoading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <FormField
            control={form.control}
            name="tools"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormMessage />
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Select</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Updated</TableHead>
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
                      tools.map((tool: any) => (
                        <TableRow key={tool.id}>
                          <TableCell>
                            <FormField
                              control={form.control}
                              name="tools"
                              render={({ field }) => {
                                const isToolSelect = field.value?.includes(tool.id);

                                return (
                                  <FormItem
                                    key={tool.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        disabled={!isEditing}
                                        checked={isToolSelect}
                                        onCheckedChange={() => {
                                          return isToolSelect
                                            ? field.onChange(
                                                field.value?.filter(
                                                  (value: string) => value !== tool.id
                                                )
                                              )
                                            : field.onChange([...(field.value || []), tool.id]);
                                        }}
                                      />
                                    </FormControl>
                                  </FormItem>
                                );
                              }}
                            />
                          </TableCell>

                          <TableCell className="font-medium">{tool.name}</TableCell>
                          <TableCell className="max-w-xs truncate">{tool.description}</TableCell>
                          <TableCell>{tool.method}</TableCell>
                          <TableCell>{formatDate(tool.created_at)}</TableCell>
                          <TableCell>{formatDate(tool.updated_at)}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                  {/* <TableBody>
                    {agent?.tools?.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                          No tools available
                        </TableCell>
                      </TableRow>
                    ) : (
                      agent?.tools?.map((tool: any) => (
                        <TableRow key={tool.id}>
                          <TableCell>
                            <FormField
                              control={form.control}
                              name="tools"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={tool.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        disabled={!isEditing}
                                        checked={field.value?.includes(tool.id)}
                                        onCheckedChange={checked => {
                                          return checked
                                            ? field.onChange([...(field.value || []), tool.id])
                                            : field.onChange(
                                                (field.value || []).filter(
                                                  (value: string) => value !== tool.id
                                                )
                                              );
                                        }}
                                      />
                                    </FormControl>
                                  </FormItem>
                                );
                              }}
                            />
                          </TableCell>

                          <TableCell className="font-medium">{tool.tool_id.name}</TableCell>
                          <TableCell className="max-w-xs truncate">
                            {tool.tool_id.description}
                          </TableCell>
                          <TableCell>{tool.tool_id.method}</TableCell>
                          <TableCell>{formatDate(tool.tool_id.created_at)}</TableCell>
                          <TableCell>{formatDate(tool.tool_id.updated_at)}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody> */}
                </Table>
              </FormItem>
            )}
          />
        </>
      )}
    </div>
  );
}
