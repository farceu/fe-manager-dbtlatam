"use client";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandList } from "@/components/ui/command";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { LLMProvidersType, Model } from "@/mock/model";
import { PopoverProps } from "@radix-ui/react-popover";
import { ChevronsUpDown } from "lucide-react";
import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import CustomCommandItem from "../CustomCommandItem";

interface ModelSelectorProps extends PopoverProps {
  providers: readonly LLMProvidersType[];
  models: Model[];
  disabled?: boolean;
}

export default function LLMProviderSelect({
  models,
  providers,
  disabled,
  ...props
}: ModelSelectorProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedProvider, setSelectedProvider] = React.useState<LLMProvidersType>(providers[0]);
  const [peekedProvider, setPeekedProvider] = React.useState<LLMProvidersType>(providers[0]);
  const form = useFormContext();

  const [container, setContainer] = React.useState<HTMLElement | null>(null);
  const provider = form.watch("provider_name");
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
          <Label htmlFor="model">LLM Provider</Label>
        </HoverCardTrigger>
        <HoverCardContent align="start" className="w-[260px] text-sm" side="left">
          The LLM provider which will generate the completion. Some providers are suitable for
          natural language tasks, others specialize in code. Learn more.
        </HoverCardContent>
      </HoverCard>
      <FormField
        control={form.control}
        name="provider_name"
        render={({ field }) => (
          <FormItem className="space-y-1">
            <Popover open={open} onOpenChange={setOpen} {...props}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    aria-label="Select a model"
                    className="w-full justify-between"
                    disabled={disabled}
                  >
                    {provider}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-[250px] p-0" container={container}>
                <HoverCard>
                  <HoverCardContent side="left" align="start" forceMount className="min-h-[280px]">
                    <div className="grid gap-2">
                      <h4 className="font-medium leading-none">{peekedProvider}</h4>
                      <div className="text-sm text-muted-foreground">{peekedProvider}</div>
                      {/* {peekedProvider.strengths ? (
                        <div className="mt-4 grid gap-2">
                          <h5 className="text-sm font-medium leading-none">Strengths</h5>
                          <ul className="text-sm text-muted-foreground">
                            {peekedProvider.strengths}
                          </ul>
                        </div>
                      ) : null} */}
                    </div>
                  </HoverCardContent>

                  <Command loop>
                    <CommandList className="h-[var(--cmdk-list-height)] max-h-[400px]">
                      <CommandEmpty>No Models found.</CommandEmpty>
                      <HoverCardTrigger />
                      {providers.map(provider => (
                        <CustomCommandItem
                          key={provider}
                          value={provider}
                          isSelected={selectedProvider === provider}
                          onPeek={_providerOnPeak => setPeekedProvider(provider)}
                          onSelect={() => {
                            form.setValue("provider_name", provider);
                            form.setValue("model", null);
                            setSelectedProvider(provider);
                            setOpen(false);
                          }}
                        />
                      ))}
                    </CommandList>
                  </Command>
                </HoverCard>
              </PopoverContent>
            </Popover>
          </FormItem>
        )}
      />
    </div>
  );
}
