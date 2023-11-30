import React, { useState } from 'react';
import { BsChevronLeft } from 'react-icons/bs';
import {
  amazon,
  appleIcon,
  googlePay,
  simOrangeIcon,
  walletIcon,
} from '../../assets';
import { SiVisa } from 'react-icons/si';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';
import Successful from '../../lottie/successful.json';
import { AddHistory } from '../../redux/HistorySlice';
import { clearCart } from '../../redux/CartSlice';

const paymentMethod = [
  { id: 1, means: 'Wallet', icon: walletIcon },
  { id: 2, means: 'Google Pay', icon: googlePay },
  { id: 3, means: 'Apple Pay', icon: appleIcon },
  { id: 4, means: 'Amazon Pay', icon: amazon },
];

const Payment = () => {
  const [active, setActive] = useState('Credit Card');
  const [isSuccessful, setIsSuccessful] = useState(false);
  const { item, totalAmount } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(item);

  return (
    <div>
      <div className={`${isSuccessful === true ? 'blur-sm' : ''} relative`}>
        <div
          className={` font-poppins pt-3 px-3 overflow-x-hidden
        height overflow-y-scroll pb-20
      `}
        >
          <div className={`flex items-center flex-row justify-between`}>
            <div
              onClick={() => navigate('/cart')}
              className='bg-secondaryBlack p-2 rounded-md cursor-pointer '
            >
              <BsChevronLeft size={17} color='rgb(107 114 128)' />
            </div>

            <div>
              <h1 className='text-xl font-semibold text-white'>Payment</h1>
            </div>

            <div></div>
          </div>

          <div
            onClick={() => setActive('Credit Card')}
            className={`${
              active === 'Credit Card'
                ? 'border-primaryOrange  border-[1.7px]'
                : ''
            } mt-5  p-3 rounded-3xl cursor-pointer`}
          >
            <h2 className='font-medium text-base text-white'>Credit Card</h2>

            <div className='mt-2 bg-gradient-to-br from-secondaryBlack to-primaryBlack p-3 rounded-xl'>
              <div className='flex flex-row items-center justify-between'>
                <img src={simOrangeIcon} alt='' className='w-8' />

                <SiVisa size={50} color='#fff' />
              </div>

              <h3 className='text-xl font-medium text-white pt-6 text-center tracking-[0.2em]'>
                <span className='pr-3'>3897</span>
                <span className='pr-3'>8074</span>
                <span className='pr-3'>6745</span>
                <span>4638</span>
              </h3>

              <div className='flex flex-row items-center justify-between pt-9 pb-1'>
                <div>
                  <p className='text-[12px] text-gray-500 font-semibold'>
                    Card Holder Name
                  </p>
                  <h3 className='text-lg text-gray-200 font-medium'>
                    Robert Evans
                  </h3>
                </div>

                <div>
                  <p className='text-[12px] text-gray-500 font-semibold'>
                    Expiry Date
                  </p>
                  <h3 className='text-lg text-gray-200 font-medium'>02/30</h3>
                </div>
              </div>
            </div>
          </div>

          <div>
            {paymentMethod.map((detail) => (
              <div
                key={detail.id}
                className={`bg-gradient-to-br from-secondaryBlack to-primaryBlack py-4 pl-5 mt-4 rounded-full  cursor-pointer ${
                  active === detail.means
                    ? 'border border-primaryOrange'
                    : 'border border-gray-700'
                }`}
                onClick={() => setActive(detail.means)}
              >
                <div className='flex flex-row items-center gap-2'>
                  <img src={detail.icon} alt='' className='w-7 h-7' />

                  <h2 className='text-base text-white font-semibold'>
                    {detail.means}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='absolute bottom-0 z-40 flex flex-row items-center justify-between px-4 bg-primaryBlack py-2 w-full font-poppins'>
          <div className='flex flex-col items-center'>
            <p
              className='text-gray-400 font-semibold text-sm
          '
            >
              price
            </p>

            <div className='flex flex-row gap-1'>
              <p className='text-primaryOrange text-xl font-semibold'>$</p>

              <h3 className='text-white text-2xl font-semibold'>
                {totalAmount}
              </h3>
            </div>
          </div>

          <div
            onClick={() => {
              setIsSuccessful(true);

              setTimeout(() => {
                setIsSuccessful(false);
                dispatch(AddHistory(item));
                navigate('/history');
                dispatch(clearCart());
              }, 4000);
            }}
            className='bg-primaryOrange px-5 py-3.5 rounded-xl cursor-pointer mb-1'
          >
            <h1 className='text-white font-semibold text-base'>
              Pay from {active}
            </h1>
          </div>
        </div>
      </div>
      <div
        className={`${
          isSuccessful === true ? 'contain z-[99999999999]' : 'hidden'
        }`}
      >
        <Player autoplay loop className='w-80 h-80' src={Successful} />
      </div>
    </div>
  );
};

export default Payment;
