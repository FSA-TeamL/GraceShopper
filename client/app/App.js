import React from 'react';
import AllProducts from '../features/allProduct/AllProducts';
import Navbar from '../features/navbar/Navbar';
import AppRoutes from './AppRoutes';
import Footer from '../features/footer/Footer';

const App = () => {
  return (
    <div>
      <Navbar />
      <AppRoutes />
      <AllProducts/>
      <Footer />
    </div>
  );
};

export default App;
