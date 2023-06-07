import { useQuery } from "@tanstack/react-query";

export const useClass = () => {
  const {
    data: classes = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/class");
      return res.json();
    },
  });

  return [classes, isLoading, refetch];
};
