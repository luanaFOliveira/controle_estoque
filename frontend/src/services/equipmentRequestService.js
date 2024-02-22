import {api, handleResponse} from "./api";

export async function indexEquipmentRequests({ filter, page }) {
  const response = await api.get(`/equipment-requests?page=${page}`, {
    params: filter,
  });
  return handleResponse(response);
}

export async function createEquipmentRequests({ formData }) {
  const response = await api.post(`/equipment-requests`, formData);
  return handleResponse(response);
}

export async function getRequestMotives() {
  const response = await api.get(`/request-motives`);
  return handleResponse(response);
}

export async function returnEquipment({ equipment }) {
  const response = await api.post(`/equipment/return/${equipment}`);
  return handleResponse(response);
}

export async function updateEquipmentRequest({ equipment_request_id, action }) {
  const response = await api.post(`/handle-equipment-request/${action}`, {
    equipment_request_id,
  });
  return handleResponse(response);
}
