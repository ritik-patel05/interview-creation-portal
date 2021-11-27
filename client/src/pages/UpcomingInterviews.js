import Moment from "react-moment";
import { Link } from "react-router-dom";

import useGetUpcomingInterviews from "../hooks/useGetUpcomingInterviews";
import useDocumentTitle from "../hooks/useDocumentTitle";

const UpcomingInterviews = () => {
  useDocumentTitle("Upcoming Interviews");
  const { status, data, error } = useGetUpcomingInterviews();

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6">
      <div className="pt-32 pb-12">
        {status === "loading" && <div>Loading...</div>}
        {status === "error" && <div>Error fetching upcoming interviews</div>}
        {status === "success" && (
          <>
            <h2 className="text-2xl mb-8 font-bold text-center">
              Upcoming Interviews
            </h2>
            {data.interviews.map(({ startTime, endTime, _id }) => (
              <div className="flex flex-col p-4 border-4 rounded-md m-4">
                <div>Id: {_id} </div>
                <div>
                  Date: <Moment format="DD-MM-YYYY">{endTime}</Moment>
                </div>
                <div className="grid grid-cols-2 mb-2">
                  <div>
                    Start Time: <Moment format="hh:mm A">{startTime}</Moment>
                  </div>
                  <div>
                    End Time: <Moment format="hh:mm A">{endTime}</Moment>
                  </div>
                </div>
                <Link
                  to={`/edit/${_id}`}
                  className="btn-sm w-fix mx-auto bg-blue-400 text-white"
                >
                  Edit
                </Link>
              </div>
            ))}
          </>
        )}
      </div>
    </main>
  );
};

export default UpcomingInterviews;
