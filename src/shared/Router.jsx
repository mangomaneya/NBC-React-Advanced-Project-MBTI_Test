import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import MyPage from "../pages/MyPage";
import MbtiTest from "../pages/MbtiTest";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Result from "../pages/Result";
import Layout from "../components/Layout";

// PrivateRoute : 로그인이 필요한 페이지에 접근할 수 있도록 하는 컴포넌트
// 로그인이 되어있지 않은 사용자는 login 페이지로 리다이렉트
const PrivateRoute = ({ element: Element, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? <Element {...rest} /> : <Navigate to="/login" />;
};

// PublicRoute : 로그인이 필요없는 페이지에 접근할 수 있도록 하는 컴포넌트
// 로그인이 되어있는 사용자는 mypage로 리다이렉트
const PublicRoute = ({ element: Element, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return !isAuthenticated ? <Element {...rest} /> : <Navigate to="/mypage" />;
};
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<PublicRoute element={Signup}/>} />
          <Route path="/login" element={<PublicRoute element={Login} />} />
          <Route path="/mypage" element={<PrivateRoute element={MyPage} />} />
          <Route path="/test" element={<PrivateRoute element={MbtiTest} />} />
          <Route path="/result" element={<PrivateRoute element={Result} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
