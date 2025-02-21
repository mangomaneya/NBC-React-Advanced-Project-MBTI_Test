import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import MyPage from "../pages/MyPage";
import MbtiTest from "../pages/MbtiTest";
import Result from "../pages/Result";
import Layout from "../components/Layout";
import ProtectedRouter from "./ProtectedRouter";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          {/* 로그인해야지만 갈 수 있는 경로들 */}
          <Route element={<ProtectedRouter />}>
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/test" element={<MbtiTest />} />
            <Route path="/result" element={<Result />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
