import axios from "axios";
import { auth } from "@/lib/initFirebase";

export const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = process.env.NEXT_PUBLIC_API_DOMEIN;

axiosInstance.interceptors.response.use(
  async (res) => {
    return res;
  },
  async (err) => {
    if (err.response.status === 401 && auth.currentUser) {
      const newToken = (await auth.currentUser.getIdTokenResult()).token;
      window.localStorage.setItem("access_token", newToken);
      const res = await axios
        .request({
          ...err.config,
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("access_token")}`,
          },
        })
        .catch((error) => {
          window.location.href = "/";
        });
      return res;
    } else {
      throw err;
    }
  }
);
