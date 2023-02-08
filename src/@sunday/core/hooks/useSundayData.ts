import axios from "axios";
import { useMutation, useQuery } from "react-query";

export const useSundayData = () => {
  const { data, isFetched } = useQuery("sundayData", () => {
    return axios.get("/api/sunday").then((response) => {
      return response.data;
    });
  });

  const { mutateAsync } = useMutation({
    mutationFn: (newData) => {
      return axios.post("/api/sunday", newData);
    },
  });

  return {
    data,
    isFetched,
    updateData: mutateAsync,
  };
};
