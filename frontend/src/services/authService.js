import { api, errorToast } from "./api";
import { toast } from "react-toastify";

async function handleResponse(response, errorMessage) {
  if (response.response) {
    const { status } = response.response;

    if (status === 401 || status === 404) {
      toast.error(errorMessage);
    } else {
      errorToast(response);
    }
  } else if (response.data) {
    const { token, user } = response.data;
    return { token, user };
  }
}

export async function logIn(payload) {
  const response = await api.post("/login", payload);
  return handleResponse(response, "Credenciais inválidas.");
}

export async function logInWithGoogle(googleResponse) {
  const googleToken = googleResponse.credential;
  const response = await api.post("/login-google", { googleToken });
  return handleResponse(response, "Email não cadastrado.");
}
