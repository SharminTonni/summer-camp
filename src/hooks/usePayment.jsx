import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { useAxiosSecure } from "./useAxiosSecure";

export const usePayment = () => {
  const { user, loading } = useContext(AuthContext);
  const token = localStorage.getItem("access_token");
  const [axiosSecure] = useAxiosSecure();
  const { data: payments = [] } = useQuery({
    queryKey: ["payment", user?.email],
    enabled: !!user.email && !!token && !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/mypayment/${user?.email}`);
      return res.data;
    },
  });
  return [payments];
};
