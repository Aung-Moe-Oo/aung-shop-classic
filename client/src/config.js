import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://aung-shop-classic.vercel.app/",
  // baseURL: "http://localhost:3000/",
});
