"use client";

import * as React from "react";
import { useSession } from "next-auth/react";
import {
  IconDashboard,
  IconQuestionMark,
  IconHome,
  IconKey,
  IconStar,
} from "@tabler/icons-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./NavUser";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: IconDashboard,
    },
    {
      title: "Review Management",
      url: "#",
      icon: IconStar,
    },
    {
      title: "Realty Management",
      url: "#",
      icon: IconHome,
    },
    {
      title: "Rental Management",
      url: "#",
      icon: IconKey,
    },

    {
      title: "FAQ Management",
      url: "#",
      icon: IconQuestionMark,
    },
  ],
};

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  onSectionChange?: (section: string) => void;
  activeSection?: string;
}

export function AppSidebar({
  onSectionChange,
  activeSection,
  ...props
}: AppSidebarProps) {
  const { data: session } = useSession();

  const handleSectionClick = (section: string) => {
    if (onSectionChange) {
      onSectionChange(section);
    }
  };

  const updatedNavMain = data.navMain.map((item) => ({
    ...item,
    onClick: () => handleSectionClick(item.title),
    isActive: activeSection === item.title,
  }));

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconDashboard className="!size-5" />
                <span className="text-base font-semibold">
                  {session?.user?.name || "OFYS Admin"}
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={updatedNavMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={session?.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
