import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authLogin } from "../api/auth";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const nav = useNavigate();
  const { login  } = useContext(AuthContext);
  const [loginData, setLoginData] = useState({
    id: "",
    password: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    //로그인 통신
    //로그인에 성공하면 ->메인페이지로 이동
    //로그인에 실패하면 -> alert (실패) / 에러로그 찍기
    try {
      const { accessToken, success } = await authLogin(loginData);
      if (success) {
        login(accessToken); //컨텍스트에 토큰정보 전달 -> 토큰정보가 로컬스토리지에 저장됨/ 로그인 상태로 전환
        alert('로그인에 성공했습니다. 마이페이지로 이동합니다.')
        nav("/"); //? 왜 홈으로 돌렸는데 마이페이지로 이동하지? 
      } else {
        alert("로그인에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error(error);
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="w-96	mx-4 flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold mb-6">로그인</h2>
      <form onSubmit={handleSubmitLogin} className="w-full space-y-6 bg-white p-6 rounded-lg shadow-md ">
        <input
          type="text"
          name="id"
          placeholder="아이디"
          value={loginData.id}
          onChange={handleInputChange}
          className="w-full p-4 border border-gray-300 rounded-lg"
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={loginData.password}
          onChange={handleInputChange}
          className="w-full p-4 border border-gray-300 rounded-lg"
        />

        <button type="submit" className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-300 transition duration-300 ">로그인</button>
      </form>

      <p className="mt-4">
        계정이 없으신가요? <Link to="/signup" className="text-purple-600">회원가입</Link>
      </p>
    </div>
  );
};

export default Login;
