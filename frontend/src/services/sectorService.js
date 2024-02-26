import {api, handleResponse} from "./api";

export async function indexSectors({page, name}) {
    const response = await api.get("/sectors", {
        params: {
            page: page,
            name: name,
        },
    });
    return handleResponse(response);
}

export async function getSector({sector_id,filter}) {
    const response = await api.get(`/sectors/${sector_id}`,{
    params:filter,
  });
    return handleResponse(response);
}

export async function createSector(formData) {
    const response = await api.post(`/sectors`, formData);
    return handleResponse(response);
}

export async function updateSector({sector_id, formData}) {
    const response = await api.put(`/sectors/${sector_id}`, formData);
    return handleResponse(response);
}

export async function destroySector(sector_id) {
    const response = await api.delete(`/sectors/${sector_id}`);
    return handleResponse(response);
}
