import { useQuery } from "react-query";
import axios from "axios";

const twentyFourHoursInMs = 1000 * 60 * 60 * 24;

export const fetchInterview = ({ queryKey }) => {
  return axios.get(`/api/interviews/${queryKey[1]}`).then((res) => res.data);
};

export default function useGetInterviewDetails(interviewId) {
  return useQuery(interviewId && ["interview", interviewId], fetchInterview, {
    refetchOnWindowFocus: false,
    refetchOnmount: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: twentyFourHoursInMs,
  });
}
