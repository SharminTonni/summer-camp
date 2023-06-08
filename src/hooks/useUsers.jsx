import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxiosSecure";
import { useCallback, useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";

export const useUsers = () => {
  const { user } = useContext(AuthContext);

  const [axiosSecure] = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure("/allusers");
      return res.data;
    },
  });
  return [users, refetch];
};
