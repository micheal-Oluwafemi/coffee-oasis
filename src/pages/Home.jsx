import React, { useEffect, useState } from 'react';
import { logo, searchIcon } from '../assets';
import CoffeeCategory from '../components/CoffeeCategory';
import CoffeeBeansCategory from '../components/CoffeeBeansCategory';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { getCartTotal } from '../redux/CartSlice';
import { HiMenuAlt3 } from 'react-icons/hi';

const Home = () => {
  const dispatch = useDispatch();
  const { item } = useSelector((state) => state.cart);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(getCartTotal());
  }, [item]);

  return (
    <div className='relative'>
      <div className='px-3 h-screen overflow-scroll py-3 font-poppins '>
        <div className='flex flex-row items-center justify-between'>
          <img src={logo} alt='logo' className='w-14 h-14' />

          <HiMenuAlt3 size={32} color='#FFF' />
        </div>

        <h1 className='text-gray-100 mt-7 text-[2.7rem]  font-semibold leading-[46px] font-poppins'>
          Find the best <br />
          coffee for you
        </h1>

        <div className='flex relative flex-row items-center bg-secondaryBlack mt-5 py-1 px-4 rounded-md '>
          <div className='absolute'>
            <img src={searchIcon} alt='searchIcon' />
          </div>

          <input
            type='text'
            placeholder='Find your Coffee..'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='w-full bg-transparent text-lg font-medium py-2 pl-7 outline-none border-0 text-gray-400 '
          />
        </div>

        <div className='pb-16'>
          <CoffeeCategory Search={search} />
          <CoffeeBeansCategory />
        </div>
      </div>

      <div className='absolute bg-secondaryBlack w-full bottom-0 z-[9000000]'>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
