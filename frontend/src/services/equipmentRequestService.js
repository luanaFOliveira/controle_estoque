import { api } from "./api";

export async function indexEquipmentRequests({ filter, page }) {
  const response = await api.get(`/equipment-requests?page=${page}`, {
    params: filter,
  });
  return response.data;
}

export async function updateEquipmentRequest({ equipment_request_id, action }) {
  const response = await api.post(`/handle-equipment-request/${action}`, {
    equipment_request_id,
  });
  return response.data;
}
