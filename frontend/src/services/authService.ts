import axios from 'axios';

export const login = async (email: string, password: string) => {
  return await axios.post('https://capiall-olx-1.onrender.com/v1/login', { email, password });
};

export const signup = async (fullName: string, email: string, password: string) => {
  return await axios.post('https://capiall-olx-1.onrender.com/v1/register', { fullName, email, password });
};
