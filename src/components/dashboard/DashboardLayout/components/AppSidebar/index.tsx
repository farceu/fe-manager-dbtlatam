import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import useGetSidebarElements from "@/hooks/useGetSidebarElements";
import { useSession } from "next-auth/react";
import { NavGroup } from "../NavGroup";
import { NavUser } from "../NavUser";
import { ProjectSwitcher } from "../ProjectSwitcher";
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session }: any = useSession();
  const { sidebarElements } = useGetSidebarElements();

  const user = {
    name: session?.user?.name as string,
    email: session?.user?.email as string,
    last_name: session?.user?.last_name as string,
  };

  return (
    <Sidebar collapsible="icon" variant="floating" {...props}>
      <SidebarHeader>
        <ProjectSwitcher />
      </SidebarHeader>
      <SidebarContent>
        {sidebarElements.navGroups.map((props: any) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
