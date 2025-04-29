"use client";

import { PopoverProps } from "@radix-ui/react-popover";
import { ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandInput, CommandList } from "@/components/ui/command";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { FormControl, FormField } from "@/components/ui/form";
import { Model, ModelType } from "@/mock/model";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import CustomCommandItem from "../CustomCommandItem";

interface ModelSelectorProps extends PopoverProps {
  types: readonly ModelType[];
  models: Model[];
  disabled?: boolean;
}

export function ModelSelector({ models, types, disabled, ...props }: ModelSelectorProps) {
  const [open, setOpen] = React.useState(false);
  // const [selectedModel, setSelectedModel] = React.useState<ModelNames>(models[0].name);
  const [peekedModel, setPeekedModel] = React.useState<Model>(models[0]);
  const form = useFormContext();
  const [container, setContainer] = React.useState<HTMLElement | null>(null);
  const provider = form.watch("provider_name");
  const modelName = form.watch("model");

  useEffect(() => {
    const getContainer = document.getElementById("agent-playground");
    if (getContainer) {
      setContainer(getContainer);
    }
  }, []);

  return (
    <div className="grid gap-2">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <Label htmlFor="model">Model</Label>
        </HoverCardTrigger>
        <HoverCardContent align="start" className="w-[260px] text-sm" side="left">
          The model which will generate the completion. Some models are suitable for natural
          language tasks, others specialize in code. Learn more.
        </HoverCardContent>
      </HoverCard>
      <FormField
        control={form.control}
        name="model"
        render={({ field }) => (
          <Popover open={open} onOpenChange={setOpen} {...props}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  disabled={!provider || disabled}
                  aria-expanded={open}
                  aria-label="Select a model"
                  className="w-full justify-between"
                >
                  {modelName}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-[250px] p-0" container={container}>
              <HoverCard>
                <HoverCardContent side="left" align="start" forceMount className="min-h-[280px]">
                  <div className="grid gap-2">
                    <h4 className="font-medium leading-none">{peekedModel.name}</h4>
                    <div className="text-sm text-muted-foreground">{peekedModel.description}</div>
                    {peekedModel.strengths ? (
                      <div className="mt-4 grid gap-2">
                        <h5 className="text-sm font-medium leading-none">Strengths</h5>
                        <ul className="text-sm text-muted-foreground">{peekedModel.strengths}</ul>
                      </div>
                    ) : null}
                  </div>
                </HoverCardContent>
                <Command loop>
                  <CommandList className="h-[var(--cmdk-list-height)] max-h-[400px]">
                    <CommandInput placeholder="Search Models..." />
                    <CommandEmpty>No Models found.</CommandEmpty>
                    <HoverCardTrigger />
                    {models
                      .filter(model => model.provider === provider)
                      .map(model => (
                        <CustomCommandItem
                          key={model.id}
                          value={model.name}
                          isSelected={modelName === model.name}
                          onPeek={modelOnPeek => setPeekedModel(model.name as any)}
                          onSelect={() => {
                            form.setValue("model", model.name);
                            setOpen(false);
                          }}
                        />
                      ))}
                  </CommandList>
                </Command>
              </HoverCard>
            </PopoverContent>
          </Popover>
        )}
      />
    </div>
  );
}
