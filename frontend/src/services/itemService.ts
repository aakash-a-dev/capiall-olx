import axios from 'axios';

export const getItems = async () => {
  return await axios.get('http://localhost:3000/v1/items');
};

export const getMyItems = async () => {
  return await axios.get('http://localhost:3000/v1/my-items', {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
};

export const getMyPurchases = async () => {
  return await axios.get('http://localhost:3000/v1/my-purchases', {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
};
