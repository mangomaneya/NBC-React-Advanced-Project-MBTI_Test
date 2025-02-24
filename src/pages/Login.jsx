import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authLogin } from "../api/auth";
import useAuthStore from "../zustand/bearsStore";
import Swal from "sweetalert2";

const Login = () => {
  const nav = useNavigate();
  const { login } = useAuthStore();
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

    const { accessToken, success, userId, avatar, nickname } = await authLogin(
      loginData
    );
    if (success) {
      login(accessToken, userId, avatar, nickname); //로그인 시 받은 응답으로 로그인 상태를 바꾸고 토큰, 사용자 정보를 localstorage에 저장
      Swal.fire({
        icon: "success",
        title: "로그인에 성공했습니다",
        text: "메인페이지로 이동합니다.",
        confirmButtonColor: "#c084fc",
      });
      nav("/");
    }
  };

  return (
    <div className="w-96	mx-4 flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold mb-6">로그인</h2>
      <form
        onSubmit={handleSubmitLogin}
        className="w-full space-y-6 bg-white p-6 rounded-lg shadow-md "
      >
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

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-300 transition duration-300 "
        >
          로그인
        </button>
      </form>

      <p className="mt-4">
        계정이 없으신가요?{" "}
        <Link to="/signup" className="text-purple-600">
          회원가입
        </Link>
      </p>
    </div>
  );
};

export default Login;
