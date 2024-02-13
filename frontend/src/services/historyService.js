import { api } from "./api";

export async function getUserHistory(user_id) {
  const response = await api.get(`/history/users?user_id=${user_id}`);
  return response.data;
}
