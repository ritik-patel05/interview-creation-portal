import { useParams } from "react-router-dom";
import useGetAllUsers from '../hooks/useGetAllUsers';
import useGetInterviewDetails from "../hooks/useGetInterviewDetails";

const EditInterview = () => {
  const { interviewId } = useParams();
  const {
    status: getInterviewStatus,
    data: getInterviewData,
    error: getInterviewError,
  } = useGetInterviewDetails(interviewId);
  
  const {
    status: getUsersStatus,
    data: getUsersData,
    error: getUsersError,
  } = useGetAllUsers();

  return <main></main>;
};

export default EditInterview;
