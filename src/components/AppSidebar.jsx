// @ts-nocheck
import React, { useState } from "react";
import { VersionSwitcher } from "@/components/VersionSwitcher";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarRail, 
  useSidebar 
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import { HandCoins, IndianRupee, LayoutDashboard } from "lucide-react";

function AppSidebar({ ...props }) {
  const location = useLocation();
  const [expanded, setExpanded] = useState(null);
  const { setOpenMobile } = useSidebar();

  const handleExpand = (title) => {
    setExpanded(expanded === title ? null : title);
  };

  const navMain = [
    {
      title: "Menu",
      url: "#",
      items: [
        { title: "Dashboard", url: "/dashboard", icon:LayoutDashboard , isActive: location.pathname === "/dashboard" },
        { title: "Transaction", url: "/transaction", icon:IndianRupee, isActive: location.pathname === "/transaction" },
        { title: "Budget", url: "/budgetForm", icon: HandCoins, isActive: location.pathname === "/budgetForm" },
        
      ],
    },
  ];

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher />
      </SidebarHeader>
      <SidebarContent>
        {navMain.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupContent>
              <SidebarMenu className="gap-3">
                {group.items.map((item, i) => {
                  const IconComponent = item.icon;
                  return (
                    <React.Fragment key={i}>
                      <SidebarMenuItem className="px-[5px]">
                        <Link
                          to={item.url}
                          className={`flex gap-4 items-center px-4 py-2 rounded-md transition-all text-sm ${
                            item.isActive ? "bg-primary-light text-primary" : "text-muted hover:bg-gray-100"
                          }`}
                          onClick={() => {
                            item.Children && handleExpand(item.title);
                            setOpenMobile(false);
                          }}
                        >
                          <IconComponent className={`w-5 h-5 transition-all ${item.isActive ? "text-primary" : "text-gray-500"}`} />
                          {item.title}
                        </Link>
                      </SidebarMenuItem>
                      {item.Children && expanded === item.title && (
                        <div className="ml-6">
                          {item.Children.map((child, j) => (
                            <SidebarMenuItem key={j} className="px-[5px]">
                              <Link
                                onClick={() => setOpenMobile(false)}
                                to={child.url}
                                className={`flex gap-4 items-center px-4 py-2 rounded-md transition-all text-sm ${
                                  child.isActive ? "bg-primary-light text-primary" : "text-muted hover:bg-gray-100"
                                }`}
                              >
                                <child.icon className={`w-5 h-5 transition-all ${child.isActive ? "text-primary" : "text-gray-500"}`} />
                                {child.title}
                              </Link>
                            </SidebarMenuItem>
                          ))}
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

export default AppSidebar;
