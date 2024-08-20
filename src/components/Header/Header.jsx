import React, { useState } from 'react'
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from 'react-router-dom';
import { FaRegHeart } from "react-icons/fa";

import { Input } from 'antd';
import CategoryModal from '../CategoryModal/CategoryModal';
import ProductModal from '../ProductModal/ProductModal';
import { searchProucts } from '../../api/productApi';
import { useDispatch } from 'react-redux';
import { setProducts } from '../../redux/productSlice';
import { getProducts } from '../../api/productApi';


const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const handleClick = () => {
        localStorage.removeItem('usertoken');
        toast.info('Logged out successfully');
        navigate('/');
    }
    const handleChange = async (value) => {
        try {
            if (value.trim() === '') {
                const res = await getProducts()
                dispatch(
                    setProducts({
                        products: res?.data,
                    })
                );
            } else {
                const res = await searchProucts(value)
                dispatch(
                    setProducts({
                        products: res?.data,
                    })
                );
            }

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="navbar bg-black">
            <div className="flex-1">
                <Link to='/' className="btn btn-ghost text-xl">E-commerce</Link>
            </div>
            <div className="flex-none gap-4">

                <div className=' hidden md:block'>
                    <div className='flex gap-4 '>
                        <Input placeholder="Search products" className='w-60 rounded-3xl' onChange={(e) => handleChange(e.target.value)} />
                        <CategoryModal />
                        <ProductModal />
                    </div>
                </div>
                <div className="dropdown dropdown-end">
                    <div className='flex items-center gap-3'>
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <Link to='/cart'>
                                <div className="indicator">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                            </Link>
                        </div>
                        <Link to='/wishlist'>
                            <div className=' btn btn-ghost btn-circle'>
                                <FaRegHeart className='h-5 w-5  ' />
                            </div>
                        </Link>
                    </div>
                    <div
                        tabIndex={0}
                        className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
                    </div>
                </div>
                <div className="dropdown dropdown-end">

                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li>
                            <Link to='/profile'>
                                <a className="justify-between">Profile</a>
                            </Link>
                        </li>
                        <li onClick={handleClick}>
                            <a>Logout</a>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default Header