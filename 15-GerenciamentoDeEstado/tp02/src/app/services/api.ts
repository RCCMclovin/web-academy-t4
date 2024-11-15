import axios from "axios";

const api = axios.create({
  baseURL: "https://lapis-even-ocicat.glitch.me",
});

export default api;
