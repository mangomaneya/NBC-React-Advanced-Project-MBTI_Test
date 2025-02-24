import axios from "axios";
// custom instance
export const authApi = axios.create({
  baseURL: "https://www.nbcamp-react-auth.link",
});
export const jsonApi = axios.create({
    baseURL: "https://glass-zesty-syrup.glitch.me/testResults"
})