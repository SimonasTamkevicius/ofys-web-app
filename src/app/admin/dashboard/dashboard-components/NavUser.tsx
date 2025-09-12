"use client";

import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { IconLogout, IconUser } from "@tabler/icons-react";

interface NavUserProps {
  user?: {
    name?: string | null;
    email?: string | null;
    avatar?: string | null;
  };
}

export function NavUser({ user }: NavUserProps) {
  const { data: session } = useSession();
  const currentUser = user || session?.user;

  const handleSignOut = () => {
    signOut({ callbackUrl: "/admin/login" });
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton className="w-full justify-start">
          <div className="flex items-center gap-2 w-full">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-medium">
              {currentUser?.name?.charAt(0)?.toUpperCase() ||
                currentUser?.email?.charAt(0)?.toUpperCase() || (
                  <IconUser className="w-4 h-4" />
                )}
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-sm font-medium truncate">
                {currentUser?.name || "User"}
              </span>
              <span className="text-xs text-muted-foreground truncate">
                {currentUser?.email || "user@example.com"}
              </span>
            </div>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSignOut}
          className="w-full justify-start"
        >
          <IconLogout className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
