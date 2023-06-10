import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxiosSecure";

export const useMyClass = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const token = localStorage.getItem("access_token");
  const { data: myClasses = [], refetch } = useQuery({
    queryKey: ["myclass", user?.email],
    enabled: !loading && !!user?.email && !!token,
    queryFn: async () => {
      const res = await axiosSecure.get(`/myclass/${user?.email}`);
      return res.data;
    },
  });
  return [myClasses, refetch];
};
