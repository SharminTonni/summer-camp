import { useQuery } from "@tanstack/react-query";

export const useAllClasses = () => {
  const { data: allClass = [], refetch } = useQuery({
    queryKey: ["allClasses"],
    queryFn: async () => {
      const res = await fetch(
        "https://summer-camp-server-alpha-gold.vercel.app/allclasses"
      );
      return res.json();
    },
  });

  return [allClass, refetch];
};
