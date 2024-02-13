import { api } from "./api";

export async function indexUsers(page) {
  const response = await api.get("/users", {
    params: {
      page: page,
    },
  });
  return response.data;
}

export async function getUser(user_id) {
  const response = await api.get(`/users/${user_id}`);
  return response.data;
}

export async function createUser(formData) {
  const response = await api.post(`/users`, formData);
  return response.data;
}

export async function updateUser({ user_id, formData }) {
  const response = await api.put(`/users/${user_id}`, formData);
  return response.data;
}

export async function destroyUser(user_id) {
  const response = await api.delete(`/users/${user_id}`);
  return response.data;
}
