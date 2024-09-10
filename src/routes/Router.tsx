import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Login, Overview } from "../pages";
import DashBoardLayout from "@/layouts/DashBoardLayout";
import SetUpInterview from "@/pages/SetUpInterview";
import InterviewScreen from "@/pages/InterviewScreen";
import Settings from "@/pages/Settings";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashBoardLayout />}>
          <Route path="overview" element={<Overview />} />
          <Route path="setup-interview" element={<SetUpInterview />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="interview" element={<InterviewScreen />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
