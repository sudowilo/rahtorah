import { BASE_URL } from "../config.js";

export const setToken = (token) => {
  localStorage.setItem("jwt", `Bearer ${token}`);
};

export const getToken = () => {
  return localStorage.getItem("jwt");
};

export const login = async (identifier, password) => {
  const url = `${BASE_URL}/api/auth/login`;
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ identifier, password }),
    headers: myHeaders,
  });

  const result = await response.json();

  return result;
};

export const register = async (
  firstName,
  lastName,
  gender,
  username,
  password,
  phoneNumber,
  email
) => {
  const url = `${BASE_URL}/api/auth/register`;
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestBody = {
    firstName,
    lastName,
    gender,
    username,
    password,
    phoneNumber,
    email,
  };

  const response = await fetch(url, {
    method: "Post",
    headers: myHeaders,
    body: JSON.stringify(requestBody),
  });

  return await response.json();
};

export const isAuthorized = async () => {
  const url = `${BASE_URL}/api/auth/is-authorized`;
  const token = getToken();
  const response = await fetch(url, {
    headers: {
      Authorization: token,
    },
  });

  const result = await response.json();
  return result.success;
}