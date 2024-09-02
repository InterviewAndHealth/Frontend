import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Login } from "../pages";
import DashBoardLayout from "@/layouts/DashBoardLayout";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashBoardLayout />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
