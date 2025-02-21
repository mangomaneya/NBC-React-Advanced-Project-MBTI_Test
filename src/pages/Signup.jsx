import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../api/auth";
import Swal from "sweetalert2";

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
        Swal.fire({
          icon: "success",
          title: "회원가입에 성공했습니다.",
          text: "로그인페이지로 이동합니다.",
          confirmButtonColor: "#c084fc"
        });
        nav("/login");
      }
      if (message !== "회원가입 완료") {
        Swal.fire({
          icon: "error",
          title: "회원가입 실패",
          text: message,
          confirmButtonColor: "#c084fc"
        });
        return;
      }
    } catch (error) {
      console.error(error.response.data);
      Swal.fire({
        icon: "error",
        title: "회원가입 실패",
        text: error.response.data.message,
        confirmButtonColor: "#11051c"
      });
    }
  };

  return (
    <div className="w-96	mx-4 flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold mb-6">회원가입</h2>
      <form
        onSubmit={handleSubmitSignup}
        className="w-full space-y-6 bg-white p-6 rounded-lg shadow-md "
      >
        <input
          type="text"
          name="id"
          placeholder="아이디"
          value={signupData.id}
          onChange={handleInputChange}
          className="w-full p-4 border border-gray-300 rounded-lg "
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={signupData.password}
          onChange={handleInputChange}
          className="w-full p-4 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          name="nickname"
          placeholder="닉네임"
          value={signupData.nickname}
          onChange={handleInputChange}
          className="w-full p-4 border border-gray-300 rounded-lg"
        />
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-300 transition duration-300 "
        >
          회원가입
        </button>
      </form>
      <p className="mt-4">
        이미 계정이 있으신가요?{" "}
        <Link to="/login" className="text-purple-600">
          로그인
        </Link>
      </p>
    </div>
  );
};

export default Signup;
