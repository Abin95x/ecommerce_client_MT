import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ProductSection from '../../components/ProductSection/ProductSection';
import { getProducts } from '../../api/productApi';
import { setProducts } from '../../redux/productSlice';
import SideBar from '../../components/SideBar/SideBar';

const Home = () => {
  const [products, setProductsState] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await getProducts();
        setProductsState(response?.data);
        dispatch(
          setProducts({
            products: response?.data,
          })
        );
      } catch (error) {
        console.error('Failed to fetch products', error);
      }
    }

    fetchProducts();
  }, [dispatch]);

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-white flex ">
        <SideBar/>
        <ProductSection  />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
