import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <h2>로그인</h2>
      <input type="text" name="id" placeholder="아이디" />
      <input type="password" name="password" placeholder="비밀번호" />

      <button>로그인</button>
      <p>
        계정이 없으신가요? <Link to="/signup">회원가입</Link>
      </p>
    </>
  );
};

export default Login;
