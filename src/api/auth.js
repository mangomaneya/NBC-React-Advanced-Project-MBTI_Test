import Swal from "sweetalert2";
import { authApi } from "./axios";
// 회원 정보와 통신하는 함수들

// 회원가입 - post /register userData : "id", "password", "nickname" / response : "message"("회원가입성공"), "success" : true
export const register = async (userData) => {
  try {
    const response = await authApi.post(`/register`, userData);
    return response.data;
  } catch (error) {
    console.error(error.response.data);
    Swal.fire({
      icon: "error",
      title: "회원가입 실패",
      text: error.response.data.message,
      confirmButtonColor: "#c084fc",
    });
  }
};

//로그인 - post /login userData : "id", "password" / response : "accessToken","userId", "success", "avatar", "nickname"
export const authLogin = async (userData) => {
  try {
    const response = await authApi.post(`/login?expiresIn=10m`, userData);
    return response.data;
  } catch (error) {
    console.error(error.response.data);
    Swal.fire({
      icon: "error",
      title: "로그인 실패",
      text: error.response.data.message,
      confirmButtonColor: "#c084fc",
    });
  }
};

//회원정보 확인 - get /user header: "Authorization": "bearer token" / response : id, nickname, avatar, success
export const getUserProfile = async (token) => {
  try {
    const response = await authApi.get(`/user`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error.response.data);
    alert(error.response.data.message);
  }
};

//프로필 변경 - patch /profile header : "Authorization": "bearer token" / formData : "nickname" / response : "avatar", "nickname", "message", "success"
export const updateProfile = async (formData, token) => {
  const response = await authApi.patch(`/profile`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
