import { useQuery } from "@tanstack/react-query";

export const useAllClasses = () => {
  const { data: allClass = [], refetch } = useQuery({
    queryKey: ["allClasses"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/allclasses");
      return res.json();
    },
  });

  return [allClass, refetch];
};
