import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from '../pages/Login/Login'
import Signup from '../pages/Signup/Signup'
import Home from '../pages/Home/Home'
import Public from './Public'
import Protect from './Protect'
import Cart from '../pages/Cart/Cart'
import ProductDetails from '../pages/ProductDetails/ProductDetails'
import Profile from '../pages/Profile/Profile'
import Wishlist from '../pages/Wishlist/Wishlist'


const UserRoute = () => {
  return (

    <Routes>
      <Route path='/' element={<Public><Login /></Public>} />
      <Route path='/signup' element={<Public><Signup /></Public>} />
      <Route path='/home' element={<Protect><Home /></Protect>} />
      <Route path='/productdetails/:id' element={<Protect><ProductDetails /></Protect>} />
      <Route path='/cart' element={<Protect><Cart /></Protect>} />
      <Route path='/profile' element={<Protect><Profile /></Protect>} />
      <Route path='/wishlist' element={<Protect><Wishlist /></Protect>} />



    </Routes>
  )
}

export default UserRoute