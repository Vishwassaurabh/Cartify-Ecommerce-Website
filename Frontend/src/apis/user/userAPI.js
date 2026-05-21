import axios from "axios";

//-------Registration-------------
export const registerAPI = async (userData) => {
  const response = await axios.post(
    "https://cartify-ecommerce-website.onrender.com/api/user/register",
    {
      email: userData.email,
      password: userData.password,
      username: userData.username,
    },
    {
      withCredentials: true,
    },
  );
  return response?.data;
};

//Login
export const loginAPI = async (userData) => {
  const response = await axios.post(
    "https://cartify-ecommerce-website.onrender.com/api/user/login",
    {
      email: userData.email,
      password: userData.password,
    },
    {
      withCredentials: true,
    },
  );
  return response?.data;
};

export const checkUserAuthStatusAPI = async () => {
  const response = await axios.get(
    "https://cartify-ecommerce-website.onrender.com/api/user/auth/check",
    {
      withCredentials: true,
    }
  );
  return response?.data;
};

// ! logout
export const logoutAPI = async () => {
  const response = await axios.post(
    "https://cartify-ecommerce-website.onrender.com/api/user/logout",
    {},
    {
      withCredentials: true,
    }
  );
  return response?.data;
};