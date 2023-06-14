import { useContext, useEffect } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios, { Axios } from "axios";
import { config } from "daisyui";

const axiosSecure = axios.create({
  baseURL: "https://summer-camp-server-alpha-gold.vercel.app",
});

export const useAxiosSecure = () => {
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure.interceptors.request.use((config) => {
      const token = localStorage.getItem("access_token");
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    });

    axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          await logOut();
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );
  }, [navigate, logOut]);
  return [axiosSecure];
};
