import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar"; // Navbar import

const Rootlayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet /> {/* Nested route content এখানে render হবে */}
      </main>
    </div>
  );
};

export default Rootlayout;
