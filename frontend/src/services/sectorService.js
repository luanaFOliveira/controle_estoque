import { api } from "./api";

export async function indexSectors({page, name}) {
  const response = await api.get("/sectors", {
    params: {
      page: page,
      name: name,
    },
  });
  return response.data;
}

export async function getSector(sector_id) {
  const response = await api.get(`/sectors/${sector_id}`);
  return response.data;
}

export async function createSector(formData) {
  const response = await api.post(`/sectors`, formData);
  return response.data;
}

export async function updateSector({ sector_id, formData }) {
  const response = await api.put(`/sectors/${sector_id}`, formData);
  return response.data;
}

export async function destroySector(sector_id) {
  const response = await api.delete(`/sectors/${sector_id}`);
  return response.data;
}
