import { User } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAll = async (accessToken: string) => {
  const response = await fetch(`${API_URL}/admin/users`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.json();
};

export const create = async (user: User, accessToken: string) => {
  const response = await fetch(`${API_URL}/admin/users`, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify(user),
  });
  return response.json();
};

export const update = async (id: string, user: Partial<User>, accessToken: string) => {
  const response = await fetch(`${API_URL}/admin/users/${id}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify(user),
  });
  return response.json();
};

export const deleteUser = async (userId: string, accessToken: string) => {
  const response = await fetch(`${API_URL}/admin/users/${userId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.json();
};

export const reinviteUser = async (email: string, accessToken: string) => {
  const response = await fetch(`${API_URL}/admin/users/reinvite`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify({ email }),
  });
  return response.json();
};
