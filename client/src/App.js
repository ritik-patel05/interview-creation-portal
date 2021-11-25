import { Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import ScheduleInterview from "./pages/ScheduleInterview";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/schedule" element={<ScheduleInterview />} />
      </Routes>
    </>
  );
}

export default App;
