import React, { useEffect } from "react";
import Header from "./Header";
import { Navigate, Outlet } from "react-router-dom";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";
import useCookie from "react-use-cookie";
import { use } from "react";
import useUserStore from "../stores/userUserStore";

const Layout = () => {
  const [token] = useCookie("token");

  const [userCookie ] = useCookie("user");

  const { user,setUser } = useUserStore();

  useEffect(() => {
    setUser(JSON.parse(userCookie));
  }, []);

  if (!token) {
    return <Navigate to="/" />;
  }

  return (
    <main className="flex flex-col min-h-screen p-5">
      <Header />
      <Outlet />
      <Toaster position="top-right" />
      <Footer />
    </main>
  );
};

export default Layout;
