import React, { useState } from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';
import { CoffeeData, category } from '../constant/data';
import { BsStarFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { HiPlus } from 'react-icons/hi2';
import { AddCart } from '../redux/CartSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CoffeeCategory = ({ Search, setSearch }) => {
  const [active, setActive] = useState('All');
  const [filtered, setFiltered] = useState([]);
  const dispatch = useDispatch();

  const getCoffeeDetails = (id) => {
    window.localStorage.setItem('coffeeID', id);
  };

  return (
    <div>
      <div className='flex gap-10 overflow-x-scroll pb-4 pt-2 cursor-pointer '>
        {/* <p className='text-xl text-white font-semibold'>{props.Search}</p> */}
        <div onClick={() => setActive('All')}>
          <h2
            className={` ${
              active === 'All' ? ' text-[#D17842]' : ' text-[#6e7b91]'
            } text-xl line-clamp-1  font-semibold`}
          >
            All
          </h2>
        </div>

        {category.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              setActive(item.name);
              setSearch('');
              const filter = CoffeeData.filter(
                (prev) => prev.name === item.name
              );

              setFiltered(filter);
            }}
          >
            <div className=''>
              <h3
                className={` ${
                  active === item.name ? ' text-[#D17842]' : ' text-[#6e7b91]'
                } text-xl line-clamp-1  font-semibold`}
              >
                {item.name}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {active == 'All' ? (
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 60,
            modifier: 1.0,
          }}
          className='relative'
        >
          {CoffeeData.filter((item) => {
            return Search.toLowerCase() === ''
              ? item
              : item.name.toLowerCase().includes(Search);
          }).map((item) => (
            <SwiperSlide
              key={item.id}
              className='bg-gradient-to-b  from-secondaryBlack via-[#24272c] to-[#0c0f14] w-[13.7rem] mr-4 rounded-xl animate__animated animate__slideInUp mt-2 p-2'
            >
              <div className='relative'>
                <Link
                  to={`/cf-details`}
                  onClick={() => getCoffeeDetails(item.id)}
                >
                  <div className=''>
                    <img
                      src={item.imagelink_square}
                      alt=''
                      className=' rounded-xl'
                    />
                  </div>

                  <div
                    style={{ backgroundColor: 'rgba(12, 15,20,0.5)' }}
                    className='absolute z-10 top-0 right-[1.9px] flex flex-row items-center px-3 py-0.5 rounded-bl-3xl rounded-tr-xl'
                  >
                    <BsStarFill color='#D17842' size={19} />

                    <h3 className='text-[#fff] text-base '>
                      {item.average_rating}
                    </h3>
                  </div>

                  <h2 className='text-[1.4rem] text-[#FFF] pt-2 font-semibold'>
                    {item.name}
                  </h2>
                  <h3 className='text-sm text-gray-500 '>
                    {item.special_ingredient}
                  </h3>
                </Link>

                <div className='flex flex-row items-center justify-between pt-5'>
                  <div className='flex flex-row items-center gap-0.5'>
                    <h4 className='text-[#D17842] text-xl '>{'$'}</h4>
                    <h4 className='text-[#FFF] text-xl  '>{item.prices}</h4>
                  </div>

                  <div className='bg-[#D17842] w-fit rounded-md p-2.5 cursor-pointer'>
                    <div
                      onClick={() => {
                        dispatch(AddCart(item));
                        toast.success(`Added to Cart`, {
                          autoClose: 1000,
                          hideProgressBar: true,
                          theme: 'light',
                          pauseOnHover: false,
                          progress: undefined,
                          draggable: false,
                        });
                      }}
                    >
                      <HiPlus color='#fff' size={17} />
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 60,
            modifier: 1.0,
          }}
          className='relative'
        >
          {filtered.map((item) => (
            <SwiperSlide
              key={item.id}
              className='bg-gradient-to-b  from-secondaryBlack via-[#24272c] to-[#0c0f14] w-[13.7rem] mr-4 rounded-xl animate__animated animate__slideInUp mt-2 p-2'
            >
              <div className='relative'>
                <Link
                  to={`/cf-details`}
                  onClick={() => getCoffeeDetails(item.id)}
                >
                  <div className=''>
                    <img
                      src={item.imagelink_square}
                      alt=''
                      className=' rounded-xl'
                    />
                  </div>

                  <div
                    style={{ backgroundColor: 'rgba(12, 15,20,0.5)' }}
                    className='absolute z-10 top-0 right-[1.9px] flex flex-row items-center px-3 py-0.5 rounded-bl-3xl rounded-tr-xl'
                  >
                    <BsStarFill color='#D17842' size={19} />

                    <h3 className='text-[#fff] text-base '>
                      {item.average_rating}
                    </h3>
                  </div>
                </Link>

                <h2 className='text-[1.4rem] text-[#FFF] pt-2 font-semibold'>
                  {item.name}
                </h2>
                <h3 className='text-sm text-gray-500 '>
                  {item.special_ingredient}
                </h3>

                <div className='flex flex-row items-center justify-between pt-5'>
                  <div className='flex flex-row items-center gap-0.5'>
                    <h4 className='text-[#D17842] text-xl '>{'$'}</h4>
                    <h4 className='text-[#FFF] text-xl  '>{item.prices}</h4>
                  </div>

                  <div className='bg-[#D17842] w-fit rounded-md p-2.5 cursor-pointer'>
                    <div
                      onClick={() => {
                        dispatch(AddCart(item));
                        toast.success(`Added to Cart`, {
                          autoClose: 1000,
                          hideProgressBar: true,
                          theme: 'light',
                          pauseOnHover: false,
                          progress: undefined,
                          draggable: false,
                        });
                      }}
                    >
                      <HiPlus color='#fff' size={17} />
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default CoffeeCategory;
