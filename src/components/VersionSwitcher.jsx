// @ts-nocheck
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import Logo from "@/assets/images/logo.jpg";

export function VersionSwitcher() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div>
          <img className="w-[120px]  mix-blend-multiply ml-5" src={Logo} alt="IPass Logo" />
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
