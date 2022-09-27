import http from "./httpService";
import endPoint from "../config/config.json";

const apiEndpoint = `${endPoint.apiUrl}/users`;

export function register(user) {
  return http.post(apiEndpoint, {
    name: user.username,
    email: user.email,
    password: user.password,
  });
}
