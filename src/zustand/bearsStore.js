import { create } from "zustand";

const useAuthStore = create((set) => ({
  isAuthenticated: !!localStorage.getItem("accessToken"),
  token: localStorage.getItem("accessToken"),
  userData: {
    id: "",
    avatar: "",
    nickname: "",
  },
  login: (token) => {
    localStorage.setItem("accessToken", token);
    set({ isAuthenticated: true, token });
  },
  logout: () => {
    localStorage.removeItem("accessToken");
    set({ isAuthenticated: false, token: null });
  },
  //로그인 시에 회원정보를 저장
  setUserData: (userId, avatar, nickname) => {
    set({
      userData: {
        userId,
        avatar,
        nickname,
      },
    });
  },
  //닉네임만 업데이트 하는 함수 
  patchNickname: (newNickname) => {
    set((state) => ({
      userData: { ...state.userData, nickname: newNickname },
    }));
  },
}));

export default useAuthStore;
