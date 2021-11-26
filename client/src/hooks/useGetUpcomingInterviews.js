import { useQuery } from "react-query";
import axios from "axios";
import { constants } from "../util/constant";

export default function useGetUpcomingInterviews() {
  return useQuery("interviews", () => {
    return axios.get(`/api/interviews/upcoming`).then((res) => res.data);
  });
}
