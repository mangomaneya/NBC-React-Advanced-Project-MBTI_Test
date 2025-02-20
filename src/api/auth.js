import axios from "axios";

const API_URL = "https://www.nbcamp-react-auth.link";

// 회원가입 - post /register userData : "id", "password", "nickname" / response : "message"("회원가입성공"), "success" : true
export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

//로그인 - post /login userData : "id", "password" / response : "accessToken","userId", "success", "avatar", "nickname"
export const authLogin = async (userData) => {
  const response = await axios.post(`${API_URL}/login?expiresIn=10m`, userData);
  return response.data;
};

//회원정보 확인 - get /user header: "Authorization": "bearer token" / response : id, nickname, avatar, success
export const getUserProfile = async (token) => {
  const response = await axios.get(`${API_URL}/user`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

//프로필 변경 - patch /profile header : "Authorization": "bearer token" / formData : "nickname" / response : "avatar", "nickname", "message", "success"
export const updateProfile = async (formData, token) => {
  const response = await axios.patch(`${API_URL}/profile`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
