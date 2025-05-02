import { Plan } from "./types";

export const getAll = async (accessToken: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/system-plans`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.json();
};

export const create = async (plan: Plan, accessToken: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/system-plans/create`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(plan),
  });
  return response.json();
};

export const update = async (planId: string, plan: Partial<Plan>, accessToken: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/system-plans/${planId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(plan),
  });
  return response.json();
};

export const getSystemResources = async (accessToken: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/system-resources`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.json();
};

export const deletePlan = async (planId: string, accessToken: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/system-plans/${planId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.json();
};
