import axios from "axios";

// const BASE_URL = "http://localhost:5000/api";
const BASE_URL = "https://aung-shop-classic.vercel.app/api/";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
