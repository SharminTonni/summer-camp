import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxiosSecure";

export const useCart = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const token = localStorage.getItem("access_token");
  const { data: cart = [], refetch } = useQuery({
    queryKey: ["cart", user?.email],
    enabled: !!token && !!user?.email && !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/cart?email=${user?.email}`);

      return res.data;
    },
  });
  return [cart, refetch];
};
