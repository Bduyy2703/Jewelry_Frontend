import axiosClient from "./axiosClient";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
// import jwt from 'jsonwebtoken';

export const fetchAllUser = () => {
    // return axios.get("/api/users?page=1");
    return axios.get("https://reqres.in/api/users?page=1");
}

export const login = async (email, password) => {
    try {
        const response = await axiosClient.post('/auth/login', {
            email,
            password
        });
        
      const accessToken = response.accessToken;
      console.log("Access Token:", accessToken);
      // Giải mã accessToken để lấy thông tin người dùng
      const decodedToken = jwtDecode(accessToken);
      console.log(decodedToken);
  
      // Lấy email từ decodedToken
      const userEmail = jwtDecode(accessToken).email;
      console.log("User email:", userEmail);
      return userEmail;
    } catch (error) {
      throw error;
    }
  };

export const profile = async (firstName, lastName, email, phoneNumber, addresses) => {
  try {
    // const response = await axiosClient.get(`/users/profiles/${firstName}`, {
    const response = await axiosClient.get(`/users/profiles/${firstName}`, {
      params: {
        firstName,
        lastName,
        email,
        phoneNumber,
        addresses,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

