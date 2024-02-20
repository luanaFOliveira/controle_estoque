import { api } from "./api";

export async function indexEquipments({page, availability, equipment_code}) {
  const response = await api.get("/equipments", {
    params: {
      page: page,
      availability: availability,
      equipment_code: equipment_code,
    },
  });
  return response.data;
}

export async function indexEquipmentsAvailability({ page, sector, availability }) {
  const response = await api.get("/equipments", {
    params: {
      page: page,
      sector: sector,
      availability: availability,
    },
  });
  return response.data;
}


export async function getEquipment(equipment_id) {
  const response = await api.get(`/equipments/${equipment_id}`);
  return response.data;
}

export async function createEquipment(formData) {
  const response = await api.post(`/equipments`, formData);
  return response.data;
}

export async function updateEquipment({ equipment_id, formData }) {
  const response = await api.put(`/equipments/${equipment_id}`, formData);
  return response.data;
}

export async function destroyEquipment(equipment_id) {
  const response = await api.delete(`/equipments/${equipment_id}`);
  return response.data;
}

export async function getHistoryEquipment(equipment_id) {
  const response = await api.get(
    `/history/equipments?equipment_id=${equipment_id}`,
  );
  return response.data;
}

export async function getEquipmentDetails() {
  const response = await api.get("/equipment-details");
  return response.data;
}

export async function changeEquipmentLocation({equipment_id,action}){
  const response = await api.post(`/equipment/change-location/${action}`, {
    equipment_id,
  });
  return response.data;
}
