import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    if (response.status === 401) {
      localStorage.removeItem("ACCESS_TOKEN");
    }
    return error;
  },
);

const errorToast = (error) => {
  const toastUnknownError = () =>
    toast.error("Ocorreu um erro, por favor atualize a página");

  if ((!error) instanceof AxiosError) {
    toastUnknownError();
    return error;
  }

  const errors = error.response?.data?.errors;

  if (errors) {
    errors.forEach(toast.error);
  } else {
    toastUnknownError();
  }

  return error;
};

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

export { api, errorToast, handleResponse };
