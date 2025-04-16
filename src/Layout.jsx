// @ts-nocheck
import React from "react";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import AppSidebar from "./components/AppSidebar";
import AppSearch from "./components/AppSearch";
import { Calendar } from "lucide-react";
import { Outlet } from "react-router-dom";
import AppDropdown from "./components/AppDropdown";

const Layout = () => {
  return (
    <div className="h-[99vh] w-full">
      <SidebarProvider>
        {/* {localStorage.getItem("mode") === "dashboard" ? */}
         <AppSidebar /> 
        {/* //  : null} */}
        <SidebarInset>
          <header className="flex justify-between sticky top-0 bg-white dark:bg-black dark:text-white dark:border-b dark:border-gray-600 h-14 shrink-0 items-center gap-2 px-4 font-poppins z-10">
            <div className="flex gap-3">
              {/* {localStorage.getItem("mode") === "home" && (
                <>
                  <AppDropdown />
                </>
              )} */}
              {/* {localStorage.getItem("mode") === "dashboard" &&  */}
              <SidebarTrigger 
              // className="-ml-1" 
              />
            </div>
            <div className="flex items-center gap-2">
              <AppSearch className="hidden md:block w-[260px]" />
              <div className="flex items-center gap-2">
                <Calendar className="h-[15px] w-[15px] text-blue" />
                <span className="text-xs font-poppins text-blue">{new Date().toDateString()}</span>
              </div>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 bg-gray-100 dark:bg-black dark:text-white">
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default Layout;
