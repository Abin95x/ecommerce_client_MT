import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { getCart, updateQuantity, removeFromCart } from '../../api/cartApi'; // Assuming you have this function
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2';


const Cart = () => {
  const user = useSelector((state) => state.user.user);
  const id = user._id;
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    async function getCartProducts() {
      const res = await getCart(id);
      setCartData(res?.data?.product || []);
    }
    getCartProducts();
  }, [id]);

  const handleQuantityChange = async (productId, newQuantity) => {
    await updateQuantity({ id, productId, newQuantity });
  
    setCartData(prevCartData =>
      prevCartData.map(item =>
        item.productId._id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemove = async (productId) => {
    await removeFromCart({ id, productId });
    toast.success('Successfully removed')
    setCartData(prevCartData => prevCartData.filter(item => item.productId._id !== productId));
  };

  const handleOrder = () => {
    Swal.fire({
      title: "Are you sure?",
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, buy it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Done!",
          text: "Order placed",
          icon: "success"
        });
      }
    });
  };


  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto p-4 min-h-screen ">
        {cartData.length > 0 ? (
          <div>
            {cartData.map((item) => (
              <div key={item.productId._id} className="flex flex-col md:flex-row items-start justify-between p-4 mb-4 bg-white shadow-md rounded-lg">
                <div className="flex items-center">
                  <img src={item.productId.images[0]} alt={item.productId.name} className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg" />
                  <div className="ml-4">
                    <h2 className="text-lg md:text-xl font-semibold">{item.productId.name}</h2>
                    <p className="text-gray-600 mt-1">₹{item.productId.price}</p>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-center mt-4 md:mt-0">
                  <div className="flex items-center">
                    <button
                      className="px-3 py-1 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-200 transition"
                      onClick={() => handleQuantityChange(item.productId._id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="mx-4 text-lg">{item.quantity}</span>
                    <button
                      className="px-3 py-1 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-200 transition"
                      onClick={() => handleQuantityChange(item.productId._id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="mt-2 md:mt-0 md:ml-4 px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    onClick={() => handleRemove(item.productId._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="flex flex-col md:flex-row justify-between items-center p-4 mt-4 bg-white shadow-md rounded-lg">
              <h3 className="text-lg md:text-xl font-semibold">Total: ₹{cartData.reduce((acc, item) => acc + item.productId.price * item.quantity, 0)}</h3>
              <button
                className="mt-4 md:mt-0 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                onClick={handleOrder}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-600">Your cart is empty.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
