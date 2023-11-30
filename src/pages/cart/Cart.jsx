import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { portrait } from '../../assets';
import { HiMinus } from 'react-icons/hi';
import { HiChevronLeft, HiPlus } from 'react-icons/hi2';
import { Player } from '@lottiefiles/react-lottie-player';
import coffeeCup from '../../lottie/coffeecup.json';
import { IoIosTrash } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import {
  decrease,
  getCartTotal,
  increase,
  remove,
} from '../../redux/CartSlice';
import Footer from '../../components/Footer';

const Cart = () => {
  const { item, totalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getCoffeeDetails = (id) => {
    window.localStorage.setItem('coffeeID', id);
  };

  const getCoffeeBeansDetails = (id) => {
    window.localStorage.setItem('coffeeBeansID', id);
  };

  useEffect(() => {
    dispatch(getCartTotal());
  }, [item]);
  if (item.length == 0) {
    return (
      <>
        <div
          className='height grid place-content-center
        '
        >
          <div>
            <Player autoplay loop className='w-60 h-60' src={coffeeCup} />
            <h3 className='text-primaryOrange text-base font-medium text-center font-poppins'>
              Cart is Empty!
            </h3>
          </div>

          <div className='absolute bg-secondaryBlack w-full bottom-0 z-[9000000]'>
            <Footer />
          </div>
        </div>
      </>
    );
  }

  return (
    <div className='overflow-x-hidden relative font-poppins'>
      <div className='px-3 font-poppins pt-5 height overflow-scroll pb-40'>
        <div className='flex flex-row justify-between items-center'>
          <Link to='/'>
            <div className=' p-3 bg-[#252A32] rounded-lg object-center '>
              <HiChevronLeft size={20} color='rgb(107 114 128)' />
            </div>
          </Link>
          <div>
            <h1 className='text-white font-semibold text-2xl'>Cart</h1>
          </div>
          <div>
            <img src={portrait} alt='' className='w-10 h-10' />
          </div>
        </div>

        <div
          className='flex flex-col gap-4 mt-4 
      '
        >
          {item.map((item) => (
            <div
              key={item.id}
              className='bg-gradient-to-tr from-secondaryBlack to-primaryBlack p-3 rounded-2xl '
            >
              <div className='flex flex-row  gap-4'>
                <div
                  onClick={() => {
                    if (
                      item.name === 'Robusta Beans' ||
                      item.name === 'Arabica Beans' ||
                      item.name === 'Liberica Beans' ||
                      item.name === 'Excelsa Beans'
                    ) {
                      getCoffeeBeansDetails(item.id);
                      navigate('/cb-details');
                    } else {
                      getCoffeeDetails(item.id);
                      navigate('/cf-details');
                    }
                  }}
                  className='cursor-pointer'
                >
                  <img
                    src={item.imagelink_square}
                    alt=''
                    className='w-32 h-32 rounded-2xl'
                  />
                </div>

                <div>
                  <h2 className='text-white text-[1.4rem] font-semibold'>
                    {item.name}
                  </h2>
                  <p className='text-base text-[#aeaeae] font-normal'>
                    {item.special_ingredient}
                  </p>

                  <h4 className='text-sm text-gray-400 bg-[#252A32] w-fit py-2.5 px-3 rounded-md self-center font-semibold mt-4'>
                    {item.roasted}
                  </h4>
                </div>
              </div>

              <div className='mt-5'>
                <div className='flex-row flex items-center justify-between w-full gap-5'>
                  <div className='flex flex-row items-center gap-1 '>
                    <h2 className='text-primaryOrange text-lg font-semibold'>
                      $
                    </h2>

                    <h2 className='text-white text-2xl font-medium'>
                      {item.prices}
                    </h2>
                  </div>

                  <div className='flex flex-row items-center justify-between w-[55%] gap-3'>
                    <div
                      onClick={() => dispatch(decrease(item.id))}
                      className='bg-primaryOrange p-1.5 rounded-md  w-fit flex items-center justify-center cursor-pointer'
                    >
                      <HiMinus size={19} color='rgb(12 15 20)' />
                    </div>

                    <div className='w-1/2 bg-primaryBlack flex items-center justify-center py-1 rounded-md border border-primaryOrange '>
                      <h1 className='text-base text-white font-semibold'>
                        {item.amount}
                      </h1>
                    </div>

                    <div
                      onClick={() => dispatch(increase(item.id))}
                      className='bg-primaryOrange p-1.5 rounded-md  w-fit flex items-center justify-center cursor-pointer'
                    >
                      <HiPlus size={19} color='rgb(12 15 20)' />
                    </div>
                  </div>
                </div>
              </div>

              <div
                onClick={() => dispatch(remove(item.id))}
                className='flex flex-row items-center mt-4 cursor-pointer'
              >
                <IoIosTrash size={32} color='rgb(209 120 66)' />

                <h2 className='text-base text-white font-semibold'>Remove</h2>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='absolute bottom-0 w-full'>
        <div className='flex flex-row items-center pb-3 px-2 bg-primaryBlack pt-4 justify-between'>
          <div
            className=' flex flex-col items-center w-[28%] rounded-t-xl
          '
          >
            <p className='text-gray-400 text-sm font-semibold'>Total Price</p>
            <h1 className='text-2xl text-white font-semibold'>
              <span className='text-lg text-primaryOrange pr-1'>$</span>
              {totalAmount}
            </h1>
          </div>
          <div
            onClick={() => {
              navigate('/payment');
            }}
            className='bg-primaryOrange rounded-xl py-4 px-24 cursor-pointer '
          >
            <h3 className='text-base text-white text-center  '>Pay</h3>
          </div>
        </div>

        <div className=' bg-secondaryBlack'>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Cart;
