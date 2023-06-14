import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";

export const useClass = () => {
  const { loading } = useContext(AuthContext);
  const { data: classes = [] } = useQuery({
    queryKey: ["class"],
    // enabled: !loading,
    queryFn: async () => {
      const res = await fetch(
        "https://summer-camp-server-alpha-gold.vercel.app/class"
      );
      return res.json();
    },
  });

  return [classes];
};
