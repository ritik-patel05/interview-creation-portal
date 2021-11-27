import { Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import EditInterview from "./pages/EditInterview";
import ScheduleInterview from "./pages/ScheduleInterview";
import UpcomingInterviews from "./pages/UpcomingInterviews";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/schedule" element={<ScheduleInterview />} />
        <Route path="/upcoming" element={<UpcomingInterviews />} />
        <Route path="/edit/:interviewId" element={<EditInterview />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
