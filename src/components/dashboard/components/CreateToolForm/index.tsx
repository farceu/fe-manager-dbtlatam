"use client";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CreateToolFormValues } from "@/hooks/useCreateTool";
import { ToolFormValues, ToolModel } from "@/models/tools";
import { Trash2 } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface ToolFormProps {
  tool?: ToolModel | null;
  onSubmit: (data: ToolFormValues) => void;
  isLoading: boolean;
  form: UseFormReturn<CreateToolFormValues>;
  headerFields: Record<string, any>[];
  parameterFields: Record<string, any>[];
  handleAddHeader: () => void;
  handleAddParameter: () => void;
  onFormSubmit: (data: CreateToolFormValues, onSubmit: (data: ToolFormValues) => void) => void;
  removeHeader: (index: number) => void;
  removeParameter: (index: number) => void;
}

export function CreateToolForm({
  tool,
  onSubmit,
  isLoading,
  form,
  headerFields,
  parameterFields,
  handleAddHeader,
  handleAddParameter,
  onFormSubmit,
  removeHeader,
  removeParameter,
}: ToolFormProps) {
  // const {
  //   form,
  //   headerFields,
  //   parameterFields,
  //   handleAddHeader,
  //   handleAddParameter,
  //   onFormSubmit,
  //   removeHeader,
  //   removeParameter,
  //   isLoading,
  // } = useCreateTool({ tool, onSubmit });
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(data => onFormSubmit(data, onSubmit))}
              className="space-y-6"
            >
              <div className="space-y-4">
                <div className="rounded-lg border p-4 bg-card">
                  <h2 className="font-semibold mb-1">Configuration</h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    Describe to the LLM how and when to use the tool.
                  </p>

                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormControl>
                            <Input placeholder="Tool name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormControl>
                            <Textarea
                              placeholder="Describe qué hace esta herramienta"
                              rows={4}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="method"
                        render={({ field }) => (
                          <FormItem className="space-y-1">
                            <Select value={field.value} onValueChange={field.onChange}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Method" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="GET">GET</SelectItem>
                                <SelectItem value="POST">POST</SelectItem>
                                <SelectItem value="PUT">PUT</SelectItem>
                                <SelectItem value="PATCH">PATCH</SelectItem>
                                <SelectItem value="DELETE">DELETE</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="col-span-2">
                        <FormField
                          control={form.control}
                          name="url"
                          render={({ field }) => (
                            <FormItem className="space-y-1">
                              <FormControl>
                                <Input placeholder="https://api.example.com/endpoint" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4 bg-card">
                  <h2 className="font-semibold mb-1">Headers</h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    Define the headers that will be sent with the request.
                  </p>

                  {headerFields.length > 0 && (
                    <div className="space-y-4 mb-4">
                      {headerFields.map((field, index) => (
                        <Card key={field.id} className="p-4">
                          <div key={field.id} className="grid gap-4">
                            <div className="grid grid-cols-2 gap-4 mb-2">
                              <FormField
                                control={form.control}
                                name={`headersList.${index}.name`}
                                render={({ field }) => (
                                  <FormItem className="space-y-1">
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Name of the header" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name={`headersList.${index}.value`}
                                render={({ field }) => (
                                  <FormItem className="space-y-1">
                                    <FormLabel>Value</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Value of the header" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <div className="flex gap-2">
                                <FormField
                                  control={form.control}
                                  name={`headersList.${index}.type`}
                                  render={({ field }) => (
                                    <FormItem className="space-y-1">
                                      <FormLabel>Type</FormLabel>
                                      <Select value={field.value} onValueChange={field.onChange}>
                                        <FormControl>
                                          <div className="flex gap-2">
                                            <SelectTrigger>
                                              <SelectValue placeholder="Select type" />
                                            </SelectTrigger>

                                            <Button
                                              type="button"
                                              variant="ghost"
                                              size="icon"
                                              className="shrink-0"
                                              onClick={() => removeHeader(index)}
                                            >
                                              <Trash2 className="h-4 w-4" />
                                            </Button>
                                          </div>
                                        </FormControl>
                                        <SelectContent>
                                          <SelectItem value="Value">Value</SelectItem>
                                        </SelectContent>
                                      </Select>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}

                  <div className="flex justify-end">
                    <Button type="button" variant="outline" size="sm" onClick={handleAddHeader}>
                      Add header
                    </Button>
                  </div>
                </div>

                <div className="rounded-lg border p-4 bg-card">
                  <h2 className="font-semibold mb-1">Parameters</h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    Define the parameters that the LLM will collect and send in the request.
                  </p>

                  {parameterFields.length > 0 && (
                    <div className="space-y-4 mb-4">
                      {parameterFields.map((field, index) => (
                        <Card key={field.id} className="p-4">
                          <div key={field.id} className="grid gap-4">
                            <div className="grid grid-cols-2 gap-4 mb-2">
                              <div>
                                <FormField
                                  control={form.control}
                                  name={`parametersList.${index}.name`}
                                  render={({ field }) => (
                                    <FormItem className="space-y-1">
                                      <FormLabel>Name</FormLabel>
                                      <FormControl>
                                        <Input placeholder="Name of the parameter" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                              <div>
                                <FormField
                                  control={form.control}
                                  name={`parametersList.${index}.type`}
                                  render={({ field }) => (
                                    <FormItem className="space-y-1">
                                      <FormLabel>Type</FormLabel>
                                      <Select value={field.value} onValueChange={field.onChange}>
                                        <FormControl>
                                          <SelectTrigger>
                                            <SelectValue placeholder="Select type" />
                                          </SelectTrigger>
                                        </FormControl>

                                        <SelectContent>
                                          <SelectItem value="string">String</SelectItem>
                                          <SelectItem value="number">Number</SelectItem>
                                          <SelectItem value="boolean">Boolean</SelectItem>
                                          <SelectItem value="array">Array</SelectItem>
                                          <SelectItem value="object">Object</SelectItem>
                                        </SelectContent>
                                      </Select>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <div className="flex-1">
                                <FormField
                                  control={form.control}
                                  name={`parametersList.${index}.description`}
                                  render={({ field }) => (
                                    <FormItem className="space-y-1">
                                      <FormLabel>Description</FormLabel>
                                      <div className="flex gap-2">
                                        <FormControl>
                                          <Input
                                            placeholder="Description of the parameter"
                                            {...field}
                                          />
                                        </FormControl>

                                        <Button
                                          type="button"
                                          variant="ghost"
                                          size="icon"
                                          className="shrink-0"
                                          onClick={() => removeParameter(index)}
                                        >
                                          <Trash2 className="h-4 w-4" />
                                        </Button>
                                      </div>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </div>
                            <div>
                              <FormField
                                control={form.control}
                                name={`parametersList.${index}.required`}
                                render={({ field }) => (
                                  <FormItem className="space-y-1">
                                    <div className="flex gap-2">
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value}
                                          onCheckedChange={field.onChange}
                                        />
                                      </FormControl>
                                      <FormLabel>Required</FormLabel>
                                    </div>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}

                  <div className="flex justify-end">
                    <Button type="button" variant="outline" size="sm" onClick={handleAddParameter}>
                      Add parameter
                    </Button>
                  </div>
                </div>

                <div className="rounded-lg border p-4 bg-card">
                  <h2 className="font-semibold mb-1">Secret / API Key</h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    If your API requires authentication, provide an API key. It will be sent in the
                    header <span className="font-bold">x-hubaiagent-secret</span> of the request.
                  </p>
                  <div>
                    <Input
                      id="secret"
                      {...form.register("secret")}
                      type="password"
                      placeholder="Introduce your secret API key"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                {/* <Button variant="outline" type="button" onClick={onCancel}>
            Cancel
          </Button> */}
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {tool ? "Update" : "Create"} tool
                </Button>
              </div>
            </form>
          </Form>
        </>
      )}
    </>
  );
}
