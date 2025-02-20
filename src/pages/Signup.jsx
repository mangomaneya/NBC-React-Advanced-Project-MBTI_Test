import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <>
      <h2>회원가입</h2>
      <input type="text" name="id" placeholder="아이디" />
      <input type="password" name="password" placeholder="비밀번호" />
      <input type="text" name="nickname" placeholder="닉네임" />
      <button>회원가입</button>
      <p>
        이미 계정이 있으신가요? <Link to="/login">로그인</Link>
      </p>
    </>
  );
};

export default Signup;
