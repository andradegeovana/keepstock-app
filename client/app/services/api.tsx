
import axios from "axios"; 
import { parseCookies } from "nookies";
const cookie  = parseCookies();
const token = cookie['token']

export const instance = axios.create({
  baseURL: "http://localhost:3001/api/",
});
