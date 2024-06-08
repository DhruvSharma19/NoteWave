"use client";

import React, { useState, useEffect } from "react";
import { useConvexAuth } from "convex/react";
import { Button } from "@/components/ui/button";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Spinner } from "@/components/spinner";
import { X, AlignJustify } from "lucide-react";
import Link from "next/link";
import DropdownMenu from "./drop-down-menu";

const ActionButtons = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const closeDropdown = () => {
    setDropdownVisible(false);
  };

  return (
    <div className="pr-2">
      <div className="items-center justify-center flex">
        <div className="flex xl:space-x-4">
          {/* Uncomment and use if needed */}
          {/* <Link
            href={"/contact-sales"}
            className="lg:flex items-center hidden"
          >
            <div className="">Request a demo</div>
          </Link>

          <div className="font-thin lg:flex items-center hidden">|</div> */}
        </div>

        <div className="flex lg:space-x-4 items-center pr-4">
        {isClient && isLoading && <Spinner />}
          {isClient && !isAuthenticated && !isLoading && (
            <>
              <SignInButton mode="modal">
                <Button 
                 variant="outline" className="lg:flex items-center hidden border-none text-md text-white">
                  Log in
                </Button>
              </SignInButton>
              <SignInButton mode="modal">
                <Button className="hidden lg:block">
                  Get NoteWave free
                </Button>
              </SignInButton>
            </>
          )}
          {isClient && isAuthenticated && !isLoading && (
            <>
              <Button className="hidden lg:block">
                <Link href="/documents">Enter NoteWave</Link>
              </Button>
              <UserButton afterSignOutUrl="/" />
            </>
          )}
        </div>
      </div>

      {isClient && isDropdownVisible && (
        <div onClick={toggleDropdown} className="rounded-full xl:hidden">
          <X className="h-5 w-5 items-center justify-center rounded-full" />
        </div>
      )}
      {isClient && !isDropdownVisible && (
        <div onClick={toggleDropdown} className="flex lg:hidden">
          <AlignJustify className="h-6 w-6 items-center justify-center mr-2" />
        </div>
      )}

      {isClient && isDropdownVisible && <DropdownMenu onClose={closeDropdown} />}
    </div>
  );
};

export default ActionButtons;
