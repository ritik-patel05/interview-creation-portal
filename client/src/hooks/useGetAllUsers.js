import { useQuery } from "react-query";
import axios from "axios";
import { constants } from "../util/constant";

export default function useGetAllUsers() {
  return useQuery("users", () => {
    return axios.get(`/api/users/`).then((res) => res.data);
  });
}
