import axios from "axios";

export const api = axios.create({
  baseURL: "https://resume-screener-backend-m6q4.onrender.com",
});
