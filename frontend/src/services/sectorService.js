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
    return handleResponse(response, 'Esse setor não existe.', 404);
}

export async function createSector(formData) {
    const response = await api.post(`/sectors`, formData);
    return handleResponse(response, 'Já existe um setor cadastrado com este nome. Por favor, escolha um nome diferente para o novo setor.', 422);
}

export async function updateSector({sector_id, formData}) {
    const response = await api.put(`/sectors/${sector_id}`, formData);
    return handleResponse(response, 'Já existe um setor cadastrado com este nome. Por favor, escolha um nome diferente para o setor.', 422);
}

export async function destroySector(sector_id) {
    const response = await api.delete(`/sectors/${sector_id}`);
    return handleResponse(response, 'O setor selecionado para exclusão ainda possui equipamentos associados. Por favor, desvincule ou realoque todos os equipamentos antes de tentar excluir este setor.', 400);
}
