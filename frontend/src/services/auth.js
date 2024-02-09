import { api } from "./api";

export async function logIn(payload) {
  const response = await api.post("/login", payload);
  const { token, user } = response.data;

  return { token, user };
}

export async function logInWithGoogle(googleResponse) {
  const googleToken = googleResponse.credential;
  const response = await api.post("/login-google", { googleToken });
  const { token, user } = response.data;

  return { token, user };
}
