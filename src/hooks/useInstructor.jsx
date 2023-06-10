import { useQuery } from "@tanstack/react-query";

export const useInstructor = () => {
  const { data: instructors = [], refetch } = useQuery({
    queryKey: ["instructor"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/users`);
      return res.json();
    },
  });
  return [instructors, refetch];
};
