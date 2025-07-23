"use client";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import Image from "next/image";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const MobileNav = () => {
  const pathname = usePathname();
  return (
    <section className="w-full max-w-[256px]">
      <Sheet>
        <SheetTrigger asChild>
          <Image
            src="/icons/hamburger.svg"
            alt="hamburger icon"
            width={36}
            height={36}
            className="cursor-pointer sm:hidden"
          />
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-1 p-4">
          <Link href="/" className="flex items-center gap-1">
            <Image
              src="/icons/logo.svg"
              alt="LocalMeet Logo"
              height={46}
              width={46}
              className="max-sm:size-10 lg:-ml-4"
            />
            <p className="text-white text-[26px] font-extrabold">LocalMeet</p>
          </Link>

          <div className="flex h-[calc(100vh - 72px)] flex-col justify-between  overflow-y-auto">
            <SheetClose asChild>
              <section className="flex flex-col h-full text-white gap-6 pt-16">
                {sidebarLinks.map((link,index) => {
                  const isActive =
                    pathname === link.route;
                  return (
                    <SheetClose asChild>
                      <Link
                        href={link.route}
                        key={index}
                        className={cn(
                          "flex gap-4 p-4 rounded-lg w-full max-w-60 items-center",
                          {
                            "bg-blue-1": isActive,
                          }
                        )}
                      >
                        <Image
                          src={link.imgURL}
                          alt={link.label}
                          width={20}
                          height={20}
                        />
                        <p className="font-semibold">
                          {link.label}
                        </p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </section>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
