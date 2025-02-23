import { create } from "zustand";

const useAuthStore = create((set) => ({
  isAuthenticated: !!localStorage.getItem("accessToken"),
  token: localStorage.getItem("accessToken"),
  userData: JSON.parse(localStorage.getItem("userData")) || {
    userId: "",
    avatar: "",
    nickname: "",
  },
  login: (token, userId, avatar, nickname) => {
    const newUserData = { userId, avatar, nickname };
    localStorage.setItem("accessToken", token);
    localStorage.setItem("userData", JSON.stringify(newUserData));
    set({ isAuthenticated: true, token, userData: newUserData });
  },
  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userData");
    set({
      isAuthenticated: false,
      token: null,
      userData: { userId: "", avatar: "", nickname: "" },
    });
  },

  //닉네임만 업데이트 하는 함수
  patchNickname: (newNickname) => {
    set((state) => {
      const updatedUserData = { ...state.userData, nickname: newNickname };
      localStorage.setItem("userData", JSON.stringify(updatedUserData));
      return { userData: updatedUserData };
    });
  },
}));

export default useAuthStore;
