import { useQuery } from "@tanstack/react-query";

export const useUsers = () => {
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/allusers");
      return res.json();
    },
  });
  return [users, refetch];
};
