"use client";
import React from "react";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <section className="sticky left-0 top-0 h-screen w-fit flex flex-col justify-between text-white bg-1 p-6 pt-28 max-sm:hidden lg:w-[264px]">
      <div className="flex flex-col space-y-6 flex-1">
        {sidebarLinks.map((link) => {
          const isActive =
            pathname === link.route || pathname.startsWith(`${link.route}/`);
          return (
            <Link
              href={link.route}
              key={link.label}
              className={cn(
                "flex gap-4 p-4 rounded-lg justify-start items-center",
                {
                  'bg-blue-1': isActive,
                }
              )}
            >
                <Image
                    src={link.imgURL}
                    alt={link.label}
                    width={24}
                    height={24}
                />
                <p className="text-lg font-semibold max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Sidebar;
