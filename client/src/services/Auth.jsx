import { api } from "../constants/api";
import axios from "axios";
export const signInApi = async (data) => {
  try {
    const response = await axios.post(api + "/signin", data);
    return response;
  } catch (error) {
    console.error("Error in loginApi:", error);
    throw error;
  }
};
export const signUpApi = async (data) => {
  try {
    const response = await axios.post(api + "/signup", data);
    return response;
  } catch (error) {
    console.error("Error in signUpApi:", error);
    throw error;
  }
};
