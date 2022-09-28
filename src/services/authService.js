import jwtDecode from 'jwt-decode';
import http from './httpService';

// const apiEndpoint = `${endPoint.apiUrl}/auth/login`;
const tokenKey = 'token';

// getting rid of bidirectional dependencies
http.setJwt(getJwt());

export async function login(email, password) {
  const { data: user } = await http.post('auth/login', {
    email,
    password,
  });
  console.log('User Res', user.data);
  localStorage.setItem('user', JSON.stringify(user.data));
}

export async function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export async function logout() {
  localStorage.removeItem(tokenKey);
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}
const userAuth = {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
};

export default userAuth;
