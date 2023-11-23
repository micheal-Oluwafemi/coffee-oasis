import React, { useEffect, useState } from 'react';
import { appIcon, portrait } from '../../assets';
import Footer from '../../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { HiX } from 'react-icons/hi';
import { Player } from '@lottiefiles/react-lottie-player';
import coffeeCup from '../../lottie/coffeecup.json';
import { IoIosTrash } from 'react-icons/io';
import { clearHistory } from '../../redux/HistorySlice';
import Download from '../../lottie/download.json';

const History = () => {
  const [isSuccessful, setIsSuccessful] = useState(false);
  const day = new Date().getDate();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  const allMonths = [
    'Jan',
    'Feb',
    'March',
    'April',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];
  const { itemsHistory } = useSelector((state) => state.history);
  const dispatch = useDispatch();

  const getAllTotal = (inner) => {
    const innerArrayTotal = inner.reduce(
      (total, item) => total + item.prices * item.amount,
      0
    );

    return innerArrayTotal.toFixed(2);
  };

  if (itemsHistory.length == 0) {
    return (
      <>
        <div
          className='h-screen grid place-content-center
        '
        >
          <div>
            <Player autoplay loop className='w-60 h-60' src={coffeeCup} />
            <h3 className='text-primaryOrange text-base font-medium text-center font-poppins'>
              No History!
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
    <div>
      <div
        className={`${
          isSuccessful === true ? 'blur-sm' : ''
        } relative font-poppins
    `}
      >
        <div className='h-screen px-2 pb-16 pt-3 overflow-y-scroll'>
          <div className='flex flex-row items-center justify-between'>
            <div
              className='bg-secondaryBlack
          p-2 rounded-md'
            >
              <img src={appIcon} alt='' />
            </div>

            <div>
              <h1 className='text-xl font-semibold text-white'>
                Order History
              </h1>
            </div>

            <div>
              <img src={portrait} alt='' className='w-8 h-8' />
            </div>
          </div>

          <div
            onClick={() => dispatch(clearHistory())}
            className='flex flex-row items-center justify-end pt-4 cursor-pointer'
          >
            <h1 className='text-white text-base font-semibold'>
              Clear History
            </h1>

            <IoIosTrash size={22} color='rgb(209 120 66)' />
          </div>

          <div className='pt-2 pb-20'>
            <div>
              {itemsHistory.map((innerArray, index) => (
                <div key={index} className='pt-7'>
                  <div className='flex flex-row items-center justify-between '>
                    <div>
                      <h4 className='text-base text-white font-semibold'>
                        Order Date
                      </h4>
                      <p className='text-base text-gray-400 font-normal'>
                        {day}th {allMonths[month]} {year}
                      </p>
                    </div>

                    <div>
                      <h4 className='text-base text-white font-semibold'>
                        Total Amount
                      </h4>

                      <div className='flex gap-1 flex-row items-center justify-end '>
                        <h1 className='text-lg text-primaryOrange font-semibold'>
                          $
                        </h1>
                        <h1 className='text-2xl text-white font-medium'>
                          {getAllTotal(innerArray)}
                        </h1>
                      </div>
                    </div>
                  </div>
                  {innerArray.map((detail, detailIndex) => (
                    <div
                      key={detailIndex}
                      className='bg-gradient-to-br from-secondaryBlack to-primaryBlack p-3 mt-3 rounded-xl'
                    >
                      <div className='flex flex-row items-center justify-between'>
                        <div className='flex flex-row items-center gap-5'>
                          <img
                            src={detail.imagelink_square}
                            alt=''
                            className='w-20 h-20 rounded-xl'
                          />

                          <div>
                            <div>
                              <h1 className='text-lg font-normal text-white'>
                                {detail.name}
                              </h1>
                            </div>

                            <div>
                              <h5 className='text-sm text-gray-400 '>
                                {detail.special_ingredient}
                              </h5>
                            </div>
                          </div>
                        </div>
                        <div className=''>
                          <h1 className='text-[22px] text-white font-medium'>
                            <span className='text-[19px] font-semibold text-primaryOrange pr-1'>
                              $
                            </span>
                            {(detail.amount * detail.prices).toFixed(2)}
                          </h1>

                          <div className='flex flex-row items-center gap-3 pt-1'>
                            <div className='flex flex-row items-center'>
                              <HiX size={15} color='rgb(209 120 66)' />

                              <h1 className='text-gray-200 text-[14px] font-semibold'>
                                {detail.amount}
                              </h1>
                            </div>

                            <div>
                              <h1 className='text-primaryOrange font-semibold text-[17px]'>
                                {detail.prices}
                              </h1>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='absolute  w-full bottom-0 z-[9000000]'>
          <div
            onClick={() => {
              setIsSuccessful(true);

              setTimeout(() => {
                setIsSuccessful(false);
              }, 2000);
            }}
            className='text-white bg-primaryOrange mx-4 mb-4 rounded-xl py-4'
          >
            <h1 className='text-center font-semibold text-base'>Download</h1>
          </div>

          <div className='bg-secondaryBlack'>
            <Footer />
          </div>
        </div>
      </div>

      <div
        className={`${
          isSuccessful === true ? 'contain z-[99999999999]' : 'hidden'
        }`}
      >
        <Player autoplay loop className='' src={Download} />
      </div>
    </div>
  );
};

export default History;
