import api from "./api.js";

export const getUserInfo = async () => {
  const { data } = await api.get("/auth/user")
  return data
}
