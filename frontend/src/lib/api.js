import { axiosInstance } from "./axios";

export const signup = async (registerData) => {
  const response = await axiosInstance.post("/auth/signup", registerData);
  return response.data;
};

export const getAuthUser = async () => {
  const res = await axiosInstance.get("/auth/me");
  const data = res.data;
  return data;
};

export const completeOnboarding = async(userData)=>{
 const response = await axiosInstance.post('/auth/onboarding',userData);
 return response.data;
}