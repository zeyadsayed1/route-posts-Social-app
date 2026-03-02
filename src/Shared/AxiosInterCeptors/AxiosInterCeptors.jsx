import axios from "axios";
export const axiosInterceptors = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});
  axiosInterceptors.interceptors.request.use(
  function (x) {
    if (localStorage.getItem("token"))
      x.headers.token = localStorage.getItem("token");
    return x;
  },
  function (error) {
    console.log(error);
  },
);
axiosInterceptors.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log(error);
  },
);
