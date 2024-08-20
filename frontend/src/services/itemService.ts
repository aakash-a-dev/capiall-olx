import axios from 'axios';

export const getItems = async () => {
  return await axios.get('https://capiall-olx-1.onrender.com/v1/items');
};

export const getMyItems = async () => {
  return await axios.get('https://capiall-olx-1.onrender.com/v1/my-items', {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
};

export const getMyPurchases = async () => {
  return await axios.get('https://capiall-olx-1.onrender.com/v1/my-purchases', {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
};
