import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";

export const useClass = () => {
  const { loading } = useContext(AuthContext);
  const {
    data: classes = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["classes"],
    enabled: !loading,
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/class");
      return res.json();
    },
  });

  return [classes, isLoading, refetch];
};
