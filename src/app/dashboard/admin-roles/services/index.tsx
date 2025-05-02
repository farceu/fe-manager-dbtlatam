import { Role } from "../../admin-users/services/types";

export const getAll = async (accessToken: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/roles  `, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch roles");
  }

  return response.json();
};

export const create = async (accessToken: string, role: Role) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/roles`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(role),
  });

  if (!response.ok) {
    throw new Error("Failed to create role");
  }

  return response.json();
};
