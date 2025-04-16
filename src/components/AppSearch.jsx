// @ts-nocheck
import { Search } from "lucide-react";

import { Label } from "@/components/ui/label";
import { SidebarGroup, SidebarGroupContent, SidebarInput } from "@/components/ui/sidebar";

function AppSearch({ ...props }) {
  return (
    <form {...props}>
      <SidebarGroup className="py-0">
        <SidebarGroupContent className="relative">
        </SidebarGroupContent>
      </SidebarGroup>
    </form>
  );
}

export default AppSearch;
