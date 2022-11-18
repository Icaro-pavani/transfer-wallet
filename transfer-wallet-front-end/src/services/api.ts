import axios from "axios";

const baseAPI = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// function getConfig(token: string) {
//   return {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
// }

interface UserData {
  username: string;
  password: string;
}

async function userSignUp(signUpData: UserData) {
  await baseAPI.post("/user", signUpData);
}

async function userSignIn(signInData: UserData) {
  return baseAPI.post<{ token: string }>("/auth", signInData);
}

const api = { userSignUp, userSignIn };

export default api;
