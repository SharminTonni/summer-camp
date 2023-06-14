import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxiosSecure";

export const usePaidClass = () => {
  const { user, loading } = useContext(AuthContext);
  const token = localStorage.getItem("access_token");
  const [axiosSecure] = useAxiosSecure();
  const { data: paidClasses = [] } = useQuery({
    queryKey: ["paidClass", user?.email],
    enabled: !!user?.email && !loading && !!token,
    queryFn: async () => {
      const res = await axiosSecure.get(`/paidclass/${user?.email}`);
      return res.data;
    },
  });
  return [paidClasses];
};
