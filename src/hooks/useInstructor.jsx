import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";

export const useInstructor = () => {
  const { loading } = useContext(AuthContext);
  const { data: instructors = [], refetch } = useQuery({
    queryKey: ["users"],
    // enabled: !loading,
    queryFn: async () => {
      const res = await fetch(
        `https://summer-camp-server-alpha-gold.vercel.app/users`
      );
      return res.json();
    },
  });
  return [instructors, refetch];
};
