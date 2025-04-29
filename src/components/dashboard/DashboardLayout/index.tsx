"use client";
import { Search } from "@/components/Search";
import { ThemeSwitch } from "@/components/ThemeSwitch";
import useGetProjectId from "@/hooks/useGetProjectId";
import { cn } from "@/lib/utils";
import { ChatWidget } from "@/models/chatWidgets";
import { ToolModel } from "@/models/tools";
import { getAgentsByProjectId } from "@/services/agents";
import { getChatWidgetsByProjectId } from "@/services/chat_widgets";
import { getToolsByProjectId } from "@/services/tools";
import { useDashboard } from "@/stores/dashboard/dashboardStore";
import { useEffect } from "react";
import { AppSidebar } from "./components/AppSidebar";
import { Header } from "./components/Header";
import { TopNav } from "./components/Header/TopNav";
import { Main } from "./components/Main";
import { ProfileDropdown } from "./components/ProfileDropdown";
const topNav = [
  {
    title: "Overview",
    href: "dashboard/overview",
    isActive: true,
    disabled: false,
  },
  {
    title: "Customers",
    href: "dashboard/customers",
    isActive: false,
    disabled: true,
  },
  {
    title: "Products",
    href: "dashboard/products",
    isActive: false,
    disabled: true,
  },
  {
    title: "Settings",
    href: "dashboard/settings",
    isActive: false,
    disabled: true,
  },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const projectId = useGetProjectId();
  const {
    setAgents,
    setProjectId,
    projectId: projectIdStore,
    setTools,
    setChatWidgets,
  } = useDashboard();
  useEffect(() => {
    if (projectId !== projectIdStore) {
      getAgentsByProjectId(projectId)
        .then(res => {
          if (res.error) {
            throw new Error(res.error.message);
          }
          setAgents(res.data as any);
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {});

      getToolsByProjectId(projectId)
        .then(res => {
          setTools(res.data as ToolModel[]);
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {});

      getChatWidgetsByProjectId(projectId)
        .then(res => {
          setChatWidgets(res.data as ChatWidget[]);
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {});
      setProjectId(projectId);
    }
  }, [projectId]);

  return (
    <>
      <AppSidebar />
      <div
        id="content"
        className={cn(
          "ml-auto w-full max-w-full",
          "peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]",
          "peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]",
          "transition-[width] duration-200 ease-linear",
          "flex h-svh flex-col",
          "group-data-[scroll-locked=1]/body:h-full",
          "group-data-[scroll-locked=1]/body:has-[main.fixed-main]:h-svh"
        )}
      >
        <Header>
          <TopNav links={topNav} />
          <div className="ml-auto flex items-center space-x-4">
            <Search />
            <ThemeSwitch />
            <ProfileDropdown />
          </div>
        </Header>
        <Main>{children}</Main>
      </div>
    </>
  );
}
