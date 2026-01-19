import React from 'react';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Footer/Footer';
import { ToastContainer } from 'react-toastify';

const Rootlayout = () => {
    return (
       <div className="flex flex-col min-h-screen ubuntu-font bg-themed-secondary text-themed-primary">
      <Navbar />

      <main className="flex-grow">
        <Outlet />
      </main>

      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
        toastStyle={{
          backgroundColor: '#16a34a',
          color: '#ffffff'
        }}
      />

      <Footer />
    </div>
    );
};

export default Rootlayout;