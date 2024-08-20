import { Link } from 'react-router-dom';

const Account = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">My Account</h1>
      <div className="space-y-4">
        <Link
          to="/sell-item"
          className="block bg-blue-500 text-white p-4 rounded-md text-center"
        >
          Sell Your Item
        </Link>
        <Link
          to="/wishlist"
          className="block bg-green-500 text-white p-4 rounded-md text-center"
        >
          Wishlist
        </Link>
      </div>
    </div>
  );
};

export default Account;
