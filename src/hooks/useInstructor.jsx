import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";

export const useInstructor = () => {
  const { loading } = useContext(AuthContext);
  const { data: instructors = [], refetch } = useQuery({
    queryKey: ["instructor"],
    enabled: !loading,
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/users`);
      return res.json();
    },
  });
  return [instructors, refetch];
};
