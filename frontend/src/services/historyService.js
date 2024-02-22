import { api } from "./api";

export async function getUserHistory({user_id,availability,equipment_code}) {
  const response = await api.get(`/history/users`,{
    params: {
      user_id: user_id,
      availability : availability,
      equipment_code: equipment_code,
    }
  });
  return response.data;
}
