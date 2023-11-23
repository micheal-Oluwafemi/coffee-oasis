import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import coffeeCup from '../../lottie/coffeecup.json';
import Footer from '../../components/Footer';
import { HiChevronLeft, HiStar } from 'react-icons/hi';
import { doubleCoffee, heartRed, heartWhite, locationPin } from '../../assets';
import { AddFavorite, remove } from '../../redux/FavoriteSlice';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import { Link } from 'react-router-dom';

const Favourite = () => {
  const { items } = useSelector((state) => state.favorite);
  const [favoriteActive, setFavoriteActive] = useState(true);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   items;
  // }, [items]);

  if (items.length == 0) {
    return (
      <>
        <div
          className='h-screen grid place-content-center pt-3
        '
        >
          <div>
            <Player autoplay loop className='w-60 h-60' src={coffeeCup} />
            <h3 className='text-primaryOrange text-base font-medium text-center font-poppins'>
              No Favorite Added!
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
    <div className='font-poppins relative'>
      {/* <div className='px-2'> */}
      <div
        className='h-screen overflow-y-scroll pb-12 pt-2 px-2 rounded-t-xl
      '
      >
        {items.map((item) => (
          <div
            key={item.id}
            className='mb-12 bg-gradient-to-bl from-primaryBlack to-secondaryBlack rounded-b-xl'
          >
            <div>
              <div className='relative rounded-t-xl'>
                <img
                  src={item.imagelink_portrait}
                  alt=''
                  className='h-[32rem] w-full rounded-t-xl'
                />

                <Link to='/'>
                  <div className='absolute top-6 left-5 p-3 bg-[#252A32] rounded-lg object-center '>
                    <HiChevronLeft size={20} color='rgb(107 114 128)' />
                  </div>
                </Link>

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

                      <h4 className='text-sm text-[#aeaeae] font-medium'>
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
                <h1 className='text-[#aeaeae] text-lg pb-3 font-semibold'>
                  Description
                </h1>

                <p
                  // onClick={() => setLineClamp(!lineClamp)}
                  className={` text-[#aeaeae] text-sm cursor-pointer pb-4`}
                >
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
        {/* </div> */}
      </div>

      <div className='absolute bg-secondaryBlack w-full bottom-0 z-[9000000]'>
        <Footer />
      </div>
    </div>
  );
};

export default Favourite;
