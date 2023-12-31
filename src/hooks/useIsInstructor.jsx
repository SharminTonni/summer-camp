import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "./useAxiosSecure";

export const useIsInstructor = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const token = localStorage.getItem("access_token");
  const { data: isInstructorData, isLoading: isInstructorLoading } = useQuery({
    queryKey: ["isInstructor", user?.email],
    enabled: !loading && !!user?.email && !!token,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/instructor/${user?.email}`);
      return res.data.instructor;
    },
  });
  return [isInstructorData, isInstructorLoading];
};
