import React from 'react';
import { BeansData } from '../constant/data';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { BsStarFill } from 'react-icons/bs';
import { HiPlus } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AddCart } from '../redux/CartSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CoffeeBeansCategory = () => {
  const getCoffeeBeansDetails = (id) => {
    window.localStorage.setItem('coffeeBeansID', id);
  };
  const dispatch = useDispatch();

  return (
    <div className='pt-10'>
      <h1 className='text-3xl text-white font-semibold'>Coffee Beans</h1>
      <div>
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          // centeredSlides={true}
          // loop={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 60,
            modifier: 1.0,
          }}
          className='relative'
        >
          {BeansData.map((item) => (
            <SwiperSlide
              key={item.id}
              className='bg-gradient-to-b  from-secondaryBlack via-[#24272c] to-[#0c0f14] w-[13.7rem] mr-4 rounded-xl animate__animated animate__slideInUp mt-2 p-2'
            >
              <div onClick={() => getCoffeeBeansDetails(item.id)}>
                <div className='relative'>
                  <Link to={`/cb-details`} className=''>
                    <img
                      src={item.imagelink_square}
                      alt=''
                      className=' rounded-xl'
                    />

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
                      className='bg-[#D17842] w-fit rounded-md p-2.5 cursor-pointer'
                    >
                      <HiPlus color='#fff' size={17} />
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default CoffeeBeansCategory;
