"use client";

import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DATABASE_NAME, storageKeys, STORE_NAME } from "@/lib/utils";
import { openDB } from "idb";
export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: JSX.Element;
    isActive?: boolean;
    clearLocal?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const pathName = usePathname();
  const clearLocalStorage = async () => {
    // Clear localStorage items
    const keysToRemove = [
      storageKeys.formData,
      storageKeys.livenessData,
      storageKeys.licenseData,
      storageKeys.faceMatchingData,
      storageKeys.passportData,
    ];
    keysToRemove.forEach((key) => localStorage.removeItem(key));

    // Clear IndexedDB
    try {
      const db = await openDB(DATABASE_NAME);

      // Check if the object store exists
      if (db.objectStoreNames.contains(STORE_NAME)) {
        await db.clear(STORE_NAME); // Clear the object store
      } else {
        console.warn(`Object store "${STORE_NAME}" does not exist.`);
      }

      await db.close(); // Close the database connection
    } catch (error) {
      console.error("Error clearing IndexedDB:", error);
    }

    // Optional: Delete the entire database if needed
    try {
      const dbList = await indexedDB.databases(); // Get list of databases
      if (dbList.some((db) => db.name === DATABASE_NAME)) {
        await indexedDB.deleteDatabase(DATABASE_NAME); // Delete the database
        console.log(`IndexedDB "${DATABASE_NAME}" deleted successfully.`);
      }
    } catch (error) {
      console.error("Error deleting IndexedDB:", error);
    }
  };

  return (
    <SidebarGroup>
      {/* <SidebarGroupLabel>Platform</SidebarGroupLabel> */}
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.items?.some(
              (subItem) => subItem.url === pathName
            )}
            className="group/collapsible"
          >
            <SidebarMenuItem className="pb-1.5">
              <CollapsibleTrigger asChild>
                {!!item?.clearLocal ? (
                  <SidebarMenuButton
                    tooltip={item.title}
                    onClick={clearLocalStorage}
                  >
                    {item.icon && <span>{item.icon}</span>}
                    {item.url !== "#" ? (
                      <Link href={item.url}>
                        <span
                          // className="text-[16px] font-medium"
                          className={`${
                            pathName === item.url
                              ? "text-primary bg-primary/5 rounded-l-none text-[16px] font-medium"
                              : "bg-transparent rounded-l-none text-[16px] font-medium"
                          }`}
                        >
                          {item.title}
                        </span>
                      </Link>
                    ) : (
                      <span className="text-[16px] font-medium">
                        {item.title}
                      </span>
                    )}
                    {item.items && item.items.length > 0 ? (
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    ) : null}
                  </SidebarMenuButton>
                ) : (
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <span>{item.icon}</span>}
                    {item.url !== "#" ? (
                      <Link href={item.url}>
                        <span
                          // className="text-[16px] font-medium"
                          className={`${
                            pathName === item.url
                              ? "text-primary bg-primary/5 rounded-l-none text-[16px] font-medium"
                              : "bg-transparent rounded-l-none text-[16px] font-medium"
                          }`}
                        >
                          {item.title}
                        </span>
                      </Link>
                    ) : (
                      <span className="text-[16px] font-medium">
                        {item.title}
                      </span>
                    )}
                    {item.items && item.items.length > 0 ? (
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    ) : null}
                  </SidebarMenuButton>
                )}
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub className="my-2">
                  {item.items?.map((subItem) => {
                    return (
                      <SidebarMenuSubItem
                        key={subItem.title}
                        className={`${
                          pathName === subItem.url
                            ? "border-l-2 border-primary"
                            : ""
                        }`}
                      >
                        <SidebarMenuSubButton
                          className={`${
                            pathName === subItem.url
                              ? "text-primary bg-primary/5 rounded-l-none"
                              : "text-black bg-transparent rounded-l-none"
                          }`}
                          asChild
                        >
                          <Link href={subItem.url}>
                            <span className="text-[16px] font-normal">
                              {subItem.title}
                            </span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    );
                  })}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
