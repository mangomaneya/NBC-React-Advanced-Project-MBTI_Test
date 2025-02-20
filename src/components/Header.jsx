import { Link, Outlet } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header>
        <Link to="/">
          <h1>홈</h1>
        </Link>
        <nav>
          <button>로그아웃</button>
          <Link to="/login">로그인</Link>
          <Link to="/signup">회원가입</Link>
        </nav>
      </header>
      <Outlet />
    </>
  );
};

export default Header;
