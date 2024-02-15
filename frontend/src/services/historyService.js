import { api } from "./api";

export async function getUserHistory({user_id,filter}) {
  const response = await api.get(`/history/users`,{
    params: {
      user_id: user_id,
      availability : filter,
    }
  });
  return response.data;
}
