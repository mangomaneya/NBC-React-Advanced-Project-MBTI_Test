//전역에서 사용될 로그인 여부와, 로그인,로그아웃 함수 상태관리

import { useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext();
const token = localStorage.getItem("accessToken");

const AuthProvider = ({ children }) => {
  // 로그인 여부를 state로 저장
  const [isAuthenticated, setIsAuthenticated] = useState(!!token); //토크의 상태를 유지한 채 boolean 타입으로 변환

  // 로그인 - 토큰을 로컬에 저장하고, 인증상태로 바꾼다.
  const login = (token) => {
    localStorage.setItem("accessToken", token);
    setIsAuthenticated(true);
  };

  //로그아웃 - 토큰을 로컬에서 제거하고, 미인증 상태로 바꾼다.
  const logout = () => {
    localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
  };
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
