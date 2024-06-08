import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useConvexAuth } from "convex/react";
import React, { useState, useEffect } from "react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Spinner } from "@/components/spinner";


interface DropDownMenuProps {
  onClose: () => void;
}

const DropdownMenu: React.FC<DropDownMenuProps> = ({ onClose }) => {
  const handleLinkClick = () => {
    onClose();
  };
  useEffect(() => {
    setIsClient(true);
  }, []);

  const { isAuthenticated, isLoading } = useConvexAuth();
  const [isClient, setIsClient] = useState(false);

  return (
    <div className="w-screen h-screen bg-white  px-4 items-center justify-center absolute  right-0 xl:hidden">
      <div className="pt-12">
        <div className="  space-y-4 flex flex-col px-4">

          {isClient && isLoading && <Spinner />}
          {isClient && !isAuthenticated && !isLoading && (
            <>

              <SignInButton mode="modal">

                <Button
                  className="
                  w-full"
                >
                  Get NoteWave free
                </Button>

              </SignInButton>
              <SignInButton mode="modal">

                <Button
                  variant={"outline"}
                  className="w-full text-white"

                >
                  Log in
                </Button>
              </SignInButton>
            </>
          )}
          {isClient && isAuthenticated && !isLoading && (
            <>
              <Button
                  className="
                  w-full"
                >
                <Link href="/documents">Enter NoteWave</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DropdownMenu;
