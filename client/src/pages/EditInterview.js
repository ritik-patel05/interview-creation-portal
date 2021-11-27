import { useParams, useNavigate } from "react-router-dom";
import Moment from "react-moment";
import makeAnimated from "react-select/animated";
import Select from "react-select";
import { useState } from "react";
import moment from "moment";
import axios from "axios";

import useGetAllUsers from "../hooks/useGetAllUsers";
import useGetInterviewDetails from "../hooks/useGetInterviewDetails";
import useDocumentTitle from "../hooks/useDocumentTitle";

const EditInterview = () => {
  useDocumentTitle("Edit Interview Details");

  const navigate = useNavigate();

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

  const [participants, setParticipants] = useState([]);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const animatedComponents = makeAnimated();

  const getParticipants = () => {
    const users = [];
    getUsersData?.users.forEach((user) => {
      users.push({ label: user.email, value: user.email });
    });
    return users;
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setIsFormSubmitting(true);

    const users = [];
    participants.forEach((participant) => users.push(participant.value));

    const formattedStartTime = moment(
      `${date} ${startTime}`,
      "YYYY-MM-DD HH:mm:ss"
    ).format();
    const formattedendTime = moment(
      `${date} ${endTime}`,
      "YYYY-MM-DD HH:mm:ss"
    ).format();

    const interview = {
      usersInvited: users,
      startTime: formattedStartTime,
      endTime: formattedendTime,
    };

    axios
      .put(`/api/interviews/${interviewId}`, interview)
      .then((res) => {
        setIsFormSubmitting(false);
        alert("Interview was successfully updated.");
        navigate("/upcoming");
      })
      .catch((error) => {
        setIsFormSubmitting(false);
        alert(error.response.data.message);
      });
  };

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6">
      <div className="pt-32 pb-12">
        {getInterviewStatus === "loading" && (
          <div>Getting interview details...</div>
        )}
        {getInterviewStatus === "error" && (
          <div>Error fetching interview details</div>
        )}
        {getInterviewStatus === "success" && (
          <>
            <h2 className="text-center text-xl font-bold mb-4">
              Interview Details
            </h2>
            <div className="flex flex-col border-2 rounded-md p-4">
              <div>
                Date:
                <Moment format="DD-MM-YYYY">
                  {getInterviewData.interview.endTime}
                </Moment>
              </div>
              <div className="grid grid-cols-2 mb-2">
                <div>
                  Start Time:
                  <Moment format="hh:mm A">
                    {getInterviewData.interview.startTime}
                  </Moment>
                </div>
                <div>
                  End Time:
                  <Moment format="hh:mm A">
                    {getInterviewData.interview.endTime}
                  </Moment>
                </div>
              </div>
              <ul className="list-disc px-2">
                Participants:
                {getInterviewData.interview.usersInvited.map((user) => {
                  return <li key={user.email}>{user.email}</li>;
                })}
              </ul>
            </div>
          </>
        )}
        <div className="mt-4">
          {getUsersStatus === "loading" && <div> Getting users... </div>}
          {getUsersStatus === "error" && (
            <div> Error fetching all users... </div>
          )}
          {getUsersStatus === "success" && (
            <>
              <h2 className="text-center text-xl font-bold mb-4">
                Update Interview Details
              </h2>
              <form onSubmit={handleFormSubmit} className="flex flex-col">
                <label>Select Participants : </label>
                <Select
                  isMulti
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  name="participants"
                  options={getParticipants()}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={(selectedOption) => {
                    setParticipants(selectedOption);
                  }}
                />

                <label className="mt-4 w-full">Date : </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="rounded-md"
                />

                <label className="mt-4">Start Time : </label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                  className="rounded-md"
                />

                <label className="mt-4">End Time : </label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                  className="rounded-md"
                />

                <button
                  type="submit"
                  className="btn mx-auto mt-6 bg-blue-500 text-white"
                  disabled={isFormSubmitting}
                >
                  {isFormSubmitting ? "Submitting..." : "Submit"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default EditInterview;
