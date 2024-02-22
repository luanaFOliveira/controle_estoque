import {api, errorToast} from "./api";
import {toast} from "react-toastify";

async function handleResponse(res, errorMessage, statusError) {
    if (res.response) {
        const {status} = res.response;

        if (status === statusError) {
            toast.error(errorMessage);
        } else {
            errorToast(res.response);
        }
    } else if (res.data) {
        return res.data;
    }
}

export async function indexSectors({page, name}) {
    const response = await api.get("/sectors", {
        params: {
            page: page,
            name: name,
        },
    });
    if (response.response) {
        errorToast(response.response);
    } else if (response.data) {
        return response.data;
    }
}

export async function getSector(sector_id) {
    const response = await api.get(`/sectors/${sector_id}`);
    if (response.response) {
        errorToast(response.response);
    } else if (response.data) {
        return response.data;
    }
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
