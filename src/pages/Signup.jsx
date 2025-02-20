import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../api/auth";

const Signup = () => {
  const nav = useNavigate();
  const [signupData, setSignupData] = useState({
    id: "",
    password: "",
    nickname: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const handleSubmitSignup = async (e) => {
    e.preventDefault();
    //회원가입 통신 - try catch
    // 회원가입에 성공하면 -> alert(성공) / 로그인페이지로 이동
    // 회원가입에 실패하면 -> alert (실패) / 에러로그 찍기

    try {
      const { message, success } = await register(signupData);
      if (success) {
        alert("회원가입에 성공했습니다. 로그인페이지로 이동합니다.");
        nav("/login");
      }
      if (message !== "회원가입 완료") {
        alert(message, "다시 시도해주세요.");
      }
    } catch (error) {
      console.error(error);
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmitSignup}>
        <input
          type="text"
          name="id"
          placeholder="아이디"
          value={signupData.id}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={signupData.password}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="nickname"
          placeholder="닉네임"
          value={signupData.nickname}
          onChange={handleInputChange}
        />
        <button type="submit">회원가입</button>
      </form>
      <p>
        이미 계정이 있으신가요? <Link to="/login">로그인</Link>
      </p>
    </>
  );
};

export default Signup;
