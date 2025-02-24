import { useQuery } from "@tanstack/react-query";
import { getTestResults } from "../api/test";

export const useGetTestResults = () => {
  return useQuery({
    queryKey: ["testResults"],
    queryFn: getTestResults,
  });
};
