import {api, handleResponse} from "./api";

export async function indexUsers({page, name}) {
    const response = await api.get("/users", {
        params: {
            page: page,
            name: name,
        },
    });
    return handleResponse(response);
}

export async function getUser(user_id) {
    const response = await api.get(`/users/${user_id}`);
    return handleResponse(response, 'Esse usuário não existe.', 404);
}

export async function createUser(formData) {
    const response = await api.post(`/users`, formData);
    return handleResponse(response, 'Este endereço de e-mail já está associado a uma conta existente. Por favor, utilize um endereço de e-mail diferente.', 422);
}

export async function updateUser(user_id, formData) {
    const response = await api.put(`/users/${user_id}`, formData);
    return handleResponse(response, 'Este endereço de e-mail já está associado a uma conta existente. Por favor, utilize um endereço de e-mail diferente.', 500);
}

export async function destroyUser(user_id) {
    const response = await api.delete(`/users/${user_id}`);
    return handleResponse(response);
}

export async function changePassword({password, user_id}) {
    const response = await api.put(`/change-password`, {
        user_id: user_id,
        password: password,
    });
    return handleResponse(response);
}