"use client";
import React, { useEffect, useState } from "react";
import Header from "../components/header";
import { Main } from "../components/main";
import { Button } from "@/components/ui/button";
import TitleSection from "../components/title-section";
import { FileText } from "lucide-react";
import CardPlan from "@/app/dashboard/plans/components/card-plan";
import { Plan } from "./services/types";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";
import { getAll } from "./services";

const PlansPage = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session, status: sessionStatus }: any = useSession();

  useEffect(() => {
    setIsLoading(true);

    if (session?.token) {
      fetchPlans();
    }
  }, [sessionStatus, session]);

  const fetchPlans = async () => {
    const plansData = await getAll(session?.token);
    setPlans(plansData);
    setIsLoading(false);
  };

  const emptyCardsCount = plans.length < 4 ? 4 - plans.length : 0;

  return (
    <>
      <Header fixed>
        <div className="ml-auto flex items-center space-x-4">
          <Button
            size="icon"
            className="bg-orange-500 text-white rounded-full hover:bg-orange-400 cursor-pointer"
          >
            ES
          </Button>
        </div>
      </Header>
      <Main>
        <TitleSection
          title="Planes"
          description="Aquí puedes ver un resumen de tus deudas y pagos."
          icon={<FileText color="white" />}
          subDescription="Planes y suscripciones"
        />
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
          <div className="w-full h-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {isLoading ? (
                Array(4)
                  .fill(0)
                  .map((_, index) => (
                    <Skeleton key={`skeleton-${index}`} className="h-[450px] w-full" />
                  ))
              ) : (
                <>
                  {plans.length > 0 && plans.map(plan => <CardPlan key={plan.id} plan={plan} />)}

                  {Array(emptyCardsCount ?? 0)
                    .fill(0)
                    .map((_, index) => (
                      <CardPlan key={`empty-${index}`} isEmpty={true} />
                    ))}
                </>
              )}
            </div>
          </div>
        </div>
      </Main>
    </>
  );
};

export default PlansPage;
