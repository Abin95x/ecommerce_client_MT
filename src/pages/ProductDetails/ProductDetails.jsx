import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { addToCart } from '../../api/cartApi';
import { addToWishlist } from '../../api/wishlistApi';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = () => {
    const { id } = useParams();
    const user = useSelector((state) => state.user.user);
    const userId = user._id
    const product = useSelector((state) => state.products.products.find((product) => product._id === id));

    if (!product) {
        return <div className="text-center mt-10 text-2xl">Product not found</div>;
    }

    const handleAddToCart = async () => {
        try {
           const res = await addToCart({ userId, productId: product._id, price: product.price });
            if(res.status === 200){
                toast.success('Add to cart')
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleAddToWishlist = async () => {
        try {
            const res = await addToWishlist({ userId: id, productId: product._id });
        if(res.status === 200){
            toast.success('Added to wishlist');
        }
        } catch (error) {
            console.error(error);
        }
    };



    return (
        <>
            <Header />
            <div className="p-4 bg-white min-h-screen w-full">
                <div className="flex md:m-20 flex-col md:flex-row">
                    <img
                        className="w-full md:w-1/2 h-96 object-cover rounded-lg "
                        src={product.images[0]}
                        alt={product.name}
                    />
                    <div className="mt-4 md:mt-0 md:ml-6 flex flex-col justify-between">
                        <div>
                            <h2 className="text-3xl text-black font-bold mb-4">{product.name}</h2>
                            <p className="text-2xl text-green-500 font-bold mb-2">₹{product.price}</p>
                            <p className="text-gray-600 mb-4">{product.description}</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center md:items-start mx-24 ">
                    <div className="flex items-center space-x-2">
                        {/* <button
                            onClick={decreaseQuantity}
                            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg text-lg font-bold text-gray-700 hover:bg-gray-100"
                        >
                            -
                        </button>
                        <input
                            id="quantity"
                            value={quantity}
                            onChange={handleQuantityChange}
                            className="w-16 px-2 py-1 border border-gray-300 rounded-lg text-center"
                        />
                        <button
                            onClick={increaseQuantity}
                            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg text-lg font-bold text-gray-700 hover:bg-gray-100"
                        >
                            +
                        </button> */}
                    </div>
                    <div className="flex space-x-4">
                        <button
                            className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                            onClick={handleAddToCart}
                        >
                            Add to Cart
                        </button>
                        <button
                            className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-green-600 transition"
                            onClick={handleAddToWishlist}
                        >
                            Add to Wishlist
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ProductDetails;
 