import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory, getOneCategory } from '../../api/categoryApi';
import { setProducts } from '../../redux/productSlice';
import { getProducts } from '../../api/productApi';


const SideBar = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const allProducts = useSelector((state) => state.products.products);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategory();
        setCategories(response.data.data);
      } catch (error) {
        console.error('Failed to fetch categories', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = async (name) => {
    setSelectedCategory(name);
    try {

      if (name === 'All Products') {
        const res = await getProducts()
        console.log(res)
        dispatch(
          setProducts({
            products: res?.data,
          })
        );
      } else {
        const res = await getOneCategory(name)
        console.log(res)
        dispatch(
          setProducts({
            products: res?.data?.products,
          })
        );
      }
    } catch (error) {
      console.error('Failed to fetch products for category', error);
    }
  };

  return (
    <div className='hidden md:block'>

      <div className='bg-white  text-black border w-64 h-screen p-4 flex flex-col'>
        <div className='mb-4 '>
          <h2 className='text-xl font-semibold mb-2'>Categories</h2>
          <div className='categories flex flex-col space-y-2'>
            {categories.length > 0 ? (
              <>
                <button
                  key="all-products"
                  onClick={() => handleCategoryClick('All Products')}
                  className={`text-left p-2 hover:bg-gray-200 rounded ${selectedCategory === 'All Products' ? 'bg-gray-200' : ''}`}
                >
                  All Products
                </button>
                {categories.map((category) => (
                  <button
                    key={category._id}
                    onClick={() => handleCategoryClick(category.name)}
                    className={`text-left p-2 hover:bg-gray-200 rounded ${selectedCategory === category.name ? 'bg-gray-200' : ''}`}
                  >
                    {category.name}
                  </button>
                ))}
              </>
            ) : (
              <div>No categories available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
