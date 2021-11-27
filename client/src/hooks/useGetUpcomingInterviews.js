import { useQuery } from "react-query";
import axios from "axios";

export default function useGetUpcomingInterviews() {
  return useQuery("interviews", () => {
    return axios.get(`/api/interviews/upcoming`).then((res) => res.data);
  });
}
