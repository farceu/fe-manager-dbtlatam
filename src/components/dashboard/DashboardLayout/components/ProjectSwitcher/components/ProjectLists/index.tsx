import { DropdownMenuShortcut } from "@/components/ui/dropdown-menu";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Project } from "@/stores/dashboard/dashboardStore";
import { Command } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProjectList({ projects }: { projects: Project[] }) {
  const router = useRouter();

  const onClickProject = (project: Project) => {
    router.push(`/dashboard/${project.id}`);
  };

  if (projects.length === 0) {
    return (
      <div className="gap-2 p-2">
        <p>No projects found</p>
      </div>
    );
  }

  return (
    <>
      {projects.map((project, index) => (
        <DropdownMenuItem
          key={project.name}
          onClick={() => onClickProject(project)}
          className="gap-2 p-2"
        >
          <div className="flex size-6 items-center justify-center rounded-sm border">
            <Command className="size-4 shrink-0" />
          </div>
          {project.name}
          <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
        </DropdownMenuItem>
      ))}
    </>
  );
}
