import { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Layout = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const nav = useNavigate();

  //헤더에서 로그아웃 하면 home으로 이동
  const handleLogout = () => {
    const confirmLogout = window.confirm("정말로 로그아웃 하시겠습니까?");
    if (confirmLogout) {
      logout(); //로컬에서 엑세스 토큰을 제거하고, 로그인 상태를 로그아웃으로 변경
      nav("/"); // home으로 이동
    }
  };

  return (
    <>
      <header>
        <Link to="/">
          <h1>홈</h1>
        </Link>
        <nav>
          {/* 로그인 여부에 따라서 ? 로그아웃 : 로그인 회원가입 */}
          {isAuthenticated ? (
            <>
              <button onClick={handleLogout}>로그아웃</button>
              <Link to="/mypage">마이페이지</Link>
              
            </>
          ) : (
            <>
              <Link to="/login">로그인</Link>
              <Link to="/signup">회원가입</Link>
            </>
          )}
        </nav>
      </header>
      <main>
      <Outlet />
      </main>
    </>
  );
};

export default Layout;
