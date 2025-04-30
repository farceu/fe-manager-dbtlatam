"use client";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  fixed?: boolean;
  ref?: React.Ref<HTMLElement>;
}

const Header = ({ className, fixed, children, ...props }: HeaderProps) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setOffset(document.body.scrollTop || document.documentElement.scrollTop);
    };

    // Add scroll listener to the body
    document.addEventListener("scroll", onScroll, { passive: true });

    // Clean up the event listener on unmount
    return () => document.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "bg-background flex h-16 items-center gap-3 p-4 sm:gap-4",
        fixed && "header-fixed peer/header fixed z-50 w-[inherit] rounded-md",
        offset > 10 && fixed ? "shadow-sm" : "shadow-none",
        className
      )}
    >
      <SidebarTrigger
        variant="outline"
        className="bg-[#2F6EFF] text-white scale-120 hover:bg-primary/90 border-none"
      />
      <Separator orientation="vertical" className="h-6" />
      {children}
    </header>
  );
};

export default Header;
