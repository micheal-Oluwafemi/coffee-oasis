import React, { useEffect, useState } from 'react';
import { footerLinks } from '../constant/data';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  bagOrange,
  bagWhite,
  bellOrange,
  bellWhite,
  heartOrange,
  heartWhite,
  homeOrange,
  homeWhite,
} from '../assets';
import { useDispatch, useSelector } from 'react-redux';
import { getCartTotal } from '../redux/CartSlice';

const Footer = () => {
  const [active, setActive] = useState('');
  const { totalCount, item } = useSelector((state) => state.cart);
  const { items } = useSelector((state) => state.favorite);
  const { itemsHistory } = useSelector((state) => state.history);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(getCartTotal());
  }, [item]);

  return (
    <div className=' z-[90000] w-full py-3 px-5 font-poppins'>
      <div className='flex flex-row items-center justify-between'>
        <div onClick={() => navigate('/')} className='cursor-pointer'>
          <img
            src={`${location.pathname === '/' ? homeOrange : homeWhite}`}
            alt=''
            className='w-7 h-7'
          />
        </div>

        <div
          onClick={() => navigate('/cart')}
          className='relative cursor-pointer'
        >
          <img
            src={`${location.pathname === '/cart' ? bagOrange : bagWhite}`}
            alt=''
            className='w-7 h-7'
          />

          <div
            className={`${
              totalCount >= 1 && 'bg-green-500'
            } absolute -top-2 -right-2 w-[20px] h-[20px] rounded-full flex items-center justify-center`}
          >
            <p
              className={`${
                totalCount >= 1 ? 'block' : 'hidden'
              } text-center text-sm font-medium text-white`}
            >
              {totalCount}
            </p>
          </div>
        </div>

        <div
          onClick={() => navigate('/favorite')}
          className='cursor-pointer relative'
        >
          <img
            src={`${
              location.pathname === '/favorite' ? heartOrange : heartWhite
            }`}
            alt=''
            className='w-7 h-7'
          />

          <div
            className={`${
              items.length >= 1 ? 'bg-green-500' : ''
            } absolute -top-2 -right-2 w-[20px] h-[20px] rounded-full flex items-center justify-center`}
          >
            <p
              className={`${
                items.length >= 1 ? 'block' : 'hidden'
              } text-center text-sm font-medium text-white`}
            >
              {items.length}
            </p>
          </div>
        </div>

        <div
          onClick={() => navigate('/history')}
          className='cursor-pointer relative'
        >
          <img
            src={`${location.pathname === '/history' ? bellOrange : bellWhite}`}
            alt=''
            className='w-7 h-7'
          />

          <div
            className={`${
              itemsHistory.length >= 1 ? 'bg-green-500' : ''
            } absolute -top-2 -right-2 w-[20px] h-[20px] rounded-full flex items-center justify-center`}
          >
            <p
              className={`${
                itemsHistory.length >= 1 ? 'block' : 'hidden'
              } text-center text-sm font-medium text-white`}
            >
              {itemsHistory.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
