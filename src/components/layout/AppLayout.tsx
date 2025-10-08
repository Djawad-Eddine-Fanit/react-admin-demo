import { Outlet, NavLink, useLocation } from "react-router-dom";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarSeparator,
  SidebarRail,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  Users,
  Files,
  Home,
  UserRoundPlus,
  FilePlus2,
  Settings,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import * as React from "react";

interface NavItem {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
}

const navItems: NavItem[] = [
  { to: "/", label: "Dashboard", icon: Home },
  { to: "/users", label: "Users", icon: Users },
  { to: "/posts", label: "Posts", icon: Files },
];

const actionItems: NavItem[] = [
  { to: "/users/new", label: "Add User", icon: UserRoundPlus },
  { to: "/posts/new", label: "Add Post", icon: FilePlus2 },
];

const settingsItem: NavItem = {
  to: "/settings",
  label: "Settings",
  icon: Settings,
};

export function AppLayout() {
  const location = useLocation();

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        {/* Header */}
        <SidebarHeader>
          <div className="px-2 py-1.5 flex items-center gap-2 rounded-md bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-sidebar-border/60">
            <span className="font-semibold tracking-tight">Dashboard</span>
          </div>
        </SidebarHeader>

        {/* Content */}
        <SidebarContent>
          {/* Pages Section */}
          <SidebarGroup>
            <SidebarGroupLabel>Pages</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.to}>
                    <SidebarMenuButton
                      asChild
                      isActive={location.pathname === item.to}
                    >
                      <NavLink to={item.to} className="flex items-center gap-2">
                        <item.icon className="size-4" />
                        <span>{item.label}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Actions Section */}
          <SidebarGroup>
            <SidebarGroupLabel>Actions</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {actionItems.map((item) => (
                  <SidebarMenuItem key={item.to}>
                    <SidebarMenuButton
                      asChild
                      isActive={location.pathname === item.to}
                    >
                      <NavLink to={item.to} className="flex items-center gap-2">
                        <item.icon className="size-4" />
                        <span>{item.label}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarSeparator />

        {/* --- Settings at bottom --- */}
        <SidebarFooter>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === settingsItem.to}
                  >
                    <NavLink
                      to={settingsItem.to}
                      className="flex items-center gap-2"
                    >
                      <settingsItem.icon className="size-4" />
                      <span>{settingsItem.label}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>

      {/* Top bar + page outlet */}
      <SidebarInset>
        <div className="flex items-center gap-3 border-b px-4 h-14 bg-gradient-to-r from-background/80 via-background to-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
          <SidebarTrigger className="md:hidden" />
          <div className="flex-1 flex items-center gap-2">
            <h1 className="font-semibold tracking-tight text-sm md:text-base">
              Admin Dashboard
            </h1>
          </div>
          <ThemeToggle />
        </div>

        <div className={cn("flex-1 overflow-y-auto")}>
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default AppLayout;
