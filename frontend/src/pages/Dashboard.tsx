import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import EditItemModal from '../components/EditItemModal';

const Dashboard = () => {
  const [myItems, setMyItems] = useState<any[]>([]);
  const [purchases, setPurchases] = useState<any[]>([]);
  const [editingItem, setEditingItem] = useState<any | null>(null);

  useEffect(() => {
    const fetchMyItems = async () => {
      try {
        const response = await axios.get('https://capiall-olx-1.onrender.com/v1/my-items', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setMyItems(response.data);
      } catch (error) {
        console.error('Error fetching my items:', error);
      }
    };

    const fetchMyPurchases = async () => {
      try {
        const response = await axios.get('https://capiall-olx-1.onrender.com/v1/my-purchases', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setPurchases(response.data);
      } catch (error) {
        console.error('Error fetching my purchases:', error);
      }
    };

    fetchMyItems();
    fetchMyPurchases();
  }, []);

  const handleEdit = (item: any) => {
    setEditingItem(item);
  };

  const handleUpdate = async (updatedItem: any) => {
    try {
      await axios.put(`https://capiall-olx-1.onrender.com/v1/items/${updatedItem._id}`, updatedItem, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      // Refresh items
      const response = await axios.get('https://capiall-olx-1.onrender.com/v1/my-items', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setMyItems(response.data);
      setEditingItem(null); // Close the modal
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl mb-4">My Dashboard</h1>
      <div>
        <h2 className="text-2xl mb-2">My Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {myItems.map((item) => (
            <ProductCard
              key={item._id}
              {...item}
              onClick={() => handleEdit(item)}
            />
          ))}
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl mb-2">My Purchases</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {purchases.map((item) => (
            <ProductCard key={item._id} {...item} />
          ))}
        </div>
      </div>

      {editingItem && (
        <EditItemModal
          item={editingItem}
          onUpdate={handleUpdate}
          onClose={() => setEditingItem(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
