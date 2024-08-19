import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { getWishlist, removeFromWishlist } from '../../api/wishlistApi'; 
import { addToCart } from '../../api/cartApi'; 
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.user.user);
  const id = user._id;

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await getWishlist(id);
        if (response.status === 200) {
          setWishlist(response.data.wishlist.product); 
        }
      } catch (err) {
        setError('Failed to fetch wishlist');
        console.error(err);
        toast.error('Failed to fetch wishlist');
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [id]);

  const handleRemoveFromWishlist = async (productId) => {
    try {
      await removeFromWishlist({ userId: id, productId });
      setWishlist(wishlist.filter(item => item.productId._id !== productId));
      toast.success('Removed from wishlist');
    } catch (err) {
      console.error(err);
      toast.error('Failed to remove item');
    }
  };

  const handleAddToCart = async (product) => {
    try {
      await addToCart({ userId: id, productId: product._id, price: product.price });
      toast.success('Added to cart');
    } catch (err) {
      console.error(err);
      toast.error('Failed to add to cart');
    }
  };

  if (loading) {
    return <div className='min-h-screen bg-white te flex items-center justify-center'>Loading...</div>;
  }

  if (error) {
    return <div className='min-h-screen flex items-center justify-center'>{error}</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto p-4 min-h-screen">
        {wishlist.length > 0 ? (
          <div>
            {wishlist.map((item) => (
              <div key={item.productId._id} className="flex flex-col md:flex-row items-start justify-between p-4 mb-4 bg-white shadow-md rounded-lg">
                <div className="flex items-center">
                  <img src={item.productId.images[0]} alt={item.productId.name} className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg" />
                  <div className="ml-4">
                    <h2 className="text-lg md:text-xl font-semibold">{item.productId.name}</h2>
                    <p className="text-gray-600 mt-1">₹{item.productId.price}</p>
                    <p className="text-gray-600 mt-1">{item.productId.description}</p>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-center mt-4 md:mt-0">
                  <button
                    className="mt-2 md:mt-0 md:ml-4 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-red-700 transition"
                    onClick={() => handleAddToCart(item.productId)}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="mt-2 md:mt-0 md:ml-4 px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    onClick={() => handleRemoveFromWishlist(item.productId._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">Your wishlist is empty.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist
