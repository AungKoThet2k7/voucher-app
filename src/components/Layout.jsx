import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Layout = () => {
  return (
    <main className="flex flex-col min-h-screen p-5">
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
};

export default Layout;
