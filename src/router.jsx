import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import DashboardPage from "./pages/DashboardPage";
import ErrorPage from "./pages/ErrorPage";
import ProductPage from "./pages/ProductPage";
import SalePage from "./pages/SalePage";
import VoucherPage from "./pages/VoucherPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <DashboardPage />,
      },
      {
        path: "/product",
        element: <ProductPage />,
      },
      {
        path: "/sale",
        element: <SalePage />,
      },
      {
        path: "/voucher",
        element: <VoucherPage />,
      },
    ],
  },
]);

export default router;
