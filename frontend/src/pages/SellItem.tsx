import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SellItem = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!name || !price || !category) {
      setError('All fields are required.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://capiall-olx-1.onrender.com/v1/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, price, category }),
      });

      if (response.ok) {
        navigate('/dashboard'); // Redirect to the dashboard after successful item creation
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to add item.');
      }
    } catch (error) {
      console.error('Error adding item:', error);
      setError('Failed to add item. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Sell Your Item</h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-lg">Item Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Enter the name of your item"
          />
        </div>

        <div>
          <label className="block text-lg">Price</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Enter the price"
          />
        </div>

        <div>
          <label className="block text-lg">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Enter the category"
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
          Add Item
        </button>
      </form>
    </div>
  );
};

export default SellItem;
