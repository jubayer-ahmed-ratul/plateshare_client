import React from 'react';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Footer/Footer';

const Rootlayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Rootlayout;