import { create } from 'zustand'

const useAuthStore = create((set)=>({
    isAuthenticated : !!localStorage.getItem("accessToken"),
    token: localStorage.getItem("accessToken"),
    login: (token)=>{
        localStorage.setItem("accessToken", token);
        set({isAuthenticated:true, token});
    },
    logout: ()=>{
        localStorage.removeItem("accessToken");
        set({isAuthenticated:false,token:null})
    }
}))

export default useAuthStore;