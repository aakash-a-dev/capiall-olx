import React from 'react';

interface ProductCardProps {
  _id: string;
  name: string;
  price: number;
  sold: boolean;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ _id, name, price, sold, onClick }) => {
  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-bold">{name}</h2>
      <p className="text-gray-700">Price: ${price}</p>
      <p className={`text-sm ${sold ? 'text-green-500' : 'text-red-500'}`}>{sold ? 'Sold' : 'Available'}</p>
      <button 
        onClick={onClick}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Edit
      </button>
    </div>
  );
};

export default ProductCard;
