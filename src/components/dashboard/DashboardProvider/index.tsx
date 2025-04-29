"use client";
import Loader from "@/components/Loader";
import useGetProjects from "@/hooks/useGetProjects";
import { supabase } from "@/services/supabase/supabaseClient";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function DashboardProvider({ children }: { children: React.ReactNode }) {
  const { isLoading } = useGetProjects();

  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      supabase.auth.setSession({
        access_token: session.access_token,
        refresh_token: session.refresh_token,
      });
    }
  }, [session]);

  if (isLoading) {
    return (
      <div className="h-screen w-screen ">
        <Loader />
      </div>
    );
  }

  return <>{children}</>;
}
