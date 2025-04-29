"use client";
import DeleteAgentButton from "@/components/DeleteAgentButton";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import useAgentDetail from "@/hooks/useAgentDetail";
import { lLMProviders, models, types } from "@/mock/model";
import LLMProviderSelect from "../AgentPlayground/components/LLMProviderSelect";
import { ModelSelector } from "../AgentPlayground/components/ModelSelector";
import { DashboardLayout } from "../DashboardLayout";
import AgentDetailToolsTable from "./components/AgentDetailToolsTable";

export default function DashboardAgentDetail() {
  const { form, isEditing, onSubmit, setIsEditing, isLoading, agentId, projectId, agent } =
    useAgentDetail();

  return (
    <DashboardLayout>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight">Agent</h1>
                  <p className="text-muted-foreground">Here&apos;s your agent details.</p>
                </div>
                <div className="flex gap-2">
                  {!isEditing && (
                    <>
                      <Button onClick={() => setIsEditing(true)}>Edit</Button>
                      <DeleteAgentButton agentId={agentId} projectId={projectId} />
                    </>
                  )}
                  {isEditing && (
                    <>
                      <Button onClick={() => setIsEditing(false)}>Cancel</Button>
                      <Button type="submit">Save</Button>
                    </>
                  )}
                </div>
              </div>
              <Separator className="shadow" />

              <Tabs defaultValue="details">
                <TabsList>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="tools"> Tools</TabsTrigger>
                </TabsList>
                <TabsContent value="details">
                  <div className="flex flex-col gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      disabled={!isEditing}
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Customer Support Agent" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      disabled={!isEditing}
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
                    <div className="flex gap-4">
                      <LLMProviderSelect
                        providers={lLMProviders}
                        models={models}
                        disabled={!isEditing}
                      />
                      <ModelSelector types={types} models={models} disabled={!isEditing} />
                    </div>
                    <FormField
                      control={form.control}
                      name="system_prompt"
                      disabled={!isEditing}
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel>System Prompt</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Write your prompt here"
                              className="min-h-[400px] flex-1 p-4 md:min-h-[300px] lg:min-h-[400px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="tools">
                  <AgentDetailToolsTable agent={agent} isEditing={isEditing} />
                  {/* <div className="rounded-md border">
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
                              {agent?.tools?.length === 0 ? (
                                <TableRow>
                                  <TableCell
                                    colSpan={6}
                                    className="text-center py-6 text-muted-foreground"
                                  >
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
                                                      ? field.onChange([
                                                          ...(field.value || []),
                                                          tool.id,
                                                        ])
                                                      : field.onChange(
                                                          (field.value || []).filter(
                                                            value => value !== tool.id
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

                                    <TableCell className="font-medium">
                                      {tool.tool_id.name}
                                    </TableCell>
                                    <TableCell className="max-w-xs truncate">
                                      {tool.tool_id.description}
                                    </TableCell>
                                    <TableCell>{tool.tool_id.method}</TableCell>
                                    <TableCell>{formatDate(tool.tool_id.created_at)}</TableCell>
                                    <TableCell>{formatDate(tool.tool_id.updated_at)}</TableCell>
                                  </TableRow>
                                ))
                              )}
                            </TableBody>
                          </Table>
                        </FormItem>
                      )}
                    />
                  </div> */}
                </TabsContent>
              </Tabs>
            </form>
          </Form>
        </>
      )}
    </DashboardLayout>
  );
}
