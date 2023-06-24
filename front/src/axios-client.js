import axios from "axios";

const axiosCliente = axios.create({
  baseURL: "http://catsoft.tis.cs.umss.edu.bo/api",
});

axiosCliente.interceptors.request.use((config) => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  config.headers.Authorization = `Bearer ${token}`;
  console.log("Se ejecuto axios cliente");
  return config;
});

axiosCliente.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  (error) => {
    const { response } = error;
    console.log(response);
    if (response.status === 401) {
      localStorage.removeItem("ACCESS_TOKEN");
      // window.location.reload();
    } else if (response.status === 404) {
      //Show not found
    }

    throw error;
  }
);

export default axiosCliente;
