import React from "react";
import Link from "next/link";
import Image from "next/image";
import MobileNav from "./MobileNav";
import { SignedIn, UserButton } from "@clerk/nextjs";
const Navbar = () => {
  return (
    <nav className="flex-between w-full px-6 py-4 fixed z-50 lg:px-10 bg-1">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/icons/logo.svg"
          alt="LocalMeet Logo"
          height={46}
          width={46}
          className="max-sm:size-10 lg:-ml-4"
        />
        <p className="text-white text-[26px] font-extrabold max-sm:hidden">
          LocalMeet
        </p>
      </Link>

      <div className="flex-between gap-5">
        {/* {Clerk } */}
        <SignedIn>
              <UserButton />
        </SignedIn>

        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
