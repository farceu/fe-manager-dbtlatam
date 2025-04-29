"use client";
import Loader from "@/components/Loader";
import { DashboardLayout } from "../DashboardLayout";

const appText = new Map<string, string>([
  ["all", "All Apps"],
  ["connected", "Connected"],
  ["notConnected", "Not Connected"],
]);

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import useGetAgentsLists from "@/hooks/useGetAgentsLists";
import {
  IconAdjustmentsHorizontal,
  IconBrandOpenai,
  IconSortAscendingLetters,
  IconSortDescendingLetters,
} from "@tabler/icons-react";
import Link from "next/link";

function AnthropicLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      height="24"
      width="24"
    >
      <path d="M13.79 3.932l6.433 16.136h3.528L17.317 3.932h-3.528Z" />
      <path d="M6.325 13.683l2.201-5.671 2.201 5.671H6.325ZM6.682 3.932L0.25 20.068h3.597l1.315-3.389h6.73l1.315 3.389h3.597L10.371 3.932H6.682Z" />
    </svg>
  );
}

function ProviderLogo({ provider }: { provider: string }) {
  switch (provider) {
    case "Anthropic":
      return <AnthropicLogo />;
    case "OpenAI":
      return <IconBrandOpenai />;

    default:
      return null;
  }
}

export default function DashboardAgentList() {
  const { isLoading, agents, sort, setSort, router, setSearchTerm, searchTerm, projectId } =
    useGetAgentsLists();
  return (
    <DashboardLayout>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Agents</h1>
            <p className="text-muted-foreground">Here&apos;s a list of your agents.</p>
          </div>
          <div className="my-4 flex items-end justify-between sm:my-0 sm:items-center">
            <div className="flex flex-col gap-4 sm:my-4 sm:flex-row">
              <Input
                placeholder="Filter apps..."
                className="h-9 w-40 lg:w-[250px]"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              {/* <Select value={appType} onValueChange={setAppType}>
                <SelectTrigger className="w-36">
                  <SelectValue>{appText.get(appType)}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Agents</SelectItem>
                  <SelectItem value="connected">Connected</SelectItem>
                  <SelectItem value="notConnected">Not Connected</SelectItem>
                </SelectContent>
              </Select> */}
            </div>

            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-16">
                <SelectValue>
                  <IconAdjustmentsHorizontal size={18} />
                </SelectValue>
              </SelectTrigger>
              <SelectContent align="end">
                <SelectItem value="ascending">
                  <div className="flex items-center gap-4">
                    <IconSortAscendingLetters size={16} />
                    <span>Ascending</span>
                  </div>
                </SelectItem>
                <SelectItem value="descending">
                  <div className="flex items-center gap-4">
                    <IconSortDescendingLetters size={16} />
                    <span>Descending</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Separator className="shadow" />
          {agents.length === 0 ? (
            <>
              <div className="flex flex-col items-center justify-center gap-4 h-full">
                <h1 className="text-2xl font-bold tracking-tight">No agents found</h1>
                <Button
                  onClick={() => {
                    router.push(`/dashboard/${projectId}/agents/create`);
                  }}
                >
                  Create Agent
                </Button>
              </div>
            </>
          ) : (
            <>
              <ul className="faded-bottom no-scrollbar grid gap-4 overflow-auto pb-16 pt-4 md:grid-cols-2 lg:grid-cols-3">
                {agents.map((agent: any) => (
                  <li key={agent.id} className="rounded-lg border p-4 hover:shadow-md">
                    <Link href={`/dashboard/${projectId}/agents/${agent.id}`}>
                      <div className="mb-8 flex items-center justify-between">
                        <div
                          className={`flex size-10 items-center justify-center rounded-lg bg-muted p-2`}
                        >
                          <ProviderLogo provider={agent.provider_name} />
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className={`${agent.connected ? "border border-blue-300 bg-blue-50 hover:bg-blue-100 dark:border-blue-700 dark:bg-blue-950 dark:hover:bg-blue-900" : ""}`}
                        >
                          {agent.model}
                        </Button>
                      </div>
                      <div>
                        <h2 className="mb-1 font-semibold">{agent.name}</h2>
                        <p className="line-clamp-2 text-gray-500">{agent.description}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </DashboardLayout>
  );
}
