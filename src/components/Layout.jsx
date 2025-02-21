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
    <div className="h-screen bg-slate-50 flex flex-col">
      <header className="bg-purple-400 p-7 shadow-md rounded-xl mx-4 my-4">
        <nav className="container mx-auto flex justify-between items-center text-slate-50 text-lg h-11">
          <Link to="/">
            <h1 className="font-bold">홈</h1>
          </Link>
          {/* 로그인 여부에 따라서 ? 로그아웃 : 로그인 회원가입 */}
          <div className="space-x-8">
            {isAuthenticated ? (
              <>
                <Link to="/test">성격테스트</Link>
                <Link to="/result">테스트 결과</Link>
                <Link to="/mypage">마이페이지</Link>
                <button
                  onClick={handleLogout}
                  className="bg-purple-800 p-4 rounded-xl"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <Link to="/signup">회원가입</Link>
                <Link to="/login" className="bg-purple-800 p-4 rounded-xl">
                  로그인
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>
      <main className="container mx-auto pt-10 main flex flex-col items-center justify-center">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
