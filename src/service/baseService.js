import axios from "axios";

let api = axios.create({
  baseURL: "http://99.79.62.126:3030/api/",
});

export default api;
