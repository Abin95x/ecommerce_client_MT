import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaCartPlus, FaHeart } from 'react-icons/fa';
import { addToCart } from '../../api/cartApi';
import { addToWishlist } from '../../api/wishlistApi';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const ProductSection = () => {
    const products = useSelector((state) => state.products.products);
    const user = useSelector((state) => state.user.user);
    const id = user._id;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleAddToCart = async (product) => {
        try {
            const res = await addToCart({ userId: id, productId: product._id, price: product.price });
            if (res.status === 200) {
                toast.success('Added to cart');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddToWishlist = async (product) => {
        try {
            const res = await addToWishlist({ userId: id, productId: product._id });
            if (res.status === 200) {
                toast.success('Added to wishlist');
            }
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) {
        return (
            <div className='w-full flex items-center justify-center'>
                <span className="loading bg-green-500 loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="flex flex-col  min-h-screen w-full p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.length > 0 ? (
                    products.map((product) => (
                        <Link
                            to={`/productdetails/${product._id}`}
                            key={product._id}
                            className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col"
                        >
                            <div className='flex flex-col items-center justify-center'>
                                <div className="h-48 w-80 m-8 bg-gray-200 flex items-center justify-center">
                                    <img
                                        className="object-cover h-full w-full"
                                        src={product.images[0]}
                                        alt={product.title || 'Product Image'}
                                        onError={(e) => (e.target.src = '/path/to/placeholder-image.png')} 
                                    />
                                </div>
                                <div className="p-4">
                                    <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                                    <p className="text-xl text-green-500 font-bold mb-2">₹{product.price}</p>
                                    <p className="text-gray-600 mb-4">{product.description}</p>
                                    <div className="flex justify-between items-center">
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault(); // Prevent the default link behavior
                                                handleAddToCart(product);
                                            }}
                                            className='h-10 w-20 bg-black rounded-lg text-white flex items-center justify-center mr-2'
                                        >
                                            <FaCartPlus />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault(); // Prevent the default link behavior
                                                handleAddToWishlist(product);
                                            }}
                                            className='h-10 w-20 bg-red-500 rounded-lg text-white flex items-center justify-center'
                                        >
                                            <FaHeart />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (

                    <p className="">No products available</p>

                )}
            </div>
        </div>
    );
};

export default ProductSection;
