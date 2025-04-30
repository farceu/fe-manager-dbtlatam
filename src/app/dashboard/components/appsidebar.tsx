import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";
import React from "react";
import { sidebarData } from "../data";
import { NavGroup } from "./nav-group";
import { ProfileDropdown } from "./profile-dropdown";
const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar collapsible="icon" variant="floating" {...props}>
      <SidebarHeader className="bg-primary text-white rounded-md rounded-b-none border-none">
        LOGO
      </SidebarHeader>
      <SidebarContent className="bg-primary text-white">
        {sidebarData.navGroups.map(props => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarFooter className="bg-primary text-white rounded-md rounded-t-none">
        <ProfileDropdown />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
