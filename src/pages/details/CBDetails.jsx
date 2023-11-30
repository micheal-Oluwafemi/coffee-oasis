import React, { useEffect, useState } from 'react';
import { BeansData, CoffeeData } from '../../constant/data';
import { HiChevronLeft, HiStar } from 'react-icons/hi2';
import { doubleCoffee, heartRed, heartWhite, locationPin } from '../../assets';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AddCart } from '../../redux/CartSlice';
import Footer from '../../components/Footer';
import { AddFavorite, remove } from '../../redux/FavoriteSlice';

const CBDetails = () => {
  const id = localStorage.getItem('coffeeBeansID');
  const [detailData, setDetailData] = useState([]);
  const [lineClamp, setLineClamp] = useState(false);
  const [favoriteActive, setFavoriteActive] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const filter = BeansData.filter((prev) => prev.id === id * 1);
    setDetailData(filter);
  }, []);

  const navigate = useNavigate();

  return (
    <div className='relative'>
      <div className='font-poppins height  overflow-y-scroll'>
        {detailData.map((item) => (
          <div key={item.id}>
            <div>
              <div className='relative'>
                <img
                  src={item.imagelink_portrait}
                  alt=''
                  className='h-[32rem] w-full'
                />

                <div
                  onClick={() => navigate('/')}
                  className='absolute top-6 left-5 p-3 bg-[#252A32] rounded-lg object-center cursor-pointer'
                >
                  <HiChevronLeft size={20} color='rgb(107 114 128)' />
                </div>

                <div
                  onClick={() => {
                    setFavoriteActive(!favoriteActive);
                    if (favoriteActive === false) {
                      dispatch(AddFavorite(item));
                    } else {
                      dispatch(remove(item.id));
                    }
                  }}
                  className='absolute top-6 right-5 p-3 bg-[#252A32] rounded-lg object-center cursor-pointer'
                >
                  <img
                    src={`${favoriteActive === true ? heartRed : heartWhite}`}
                    alt='heartIcon'
                    // className='cursor-pointer'
                  />
                </div>

                {/* Blur Background */}
                <div
                  style={{ backgroundColor: 'rgba(12, 15,20,0.5)' }}
                  className='absolute bottom-0 w-[100%] px-5 py-3 rounded-t-3xl '
                >
                  <div className='flex flex-row items-center justify-between'>
                    <div>
                      <h1 className='text-2xl text-[#FFF] font-semibold'>
                        {item.name}
                      </h1>
                      {/* <Text className='text-lg text-white'>
                  {favoriteCoffee ? 'True' : 'False'}
                </Text> */}
                      <h4 className='text-sm text-[#aeaeae] font-semibold'>
                        {item.special_ingredient}
                      </h4>
                    </div>
                    <div className='flex flex-row gap-3 items-center '>
                      <div className='flex flex-col items-center justify-center bg-[#252A32] w-16 h-16 rounded-lg'>
                        <img src={doubleCoffee} alt='' />
                        <h4 className='text-sm text-gray-400 font-semibold'>
                          {item.type}
                        </h4>
                      </div>

                      <div className='flex flex-col items-center justify-center bg-[#252A32] w-16 h-16 rounded-lg'>
                        <img src={locationPin} alt='' />
                        <h3 className='text-sm text-gray-400 font-semibold'>
                          {item.ingredients}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <div className='flex flex-row items-center justify-between pt-6'>
                    <div className='flex flex-row items-center gap-1 '>
                      <div>
                        <HiStar size={25} color='#D17842' />
                      </div>
                      <h2 className='text-2xl text-white font-semibold'>
                        {item.average_rating}
                      </h2>
                      <h2 className='text-sm text-gray-400'>{`(${item.ratings_count})`}</h2>
                    </div>

                    <div>
                      <h4 className='text-base text-gray-400 bg-[#252A32] w-fit py-2 px-4 rounded-md self-center font-semibold'>
                        {item.roasted}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>

              <div className='px-3 pt-4'>
                <h1
                  onClick={() => setLineClamp(!lineClamp)}
                  className={`${
                    lineClamp === false ? 'line-clamp-4' : 'line-clamp-none'
                  } text-[#aeaeae] text-sm cursor-pointer`}
                >
                  Description
                </h1>

                <p className='text-[#aeaeae] text-sm'>{item.description}</p>

                <div className='flex flex-row items-center w-full my-4 pb-12'>
                  <div className='flex flex-col items-center w-[30%]'>
                    <h2 className='text-[#aeaeae] text-lg font-semibold'>
                      price
                    </h2>

                    <div className='flex flex-row item-center gap-1'>
                      <h2 className='text-[#D17824] text-2xl font-semibold'>
                        $
                      </h2>

                      <h2 className='text-2xl text-white font-semibold'>
                        {item.prices}
                      </h2>
                    </div>
                  </div>

                  <div className='w-[70%]'>
                    {/* <Link to={`/cart`}> */}
                    <div onClick={() => dispatch(AddCart(item))}>
                      <div className='bg-[#D17824] w-full rounded-xl py-3 cursor-pointer'>
                        <h2 className='text-[#FFF] text-center text-lg font-semibold'>
                          Add to Cart
                        </h2>
                      </div>
                    </div>
                    {/* </Link> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='absolute bg-secondaryBlack w-full bottom-0 z-[9000000]'>
        <Footer />
      </div>
    </div>
  );
};

export default CBDetails;
