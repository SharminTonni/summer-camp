import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxiosSecure";

export const useFeedback = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const token = localStorage.getItem("access_token");
  const { data: feedback = [], refetch } = useQuery({
    queryKey: ["feedback", user?.email],
    enabled: !loading && !!user?.email && !!token,
    queryFn: async () => {
      const res = await axiosSecure.get(`/feedback?email=${user?.email}`);
      return res.data;
    },
  });
  return [feedback, refetch];
};
