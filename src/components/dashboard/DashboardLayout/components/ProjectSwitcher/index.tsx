import CreateProjectModal from "@/components/dashboard/CreateProjectModal";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useDashboard } from "@/stores/dashboard/dashboardStore";
import { ChevronsUpDown, Command, Plus } from "lucide-react";
import { useState } from "react";
import ProjectList from "./components/ProjectLists";

export function ProjectSwitcher() {
  const { isMobile } = useSidebar();
  const { project, allProjects } = useDashboard();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{project?.name}</span>
                  {/* <span className="truncate text-xs">{activeProject.plan}</span> */}
                </div>
                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              align="start"
              side={isMobile ? "bottom" : "right"}
              sideOffset={4}
            >
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Projects
              </DropdownMenuLabel>
              <ProjectList projects={allProjects} />
              <DropdownMenuSeparator />
              <DialogTrigger asChild>
                <DropdownMenuItem>
                  <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                    <Plus className="size-4" />
                  </div>
                  <div className="font-medium text-muted-foreground">Create project</div>
                </DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>

          <CreateProjectModal setIsOpen={setIsOpen} />
        </Dialog>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
