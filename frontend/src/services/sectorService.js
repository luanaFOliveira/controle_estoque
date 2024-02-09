import { api } from "./api";

export async function indexSectors(page) {
  const response = await api.get("/sectors", {
    params: {
      page: page,
    },
  });
  return response.data;
}
