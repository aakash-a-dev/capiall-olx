import axios from 'axios';

export const login = async (email: string, password: string) => {
  return await axios.post('http://localhost:3000/v1/login', { email, password });
};

export const signup = async (fullName: string, email: string, password: string) => {
  return await axios.post('http://localhost:3000/v1/register', { fullName, email, password });
};
