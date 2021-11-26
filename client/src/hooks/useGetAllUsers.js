import { useQuery } from "react-query";
import axios from "axios";

const twentyFourHoursInMs = 1000 * 60 * 60 * 24;

export default function useGetAllUsers() {
  return useQuery(
    "users",
    () => {
      return axios.get(`/api/users/`).then((res) => res.data);
    },
    {
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: twentyFourHoursInMs,
    }
  );
}
