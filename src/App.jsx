import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/cart/Cart';
import Details from './pages/details/Details';
import Favourite from './pages/favorite/Favourite';
import History from './pages/history/History';
import CBDetails from './pages/details/CBDetails';
import { ToastContainer, Zoom } from 'react-toastify';
import FooterNavigation from './components/FooterNavigation';
import Payment from './pages/payment/Payment';

const App = () => {
  return (
    <div className='relative'>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/cf-details' element={<Details />} />
        <Route path='/cb-details' element={<CBDetails />} />
        <Route path='/favorite' element={<Favourite />} />
        <Route path='/history' element={<History />} />
        <Route path='/payment' element={<Payment />} />
      </Routes>
      <ToastContainer
        // position='bottom-right'
        autoClose={0.111}
        hideProgressBar
        newestOnTop={false}
        transition={Zoom}
        theme='light'
        closeButton={false}
        bodyClassName={'toastbody'}
        toastClassName={'hide'}
        pauseOnHover={false}
        className={`justify-cente text-sm items fl font-semibold`}
      />

      {/* <div>
        <FooterNavigation />
      </div> */}
    </div>
  );
};

export default App;
